"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var PaydunyaService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaydunyaService = void 0;
const common_1 = require("@nestjs/common");
const node_crypto_1 = require("node:crypto");
function isRecord(v) {
    return v !== null && typeof v === "object" && !Array.isArray(v);
}
function strVal(v) {
    if (v == null)
        return "";
    if (typeof v === "string")
        return v;
    if (typeof v === "number" || typeof v === "boolean")
        return String(v);
    return "";
}
function redactSoftPayBodyForLog(body) {
    const out = {};
    for (const [key, val] of Object.entries(body)) {
        const s = val == null ? "" : typeof val === "string" ? val : String(val);
        if (/token/i.test(key)) {
            out[key] = s.length > 8 ? `${s.slice(0, 6)}…` : "[redacted]";
        }
        else if (/phone|tel/i.test(key)) {
            out[key] = s.length >= 2 ? `***${s.slice(-2)}` : "[redacted]";
        }
        else if (/email/i.test(key)) {
            out[key] = s.length > 0 ? "[redacted]" : "";
        }
        else if (/name|fullname/i.test(key)) {
            out[key] = s.length > 24 ? `${s.slice(0, 24)}…` : s;
        }
        else {
            out[key] = s.length > 120 ? `${s.slice(0, 120)}…` : s;
        }
    }
    return out;
}
function summarizeSoftPayResponse(out) {
    const bits = [`success=${String(out.success)}`];
    if (out.message) {
        bits.push(`message="${out.message.slice(0, 160)}"`);
    }
    bits.push(`url=${out.url ? "yes" : "no"}`);
    if (out.other_url?.om_url)
        bits.push("om_url=yes");
    if (out.other_url?.maxit_url)
        bits.push("maxit_url=yes");
    if (out.fees != null)
        bits.push(`fees=${String(out.fees)}`);
    if (out.currency)
        bits.push(`currency=${out.currency}`);
    return bits.join(" ");
}
let PaydunyaService = PaydunyaService_1 = class PaydunyaService {
    logger = new common_1.Logger(PaydunyaService_1.name);
    masterKey() {
        const k = process.env.PAYDUNYA_MASTER_KEY?.trim();
        if (!k) {
            throw new common_1.ServiceUnavailableException("Paiement indisponible : PAYDUNYA_MASTER_KEY manquant");
        }
        return k;
    }
    privateKey() {
        const k = process.env.PAYDUNYA_PRIVATE_KEY?.trim();
        if (!k) {
            throw new common_1.ServiceUnavailableException("Paiement indisponible : PAYDUNYA_PRIVATE_KEY manquant");
        }
        return k;
    }
    token() {
        const k = process.env.PAYDUNYA_TOKEN?.trim();
        if (!k) {
            throw new common_1.ServiceUnavailableException("Paiement indisponible : PAYDUNYA_TOKEN manquant");
        }
        return k;
    }
    baseUrl() {
        return (process.env.PAYDUNYA_API_BASE_URL?.trim() || "https://app.paydunya.com").replace(/\/$/, "");
    }
    paydunyaAuthHeaders() {
        return {
            "Content-Type": "application/json",
            "PAYDUNYA-MASTER-KEY": this.masterKey(),
            "PAYDUNYA-PRIVATE-KEY": this.privateKey(),
            "PAYDUNYA-TOKEN": this.token(),
        };
    }
    parseSoftPayResponse(raw) {
        if (!isRecord(raw)) {
            return { success: false, message: "Réponse SoftPay invalide" };
        }
        const success = raw["success"] === true;
        const message = strVal(raw["message"]).trim() || undefined;
        const url = strVal(raw["url"]).trim() || undefined;
        let other_url;
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
        const fees = typeof feesRaw === "number" && Number.isFinite(feesRaw)
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
    async softPayPost(path, body) {
        const p = path.startsWith("/") ? path : `/${path}`;
        const url = `${this.baseUrl()}${p}`;
        this.logger.log(`PayDunya SoftPay → POST ${p} body=${JSON.stringify(redactSoftPayBodyForLog(body))}`);
        let res;
        try {
            res = await fetch(url, {
                method: "POST",
                headers: this.paydunyaAuthHeaders(),
                body: JSON.stringify(body),
            });
        }
        catch (e) {
            this.logger.warn(`SoftPay ${p}: fetch error ${String(e)}`);
            throw new common_1.ServiceUnavailableException("Réseau PayDunya indisponible");
        }
        const rawText = await res.text();
        let parsed;
        try {
            parsed = rawText ? JSON.parse(rawText) : {};
        }
        catch {
            this.logger.warn(`SoftPay ${p}: réponse non JSON ${rawText.slice(0, 200)}`);
            return {
                success: false,
                message: "Réponse PayDunya non JSON",
            };
        }
        const out = this.parseSoftPayResponse(parsed);
        const summary = `http=${String(res.status)} ${summarizeSoftPayResponse(out)}`;
        if (res.ok && out.success) {
            this.logger.log(`PayDunya SoftPay ← ${p} ${summary}`);
        }
        else {
            this.logger.warn(`PayDunya SoftPay ← ${p} ${summary} snippet=${rawText.slice(0, 280)}`);
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
    isConfigured() {
        try {
            this.masterKey();
            this.privateKey();
            this.token();
            return true;
        }
        catch {
            return false;
        }
    }
    verifyIpnHash(receivedHash) {
        const mk = process.env.PAYDUNYA_MASTER_KEY?.trim();
        if (!mk || !receivedHash || typeof receivedHash !== "string")
            return false;
        const expected = (0, node_crypto_1.createHash)("sha512").update(mk, "utf8").digest("hex");
        const a = receivedHash.trim().toLowerCase();
        const b = expected.toLowerCase();
        return a.length === b.length && a === b;
    }
    async createCheckoutInvoice(input) {
        const url = `${this.baseUrl()}/api/v1/checkout-invoice/create`;
        const amount = Math.round(Number(input.totalAmountFcfa));
        if (!Number.isFinite(amount) || amount <= 0) {
            throw new common_1.ServiceUnavailableException("Montant facture invalide");
        }
        const body = {
            invoice: {
                total_amount: amount,
                description: input.description.slice(0, 500),
            },
            store: {
                name: input.storeName.slice(0, 200),
            },
            custom_data: Object.fromEntries(Object.entries(input.customData).filter(([, v]) => v !== undefined && v !== null && String(v).length > 0)),
            actions: {
                callback_url: input.callbackUrl,
                ...(input.returnUrl ? { return_url: input.returnUrl } : {}),
                ...(input.cancelUrl ? { cancel_url: input.cancelUrl } : {}),
            },
        };
        let callbackHost = "";
        try {
            callbackHost = new URL(input.callbackUrl).host;
        }
        catch {
            callbackHost = "(invalid-callback-url)";
        }
        const customKeys = Object.keys(input.customData).join(",");
        this.logger.log(`PayDunya checkout-invoice/create → POST total_amount=${String(amount)} descriptionLen=${String(input.description.length)} store="${input.storeName.slice(0, 60)}" callbackHost=${callbackHost} customDataKeys=${customKeys}`);
        const res = await fetch(url, {
            method: "POST",
            headers: this.paydunyaAuthHeaders(),
            body: JSON.stringify(body),
        });
        const rawText = await res.text();
        let parsed;
        try {
            parsed = rawText ? JSON.parse(rawText) : {};
        }
        catch {
            this.logger.warn(`Paydunya create invoice: réponse non JSON: ${rawText.slice(0, 200)}`);
            throw new common_1.ServiceUnavailableException("Réponse PayDunya invalide");
        }
        if (!isRecord(parsed)) {
            throw new common_1.ServiceUnavailableException("Réponse PayDunya invalide");
        }
        if (!res.ok) {
            this.logger.warn(`Paydunya HTTP ${res.status}: ${JSON.stringify(parsed).slice(0, 500)}`);
            throw new common_1.ServiceUnavailableException(strVal(parsed["response_text"]) ||
                "Impossible de créer la facture PayDunya");
        }
        const code = strVal(parsed["response_code"]);
        if (code !== "00") {
            this.logger.warn(`Paydunya erreur code ${code}: ${JSON.stringify(parsed)}`);
            throw new common_1.ServiceUnavailableException(strVal(parsed["response_text"]) || "Facture PayDunya refusée");
        }
        const invoiceToken = strVal(parsed["token"]).trim();
        const checkoutUrl = strVal(parsed["response_text"]).trim();
        if (!invoiceToken || !checkoutUrl) {
            throw new common_1.ServiceUnavailableException("Réponse PayDunya incomplète (token / URL)");
        }
        let checkoutHost = "";
        try {
            checkoutHost = new URL(checkoutUrl).host;
        }
        catch {
            checkoutHost = "?";
        }
        this.logger.log(`PayDunya checkout-invoice/create ← OK token=${invoiceToken.length > 8 ? `${invoiceToken.slice(0, 8)}…` : "[short]"} response_code=${code} checkoutHost=${checkoutHost}`);
        return {
            checkoutUrl,
            invoiceToken,
            responseCode: code,
            responseText: strVal(parsed["description"]) || "OK",
        };
    }
    softPayCard(input) {
        return this.softPayPost("/api/v1/softpay/card", { ...input });
    }
    softPayOrangeMoneySenegal(input) {
        return this.softPayPost("/api/v1/softpay/new-orange-money-senegal", {
            ...input,
        });
    }
    softPayFreeMoneySenegal(input) {
        return this.softPayPost("/api/v1/softpay/free-money-senegal", { ...input });
    }
    softPayExpressoSenegal(input) {
        return this.softPayPost("/api/v1/softpay/expresso-senegal", { ...input });
    }
    softPayWaveSenegal(input) {
        return this.softPayPost("/api/v1/softpay/wave-senegal", { ...input });
    }
    softPayWizallSenegal(input) {
        return this.softPayPost("/api/v1/softpay/wizall-money-senegal", {
            ...input,
        });
    }
    softPayWizallSenegalConfirm(input) {
        return this.softPayPost("/api/v1/softpay/wizall-money-senegal/confirm", {
            ...input,
        });
    }
    softPayOrangeMoneyCi(input) {
        return this.softPayPost("/api/v1/softpay/orange-money-ci", { ...input });
    }
    softPayMtnCi(input) {
        return this.softPayPost("/api/v1/softpay/mtn-ci", { ...input });
    }
    softPayMoovCi(input) {
        return this.softPayPost("/api/v1/softpay/moov-ci", { ...input });
    }
    softPayWaveCi(input) {
        return this.softPayPost("/api/v1/softpay/wave-ci", { ...input });
    }
    softPayOrangeMoneyBurkina(input) {
        return this.softPayPost("/api/v1/softpay/orange-money-burkina", {
            ...input,
        });
    }
    softPayMoovBurkina(input) {
        return this.softPayPost("/api/v1/softpay/moov-burkina", { ...input });
    }
    softPayMoovBenin(input) {
        return this.softPayPost("/api/v1/softpay/moov-benin", { ...input });
    }
    softPayMtnBenin(input) {
        return this.softPayPost("/api/v1/softpay/mtn-benin", { ...input });
    }
    softPayTMoneyTogo(input) {
        return this.softPayPost("/api/v1/softpay/t-money-togo", { ...input });
    }
    softPayMoovTogo(input) {
        return this.softPayPost("/api/v1/softpay/moov-togo", { ...input });
    }
    softPayOrangeMoneyMali(input) {
        return this.softPayPost("/api/v1/softpay/orange-money-mali", { ...input });
    }
    softPayMoovMali(input) {
        return this.softPayPost("/api/v1/softpay/moov-mali", { ...input });
    }
    softPayMtnCameroun(input) {
        return this.softPayPost("/api/v1/softpay/mtn-cameroun", { ...input });
    }
    softPayPaydunyaWallet(input) {
        return this.softPayPost("/api/v1/softpay/paydunya", { ...input });
    }
};
exports.PaydunyaService = PaydunyaService;
exports.PaydunyaService = PaydunyaService = PaydunyaService_1 = __decorate([
    (0, common_1.Injectable)()
], PaydunyaService);
//# sourceMappingURL=paydunya.service.js.map