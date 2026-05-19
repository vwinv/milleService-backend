import {
  Injectable,
  Logger,
  ServiceUnavailableException,
} from "@nestjs/common";
import { createHash } from "node:crypto";
import type {
  PaydunyaSoftPayResponse,
  SoftPayCardInput,
  SoftPayExpressoSenegalInput,
  SoftPayFreeMoneySenegalInput,
  SoftPayMoovBeninInput,
  SoftPayMoovBurkinaInput,
  SoftPayMoovCiInput,
  SoftPayMoovMaliInput,
  SoftPayMoovTogoInput,
  SoftPayMtnBeninInput,
  SoftPayMtnCamerounInput,
  SoftPayMtnCiInput,
  SoftPayOrangeMoneyBurkinaInput,
  SoftPayOrangeMoneyCiInput,
  SoftPayOrangeMoneyMaliInput,
  SoftPayOrangeMoneySenegalInput,
  SoftPayPaydunyaWalletInput,
  SoftPayTMoneyTogoInput,
  SoftPayWaveCiInput,
  SoftPayWaveSenegalInput,
  SoftPayWizallSenegalConfirmInput,
  SoftPayWizallSenegalInput,
} from "./paydunya-softpay.types.js";

export type CreatePaydunyaInvoiceInput = {
  totalAmountFcfa: number;
  description: string;
  storeName: string;
  callbackUrl: string;
  returnUrl?: string;
  cancelUrl?: string;
  customData: Record<string, string | number | boolean | null | undefined>;
};

export type CreatePaydunyaInvoiceResult = {
  checkoutUrl: string;
  invoiceToken: string;
  responseCode: string;
  responseText: string;
};

/** Réponse `GET /checkout-invoice/confirm/{token}` (même forme que l’IPN). */
export type PaydunyaConfirmInvoiceResult = {
  hash: string;
  status: string;
  totalAmount: number;
  invoiceToken: string;
  customData: Record<string, unknown>;
};

function isRecord(v: unknown): v is Record<string, unknown> {
  return v !== null && typeof v === "object" && !Array.isArray(v);
}

function strVal(v: unknown): string {
  if (v == null) return "";
  if (typeof v === "string") return v;
  if (typeof v === "number" || typeof v === "boolean") return String(v);
  return "";
}

/** Pour les logs : ne pas écrire tokens, téléphones ou emails en clair. */
function redactSoftPayBodyForLog(
  body: Record<string, unknown>,
): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [key, val] of Object.entries(body)) {
    const s =
      val == null ? "" : typeof val === "string" ? val : String(val);
    if (/token/i.test(key)) {
      out[key] = s.length > 8 ? `${s.slice(0, 6)}…` : "[redacted]";
    } else if (/phone|tel/i.test(key)) {
      out[key] = s.length >= 2 ? `***${s.slice(-2)}` : "[redacted]";
    } else if (/email/i.test(key)) {
      out[key] = s.length > 0 ? "[redacted]" : "";
    } else if (/name|fullname/i.test(key)) {
      out[key] = s.length > 24 ? `${s.slice(0, 24)}…` : s;
    } else {
      out[key] = s.length > 120 ? `${s.slice(0, 120)}…` : s;
    }
  }
  return out;
}

function summarizeSoftPayResponse(out: PaydunyaSoftPayResponse): string {
  const bits: string[] = [`success=${String(out.success)}`];
  if (out.message) {
    bits.push(`message="${out.message.slice(0, 160)}"`);
  }
  bits.push(`url=${out.url ? "yes" : "no"}`);
  if (out.other_url?.om_url) bits.push("om_url=yes");
  if (out.other_url?.maxit_url) bits.push("maxit_url=yes");
  if (out.fees != null) bits.push(`fees=${String(out.fees)}`);
  if (out.currency) bits.push(`currency=${out.currency}`);
  return bits.join(" ");
}

@Injectable()
export class PaydunyaService {
  private readonly logger = new Logger(PaydunyaService.name);

  private masterKey(): string {
    const k = process.env.PAYDUNYA_MASTER_KEY?.trim();
    if (!k) {
      throw new ServiceUnavailableException(
        "Paiement indisponible : PAYDUNYA_MASTER_KEY manquant",
      );
    }
    return k;
  }

  private privateKey(): string {
    const k = process.env.PAYDUNYA_PRIVATE_KEY?.trim();
    if (!k) {
      throw new ServiceUnavailableException(
        "Paiement indisponible : PAYDUNYA_PRIVATE_KEY manquant",
      );
    }
    return k;
  }

  private token(): string {
    const k = process.env.PAYDUNYA_TOKEN?.trim();
    if (!k) {
      throw new ServiceUnavailableException(
        "Paiement indisponible : PAYDUNYA_TOKEN manquant",
      );
    }
    return k;
  }

  private baseUrl(): string {
    return (
      process.env.PAYDUNYA_API_BASE_URL?.trim() || "https://app.paydunya.com"
    ).replace(/\/$/, "");
  }

  private paydunyaAuthHeaders(): Record<string, string> {
    return {
      "Content-Type": "application/json",
      "PAYDUNYA-MASTER-KEY": this.masterKey(),
      "PAYDUNYA-PRIVATE-KEY": this.privateKey(),
      "PAYDUNYA-TOKEN": this.token(),
    };
  }

  /** Parse la réponse JSON d’un endpoint SoftPay (doc PayDunya). */
  private parseSoftPayResponse(raw: unknown): PaydunyaSoftPayResponse {
    if (!isRecord(raw)) {
      return { success: false, message: "Réponse SoftPay invalide" };
    }
    const success = raw["success"] === true;
    const message = strVal(raw["message"]).trim() || undefined;
    const url = strVal(raw["url"]).trim() || undefined;
    let other_url: PaydunyaSoftPayResponse["other_url"];
    const ou = raw["other_url"];
    if (isRecord(ou)) {
      const om = strVal(ou["om_url"]).trim();
      const mx = strVal(ou["maxit_url"]).trim();
      if (om || mx) {
        other_url = {
          ...(om ? { om_url: om } : {}),
          ...(mx ? { maxit_url: mx } : {}),
        };
      }
    }
    const feesRaw = raw["fees"];
    const fees =
      typeof feesRaw === "number" && Number.isFinite(feesRaw)
        ? feesRaw
        : undefined;
    const currency = strVal(raw["currency"]).trim() || undefined;
    const data = raw["data"];
    const return_url = strVal(raw["return_url"]).trim() || undefined;
    const token = strVal(raw["token"]).trim() || undefined;
    const errors = raw["errors"];
    return {
      success,
      message,
      url,
      other_url,
      fees,
      currency,
      data: data !== undefined ? data : undefined,
      errors: errors !== undefined ? errors : undefined,
      return_url,
      token,
    };
  }

  /**
   * POST générique SoftPay — chemins documentés : /api/v1/softpay/...
   * @see https://developers.paydunya.com/doc/FR/softpay
   */
  async softPayPost(
    path: string,
    body: Record<string, unknown>,
  ): Promise<PaydunyaSoftPayResponse> {
    const p = path.startsWith("/") ? path : `/${path}`;
    const url = `${this.baseUrl()}${p}`;
    this.logger.log(
      `PayDunya SoftPay → POST ${p} body=${JSON.stringify(redactSoftPayBodyForLog(body))}`,
    );
    let res: Response;
    try {
      res = await fetch(url, {
        method: "POST",
        headers: this.paydunyaAuthHeaders(),
        body: JSON.stringify(body),
      });
    } catch (e) {
      this.logger.warn(`SoftPay ${p}: fetch error ${String(e)}`);
      throw new ServiceUnavailableException("Réseau PayDunya indisponible");
    }
    const rawText = await res.text();
    let parsed: unknown;
    try {
      parsed = rawText ? JSON.parse(rawText) : {};
    } catch {
      this.logger.warn(
        `SoftPay ${p}: réponse non JSON ${rawText.slice(0, 200)}`,
      );
      return {
        success: false,
        message: "Réponse PayDunya non JSON",
      };
    }
    const out = this.parseSoftPayResponse(parsed);
    const summary = `http=${String(res.status)} ${summarizeSoftPayResponse(out)}`;
    if (res.ok && out.success) {
      this.logger.log(`PayDunya SoftPay ← ${p} ${summary}`);
    } else {
      this.logger.warn(
        `PayDunya SoftPay ← ${p} ${summary} snippet=${rawText.slice(0, 280)}`,
      );
    }
    if (!res.ok) {
      return {
        ...out,
        success: false,
        message: out.message || `HTTP ${String(res.status)}`,
      };
    }
    return out;
  }

  isConfigured(): boolean {
    try {
      this.masterKey();
      this.privateKey();
      this.token();
      return true;
    } catch {
      return false;
    }
  }

  /** SHA-512 du Master Key (vérification IPN selon doc PayDunya). */
  verifyIpnHash(receivedHash: string | undefined | null): boolean {
    const mk = process.env.PAYDUNYA_MASTER_KEY?.trim();
    if (!mk || !receivedHash || typeof receivedHash !== "string") return false;
    const expected = createHash("sha512").update(mk, "utf8").digest("hex");
    const a = receivedHash.trim().toLowerCase();
    const b = expected.toLowerCase();
    return a.length === b.length && a === b;
  }

  async createCheckoutInvoice(
    input: CreatePaydunyaInvoiceInput,
  ): Promise<CreatePaydunyaInvoiceResult> {
    const url = `${this.baseUrl()}/api/v1/checkout-invoice/create`;
    const amount = Math.round(Number(input.totalAmountFcfa));
    if (!Number.isFinite(amount) || amount <= 0) {
      throw new ServiceUnavailableException("Montant facture invalide");
    }

    const body = {
      invoice: {
        total_amount: amount,
        description: input.description.slice(0, 500),
      },
      store: {
        name: input.storeName.slice(0, 200),
      },
      custom_data: Object.fromEntries(
        Object.entries(input.customData).filter(
          ([, v]) => v !== undefined && v !== null && String(v).length > 0,
        ),
      ) as Record<string, string | number | boolean>,
      actions: {
        callback_url: input.callbackUrl,
        ...(input.returnUrl ? { return_url: input.returnUrl } : {}),
        ...(input.cancelUrl ? { cancel_url: input.cancelUrl } : {}),
      },
    };

    let callbackHost = "";
    try {
      callbackHost = new URL(input.callbackUrl).host;
    } catch {
      callbackHost = "(invalid-callback-url)";
    }
    const customKeys = Object.keys(input.customData).join(",");
    this.logger.log(
      `PayDunya checkout-invoice/create → POST total_amount=${String(amount)} descriptionLen=${String(input.description.length)} store="${input.storeName.slice(0, 60)}" callbackHost=${callbackHost} customDataKeys=${customKeys}`,
    );

    const res = await fetch(url, {
      method: "POST",
      headers: this.paydunyaAuthHeaders(),
      body: JSON.stringify(body),
    });

    const rawText = await res.text();
    let parsed: unknown;
    try {
      parsed = rawText ? JSON.parse(rawText) : {};
    } catch {
      this.logger.warn(
        `Paydunya create invoice: réponse non JSON: ${rawText.slice(0, 200)}`,
      );
      throw new ServiceUnavailableException("Réponse PayDunya invalide");
    }

    if (!isRecord(parsed)) {
      throw new ServiceUnavailableException("Réponse PayDunya invalide");
    }

    if (!res.ok) {
      this.logger.warn(
        `Paydunya HTTP ${res.status}: ${JSON.stringify(parsed).slice(0, 500)}`,
      );
      throw new ServiceUnavailableException(
        strVal(parsed["response_text"]) ||
          "Impossible de créer la facture PayDunya",
      );
    }

    const code = strVal(parsed["response_code"]);
    if (code !== "00") {
      this.logger.warn(
        `Paydunya erreur code ${code}: ${JSON.stringify(parsed)}`,
      );
      throw new ServiceUnavailableException(
        strVal(parsed["response_text"]) || "Facture PayDunya refusée",
      );
    }

    const invoiceToken = strVal(parsed["token"]).trim();
    const checkoutUrl = strVal(parsed["response_text"]).trim();
    if (!invoiceToken || !checkoutUrl) {
      throw new ServiceUnavailableException(
        "Réponse PayDunya incomplète (token / URL)",
      );
    }

    let checkoutHost = "";
    try {
      checkoutHost = new URL(checkoutUrl).host;
    } catch {
      checkoutHost = "?";
    }
    this.logger.log(
      `PayDunya checkout-invoice/create ← OK token=${invoiceToken.length > 8 ? `${invoiceToken.slice(0, 8)}…` : "[short]"} response_code=${code} checkoutHost=${checkoutHost}`,
    );

    return {
      checkoutUrl,
      invoiceToken,
      responseCode: code,
      responseText: strVal(parsed["description"]) || "OK",
    };
  }

  /**
   * Vérifie le statut d’une facture chez PayDunya (repli si l’IPN n’a pas atteint le serveur).
   * @see https://developers.paydunya.com/doc/FR/http_json#section-8
   */
  async confirmCheckoutInvoice(
    invoiceToken: string,
  ): Promise<PaydunyaConfirmInvoiceResult | null> {
    const token = invoiceToken?.trim();
    if (!token) return null;

    const url = `${this.baseUrl()}/api/v1/checkout-invoice/confirm/${encodeURIComponent(token)}`;
    this.logger.log(
      `PayDunya checkout-invoice/confirm → GET token=${token.length > 8 ? `${token.slice(0, 8)}…` : "[short]"}`,
    );

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...this.paydunyaAuthHeaders(),
      },
    });

    const rawText = await res.text();
    let parsed: unknown;
    try {
      parsed = rawText ? JSON.parse(rawText) : {};
    } catch {
      this.logger.warn(
        `PayDunya confirm: réponse non JSON: ${rawText.slice(0, 200)}`,
      );
      return null;
    }
    if (!isRecord(parsed)) return null;

    if (!res.ok || strVal(parsed["response_code"]) !== "00") {
      this.logger.warn(
        `PayDunya confirm HTTP ${res.status} code=${strVal(parsed["response_code"])}`,
      );
      return null;
    }

    const hash = strVal(parsed["hash"]).trim();
    const status = strVal(parsed["status"]).trim().toLowerCase();
    const inv = parsed["invoice"];
    let totalAmount = NaN;
    let invToken = token;
    if (inv && typeof inv === "object" && !Array.isArray(inv)) {
      const invObj = inv as Record<string, unknown>;
      totalAmount = Number(invObj.total_amount);
      invToken = strVal(invObj.token).trim() || token;
    }
    const customRaw = parsed["custom_data"];
    const customData =
      customRaw && typeof customRaw === "object" && !Array.isArray(customRaw)
        ? (customRaw as Record<string, unknown>)
        : {};

    if (!hash || !Number.isFinite(totalAmount)) return null;

    this.logger.log(
      `PayDunya confirm ← status=${status} amount=${String(totalAmount)}`,
    );

    return {
      hash,
      status,
      totalAmount,
      invoiceToken: invToken,
      customData,
    };
  }

  /** PCI-DSS requis côté PayDunya pour la production. */
  softPayCard(input: SoftPayCardInput) {
    return this.softPayPost("/api/v1/softpay/card", { ...input });
  }

  softPayOrangeMoneySenegal(input: SoftPayOrangeMoneySenegalInput) {
    return this.softPayPost("/api/v1/softpay/new-orange-money-senegal", {
      ...input,
    });
  }

  softPayFreeMoneySenegal(input: SoftPayFreeMoneySenegalInput) {
    return this.softPayPost("/api/v1/softpay/free-money-senegal", { ...input });
  }

  softPayExpressoSenegal(input: SoftPayExpressoSenegalInput) {
    return this.softPayPost("/api/v1/softpay/expresso-senegal", { ...input });
  }

  softPayWaveSenegal(input: SoftPayWaveSenegalInput) {
    return this.softPayPost("/api/v1/softpay/wave-senegal", { ...input });
  }

  softPayWizallSenegal(input: SoftPayWizallSenegalInput) {
    return this.softPayPost("/api/v1/softpay/wizall-money-senegal", {
      ...input,
    });
  }

  softPayWizallSenegalConfirm(input: SoftPayWizallSenegalConfirmInput) {
    return this.softPayPost("/api/v1/softpay/wizall-money-senegal/confirm", {
      ...input,
    });
  }

  softPayOrangeMoneyCi(input: SoftPayOrangeMoneyCiInput) {
    return this.softPayPost("/api/v1/softpay/orange-money-ci", { ...input });
  }

  softPayMtnCi(input: SoftPayMtnCiInput) {
    return this.softPayPost("/api/v1/softpay/mtn-ci", { ...input });
  }

  softPayMoovCi(input: SoftPayMoovCiInput) {
    return this.softPayPost("/api/v1/softpay/moov-ci", { ...input });
  }

  softPayWaveCi(input: SoftPayWaveCiInput) {
    return this.softPayPost("/api/v1/softpay/wave-ci", { ...input });
  }

  softPayOrangeMoneyBurkina(input: SoftPayOrangeMoneyBurkinaInput) {
    return this.softPayPost("/api/v1/softpay/orange-money-burkina", {
      ...input,
    });
  }

  softPayMoovBurkina(input: SoftPayMoovBurkinaInput) {
    return this.softPayPost("/api/v1/softpay/moov-burkina", { ...input });
  }

  softPayMoovBenin(input: SoftPayMoovBeninInput) {
    return this.softPayPost("/api/v1/softpay/moov-benin", { ...input });
  }

  softPayMtnBenin(input: SoftPayMtnBeninInput) {
    return this.softPayPost("/api/v1/softpay/mtn-benin", { ...input });
  }

  softPayTMoneyTogo(input: SoftPayTMoneyTogoInput) {
    return this.softPayPost("/api/v1/softpay/t-money-togo", { ...input });
  }

  softPayMoovTogo(input: SoftPayMoovTogoInput) {
    return this.softPayPost("/api/v1/softpay/moov-togo", { ...input });
  }

  softPayOrangeMoneyMali(input: SoftPayOrangeMoneyMaliInput) {
    return this.softPayPost("/api/v1/softpay/orange-money-mali", { ...input });
  }

  softPayMoovMali(input: SoftPayMoovMaliInput) {
    return this.softPayPost("/api/v1/softpay/moov-mali", { ...input });
  }

  softPayMtnCameroun(input: SoftPayMtnCamerounInput) {
    return this.softPayPost("/api/v1/softpay/mtn-cameroun", { ...input });
  }

  softPayPaydunyaWallet(input: SoftPayPaydunyaWalletInput) {
    return this.softPayPost("/api/v1/softpay/paydunya", { ...input });
  }

  // ---------------------------------------------------------------------------
  // API PUSH / déboursement (v2)
  // @see https://developers.paydunya.com/doc/FR/api_deboursement
  // ---------------------------------------------------------------------------

  /**
   * URL IPN déboursement (get-invoice). Ordre :
   * 1) `PAYDUNYA_DISBURSE_CALLBACK_URL` — URL complète si besoin d’un chemin dédié
   * 2) sinon même base que le checkout : `PAYDUNYA_CALLBACK_BASE_URL` ou `PUBLIC_API_URL` + `/webhooks/paydunya/disburse`
   */
  private disburseCallbackUrl(): string {
    const explicit = process.env.PAYDUNYA_DISBURSE_CALLBACK_URL?.trim();
    if (explicit) {
      try {
        new URL(explicit);
        return explicit;
      } catch {
        throw new ServiceUnavailableException(
          "PAYDUNYA_DISBURSE_CALLBACK_URL invalide",
        );
      }
    }
    const baseRaw =
      process.env.PAYDUNYA_CALLBACK_BASE_URL?.trim() ||
      process.env.PUBLIC_API_URL?.trim() ||
      "";
    if (!baseRaw) {
      throw new ServiceUnavailableException(
        "Définir PUBLIC_API_URL (ou PAYDUNYA_CALLBACK_BASE_URL), ou PAYDUNYA_DISBURSE_CALLBACK_URL en URL complète, pour les déboursements PayDunya — ex. même base que l’IPN checkout + chemin /webhooks/paydunya/disburse",
      );
    }
    const base = baseRaw.replace(/\/$/, "");
    const withScheme = /^https?:\/\//i.test(base) ? base : `http://${base}`;
    const full = `${withScheme}/webhooks/paydunya/disburse`;
    try {
      new URL(full);
    } catch {
      throw new ServiceUnavailableException(
        "PUBLIC_API_URL / PAYDUNYA_CALLBACK_BASE_URL invalide pour le callback déboursement",
      );
    }
    return full;
  }

  private parseDisburseSubmitOutcome(
    parsed: Record<string, unknown>,
  ): "success" | "pending" | "failed" {
    const code = strVal(parsed["response_code"]);
    if (code !== "00") return "failed";
    const st = strVal(parsed["status"]).toLowerCase();
    if (st === "pending") return "pending";
    const rt = strVal(parsed["response_text"]).toLowerCase();
    if (rt.includes("pending")) return "pending";
    return "success";
  }

  /**
   * Initie un déboursement (facture) — étape 1/2.
   */
  async disburseGetInvoice(params: {
    account_alias: string;
    amount: number;
    withdraw_mode: string;
    callback_url: string;
    debit_account_number?: string;
  }): Promise<{ disburse_token: string }> {
    const url = `${this.baseUrl()}/api/v2/disburse/get-invoice`;
    const amount = Math.round(Number(params.amount));
    if (!Number.isFinite(amount) || amount <= 0) {
      throw new ServiceUnavailableException("Montant déboursement invalide");
    }
    const body: Record<string, unknown> = {
      account_alias: params.account_alias,
      amount,
      withdraw_mode: params.withdraw_mode,
      callback_url: params.callback_url,
    };
    if (params.debit_account_number) {
      body.debit_account_number = params.debit_account_number;
    }
    this.logger.log(
      `PayDunya disburse get-invoice → POST amount=${String(amount)} mode=${params.withdraw_mode}`,
    );
    let res: Response;
    try {
      res = await fetch(url, {
        method: "POST",
        headers: this.paydunyaAuthHeaders(),
        body: JSON.stringify(body),
      });
    } catch (e) {
      this.logger.warn(`disburse get-invoice: fetch error ${String(e)}`);
      throw new ServiceUnavailableException("Réseau PayDunya indisponible");
    }
    const rawText = await res.text();
    let parsed: unknown;
    try {
      parsed = rawText ? JSON.parse(rawText) : {};
    } catch {
      this.logger.warn(
        `disburse get-invoice: non-JSON ${rawText.slice(0, 200)}`,
      );
      throw new ServiceUnavailableException("Réponse PayDunya invalide");
    }
    if (!isRecord(parsed)) {
      throw new ServiceUnavailableException("Réponse PayDunya invalide");
    }
    const code = strVal(parsed["response_code"]);
    if (!res.ok || code !== "00") {
      const msg =
        strVal(parsed["response_text"]) ||
        strVal(parsed["description"]) ||
        `HTTP ${String(res.status)}`;
      this.logger.warn(`disburse get-invoice échec: ${msg}`);
      throw new ServiceUnavailableException(msg || "Déboursement refusé");
    }
    const disburse_token = strVal(parsed["disburse_token"]).trim();
    if (!disburse_token) {
      throw new ServiceUnavailableException(
        "Réponse PayDunya incomplète (disburse_token)",
      );
    }
    this.logger.log(`PayDunya disburse get-invoice ← OK token=${disburse_token.slice(0, 6)}…`);
    return { disburse_token };
  }

  /**
   * Soumet le déboursement — étape 2/2.
   */
  async disburseSubmitInvoice(params: {
    disburse_invoice: string;
    disburse_id?: string;
  }): Promise<Record<string, unknown>> {
    const url = `${this.baseUrl()}/api/v2/disburse/submit-invoice`;
    const body: Record<string, unknown> = {
      disburse_invoice: params.disburse_invoice.trim(),
    };
    if (params.disburse_id) {
      body.disburse_id = params.disburse_id;
    }
    let res: Response;
    try {
      res = await fetch(url, {
        method: "POST",
        headers: this.paydunyaAuthHeaders(),
        body: JSON.stringify(body),
      });
    } catch (e) {
      this.logger.warn(`disburse submit-invoice: fetch error ${String(e)}`);
      throw new ServiceUnavailableException("Réseau PayDunya indisponible");
    }
    const rawText = await res.text();
    let parsed: unknown;
    try {
      parsed = rawText ? JSON.parse(rawText) : {};
    } catch {
      this.logger.warn(
        `disburse submit-invoice: non-JSON ${rawText.slice(0, 200)}`,
      );
      throw new ServiceUnavailableException("Réponse PayDunya invalide");
    }
    if (!isRecord(parsed)) {
      throw new ServiceUnavailableException("Réponse PayDunya invalide");
    }
    if (!res.ok) {
      const msg =
        strVal(parsed["response_text"]) ||
        strVal(parsed["description"]) ||
        `HTTP ${String(res.status)}`;
      this.logger.warn(`disburse submit-invoice HTTP: ${msg}`);
      throw new ServiceUnavailableException(msg || "Soumission déboursement refusée");
    }
    return parsed;
  }

  /**
   * get-invoice + submit-invoice. `disburse_id` permet de corréler le callback IPN.
   */
  async disbursePush(params: {
    account_alias: string;
    amountFcfa: number;
    withdraw_mode: string;
    disburse_id?: string;
  }): Promise<{
    outcome: "success" | "pending" | "failed";
    disburseToken: string;
    transactionId?: string;
    responseText?: string;
    rawResponse: Record<string, unknown>;
  }> {
    const callbackUrl = this.disburseCallbackUrl();
    const gi = await this.disburseGetInvoice({
      account_alias: params.account_alias,
      amount: params.amountFcfa,
      withdraw_mode: params.withdraw_mode,
      callback_url: callbackUrl,
    });
    const token = gi.disburse_token.trim();
    const submit = await this.disburseSubmitInvoice({
      disburse_invoice: token,
      disburse_id: params.disburse_id,
    });
    const outcome = this.parseDisburseSubmitOutcome(submit);
    return {
      outcome,
      disburseToken: token,
      transactionId: strVal(submit["transaction_id"]).trim() || undefined,
      responseText: strVal(submit["response_text"]).trim() || undefined,
      rawResponse: submit,
    };
  }
}
