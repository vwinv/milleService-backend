"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvePaydunyaCallbackBaseUrl = resolvePaydunyaCallbackBaseUrl;
exports.paydunyaIpnCallbackUrl = paydunyaIpnCallbackUrl;
const common_1 = require("@nestjs/common");
function resolvePaydunyaCallbackBaseUrl(logger) {
    let base = (process.env.PAYDUNYA_CALLBACK_BASE_URL?.trim() ||
        process.env.PUBLIC_API_URL?.trim() ||
        "").replace(/\/$/, "");
    if (!base) {
        throw new common_1.ServiceUnavailableException("PUBLIC_API_URL ou PAYDUNYA_CALLBACK_BASE_URL requis pour les paiements PayDunya (IPN)");
    }
    if (!/^https?:\/\//i.test(base)) {
        base = `https://${base.replace(/^\/+/, "")}`;
    }
    let host = "";
    try {
        host = new URL(base).hostname.toLowerCase();
    }
    catch {
        throw new common_1.ServiceUnavailableException("PUBLIC_API_URL invalide pour PayDunya (URL mal formée)");
    }
    const isLocal = host === "localhost" ||
        host === "127.0.0.1" ||
        host === "[::1]" ||
        host.endsWith(".local");
    if (isLocal) {
        const msg = "PUBLIC_API_URL pointe vers localhost : PayDunya ne peut pas appeler l’IPN. " +
            "Sur Render, définissez PUBLIC_API_URL=https://milleservice-backend-aacp.onrender.com " +
            "(sans espace en fin de ligne). En local, utilisez ngrok ou le bouton de confirmation après paiement.";
        logger?.error(msg);
        if (process.env.NODE_ENV === "production") {
            throw new common_1.ServiceUnavailableException(msg);
        }
    }
    return base;
}
function paydunyaIpnCallbackUrl(logger) {
    return `${resolvePaydunyaCallbackBaseUrl(logger)}/webhooks/paydunya`;
}
//# sourceMappingURL=paydunya-callback.util.js.map