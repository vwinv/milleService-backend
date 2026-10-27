import {
  Injectable,
  Logger,
  ServiceUnavailableException,
} from "@nestjs/common";
import { Prisma } from "../../generated/prisma/client.js";
import { PrismaService } from "../prisma/prisma.service.js";

export type SamirPaymentState = "paid" | "pending" | "failed";

export type SamirInitResult = {
  orderId: string;
  transactionId?: string;
  /** Identifiant renvoyé à l’app (id SamirPay s’il existe, sinon notre orderId). */
  publicToken: string;
  checkoutUrl?: string;
  message?: string;
};

export type SamirStatusResult = {
  state: SamirPaymentState;
  amountFcfa?: number;
  transactionId?: string;
  message?: string;
};

export type SamirCashOutResult = {
  outcome: "success" | "pending" | "failed";
  disburseToken: string;
  transactionId?: string;
  responseText?: string;
};

const PAID_STATES = new Set([
  "success",
  "successful",
  "succeeded",
  "completed",
  "complete",
  "paid",
  "approved",
  "ok",
  "done",
  "validated",
  "accepted",
]);
const PENDING_STATES = new Set([
  "pending",
  "processing",
  "in_progress",
  "inprogress",
  "initiated",
  "init",
  "waiting",
  "created",
  "ongoing",
]);
const FAILED_STATES = new Set([
  "failed",
  "failure",
  "error",
  "cancelled",
  "canceled",
  "rejected",
  "refused",
  "expired",
  "declined",
]);

function isRecord(v: unknown): v is Record<string, unknown> {
  return v !== null && typeof v === "object" && !Array.isArray(v);
}

function strVal(v: unknown): string {
  if (v == null) return "";
  if (typeof v === "string") return v;
  if (typeof v === "number" || typeof v === "boolean") return String(v);
  return "";
}

function asAmount(v: unknown): number | undefined {
  if (typeof v === "number" && Number.isFinite(v)) return Math.round(v);
  if (typeof v === "string" && v.trim()) {
    const n = Number(v.replace(/\s/g, "").replace(",", "."));
    if (Number.isFinite(n)) return Math.round(n);
  }
  return undefined;
}

type Collected = {
  urls: string[];
  ids: string[];
  statuses: string[];
  messages: string[];
  amounts: number[];
  successFlag?: boolean;
};

function collect(node: unknown, out: Collected, depth: number): void {
  if (depth > 5 || node == null) return;
  if (Array.isArray(node)) {
    for (const item of node.slice(0, 8)) collect(item, out, depth + 1);
    return;
  }
  if (!isRecord(node)) return;
  for (const [key, val] of Object.entries(node)) {
    const k = key.toLowerCase();
    if (typeof val === "boolean" && (k === "success" || k === "ok" || k === "paid")) {
      out.successFlag = val;
    }
    if (typeof val === "string" || typeof val === "number") {
      const s = strVal(val).trim();
      if (
        /url|link|checkout|redirect/.test(k) &&
        /^https?:\/\//i.test(s)
      ) {
        out.urls.push(s);
      } else if (
        /transaction|reference|paymentid|payment_id|orderid|order_id|^id$/.test(
          k,
        ) &&
        s.length > 0 &&
        s.length < 120
      ) {
        out.ids.push(s);
      } else if (/status|state|statut/.test(k) && s.length > 0 && s.length < 40) {
        out.statuses.push(s.toLowerCase());
      } else if (
        /message|description|error|response_text|msg/.test(k) &&
        s.length > 0
      ) {
        out.messages.push(s.slice(0, 300));
      } else if (/amount|montant|total/.test(k)) {
        const n = asAmount(val);
        if (n != null) out.amounts.push(n);
      }
    }
    if (isRecord(val) || Array.isArray(val)) collect(val, out, depth + 1);
  }
}

function parseBody(raw: unknown): Collected {
  const out: Collected = { urls: [], ids: [], statuses: [], messages: [], amounts: [] };
  collect(raw, out, 0);
  return out;
}

function classify(collected: Collected, httpOk: boolean): SamirPaymentState {
  const statuses = collected.statuses;
  if (statuses.some((s) => FAILED_STATES.has(s)) || collected.successFlag === false) {
    if (!statuses.some((s) => PAID_STATES.has(s)) && collected.successFlag !== true) {
      return "failed";
    }
  }
  if (collected.successFlag === true || statuses.some((s) => PAID_STATES.has(s))) {
    return "paid";
  }
  if (statuses.some((s) => PENDING_STATES.has(s))) return "pending";
  if (!httpOk) return "failed";
  return "pending";
}

@Injectable()
export class SamirPayService {
  private readonly logger = new Logger(SamirPayService.name);

  constructor(private readonly prisma: PrismaService) {}

  isConfigured(): boolean {
    return Boolean(this.apiKey() && this.secretKey());
  }

  private apiKey(): string {
    return process.env.SAMIRPAY_API_KEY?.trim() ?? "";
  }

  private secretKey(): string {
    return process.env.SAMIRPAY_SECRET_KEY?.trim() ?? "";
  }

  private baseUrl(): string {
    return (
      process.env.SAMIRPAY_API_BASE_URL?.trim() ||
      "https://sandbox.samirpay.com"
    ).replace(/\/$/, "");
  }

  private assertConfigured(): void {
    if (!this.apiKey() || !this.secretKey()) {
      throw new ServiceUnavailableException(
        "Paiement SamirPay non configuré sur le serveur",
      );
    }
  }

  private headers(): Record<string, string> {
    this.assertConfigured();
    return {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-API-KEY": this.apiKey(),
      "X-SECRET-KEY": this.secretKey(),
    };
  }

  private async request(
    method: "GET" | "POST",
    path: string,
    body?: Record<string, unknown>,
  ): Promise<{ httpOk: boolean; status: number; parsed: unknown; text: string }> {
    const url = `${this.baseUrl()}${path}`;
    let res: Response;
    try {
      res = await fetch(url, {
        method,
        headers: this.headers(),
        body: body ? JSON.stringify(body) : undefined,
      });
    } catch (e) {
      this.logger.warn(`SamirPay ${method} ${path} réseau: ${String(e)}`);
      throw new ServiceUnavailableException("Réseau SamirPay indisponible");
    }
    const text = await res.text();
    let parsed: unknown = {};
    try {
      parsed = text ? JSON.parse(text) : {};
    } catch {
      this.logger.warn(
        `SamirPay ${method} ${path} non-JSON HTTP ${res.status}: ${text.slice(0, 180)}`,
      );
      parsed = { message: text.slice(0, 300) };
    }
    return { httpOk: res.ok, status: res.status, parsed, text };
  }

  /**
   * Encaissement. POST /samirpays/api/tiers/initPayment
   * Corps documenté : `{ amount, orderId }`.
   */
  async initPayment(params: {
    amountFcfa: number;
    orderId: string;
  }): Promise<SamirInitResult> {
    const amount = Math.round(Number(params.amountFcfa));
    const orderId = params.orderId.trim();
    if (!Number.isFinite(amount) || amount <= 0) {
      throw new ServiceUnavailableException("Montant SamirPay invalide");
    }
    if (!orderId) {
      throw new ServiceUnavailableException("orderId SamirPay manquant");
    }
    this.logger.log(
      `SamirPay initPayment → amount=${String(amount)} orderId=${orderId.slice(0, 24)}`,
    );
    const res = await this.request(
      "POST",
      "/samirpays/api/tiers/initPayment",
      { amount: String(amount), orderId },
    );
    const collected = parseBody(res.parsed);
    const state = classify(collected, res.httpOk);
    if (!res.httpOk || state === "failed") {
      const msg =
        collected.messages[0] ||
        `Initiation SamirPay refusée (HTTP ${String(res.status)})`;
      this.logger.warn(`SamirPay initPayment KO: ${msg.slice(0, 200)}`);
      throw new ServiceUnavailableException(msg);
    }
    const transactionId = collected.ids.find((id) => id !== orderId);
    const checkoutUrl = collected.urls[0];
    const publicToken = (transactionId || orderId).trim();
    this.logger.log(
      `SamirPay initPayment ← token=${publicToken.slice(0, 8)}… url=${checkoutUrl ? "yes" : "no"}`,
    );
    return {
      orderId,
      transactionId,
      publicToken,
      checkoutUrl,
      message: collected.messages[0],
    };
  }

  /** GET /samirpays/api/tiers/payments/{id}/status */
  async getPaymentStatus(transactionOrOrderId: string): Promise<SamirStatusResult> {
    const id = transactionOrOrderId.trim();
    if (!id) return { state: "failed", message: "Identifiant de transaction manquant" };
    const res = await this.request(
      "GET",
      `/samirpays/api/tiers/payments/${encodeURIComponent(id)}/status`,
    );
    const collected = parseBody(res.parsed);
    if (res.status === 404) {
      return { state: "pending", message: collected.messages[0] };
    }
    const state = classify(collected, res.httpOk);
    return {
      state,
      amountFcfa: collected.amounts[0],
      transactionId: collected.ids.find((x) => x !== id),
      message: collected.messages[0],
    };
  }

  /**
   * Versement. POST /samirpays/api/tiers/payments/send
   * Corps documenté : `{ phoneNumber, operatorName, amount }`.
   */
  async cashOut(params: {
    phoneNumber: string;
    operatorName: string;
    amountFcfa: number;
    reference: string;
  }): Promise<SamirCashOutResult> {
    const amount = Math.round(Number(params.amountFcfa));
    const phoneNumber = params.phoneNumber.trim();
    const operatorName = params.operatorName.trim();
    if (!Number.isFinite(amount) || amount <= 0) {
      throw new ServiceUnavailableException("Montant de versement invalide");
    }
    this.logger.log(
      `SamirPay cashout → amount=${String(amount)} operator=${operatorName} ref=${params.reference.slice(0, 24)}`,
    );
    const res = await this.request("POST", "/samirpays/api/tiers/payments/send", {
      phoneNumber,
      operatorName,
      amount: String(amount),
    });
    const collected = parseBody(res.parsed);
    let state = classify(collected, res.httpOk);
    if (
      res.httpOk &&
      state === "pending" &&
      collected.statuses.length === 0 &&
      collected.successFlag == null
    ) {
      state = "paid";
    }
    const transactionId = collected.ids[0];
    if (state === "pending" && transactionId) {
      const follow = await this.getPaymentStatus(transactionId);
      if (follow.state === "paid") state = "paid";
      else if (follow.state === "failed") state = "failed";
    }
    const message = collected.messages[0];
    if (!res.httpOk && state !== "paid") {
      throw new ServiceUnavailableException(
        message || `Versement SamirPay refusé (HTTP ${String(res.status)})`,
      );
    }
    const outcome: SamirCashOutResult["outcome"] =
      state === "paid" ? "success" : state === "failed" ? "failed" : "pending";
    this.logger.log(
      `SamirPay cashout ← outcome=${outcome} tx=${transactionId ? `${transactionId.slice(0, 6)}…` : "none"}`,
    );
    return {
      outcome,
      disburseToken: transactionId || params.reference,
      transactionId,
      responseText: message,
    };
  }

  async saveIntent(input: {
    orderId: string;
    transactionId?: string;
    kind: "prestation" | "abonnement";
    amountFcfa: number;
    checkoutUrl?: string;
    meta: Record<string, unknown>;
  }) {
    const transactionId = input.transactionId?.trim() || null;
    return this.prisma.samirPaymentIntent.create({
      data: {
        orderId: input.orderId,
        transactionId,
        kind: input.kind,
        amountFcfa: input.amountFcfa,
        checkoutUrl: input.checkoutUrl ?? null,
        meta: input.meta as Prisma.InputJsonValue,
      },
    });
  }

  async findIntent(token: string) {
    const t = token.trim();
    if (!t) return null;
    return this.prisma.samirPaymentIntent.findFirst({
      where: { OR: [{ orderId: t }, { transactionId: t }] },
    });
  }
}
