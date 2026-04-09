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
}
