"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withdrawModeFromWithdrawalMethod = withdrawModeFromWithdrawalMethod;
exports.normalizeSenegalMsisdnForPaydunya = normalizeSenegalMsisdnForPaydunya;
const client_js_1 = require("../../generated/prisma/client.js");
function withdrawModeFromWithdrawalMethod(method) {
    switch (method) {
        case client_js_1.WithdrawalMethod.ORANGE_MONEY:
            return "orange-money-senegal";
        case client_js_1.WithdrawalMethod.WAVE:
            return "wave-senegal";
        case client_js_1.WithdrawalMethod.FREE_MONEY:
            return "free-money-senegal";
        case client_js_1.WithdrawalMethod.RIB:
            return null;
        default:
            return null;
    }
}
function normalizeSenegalMsisdnForPaydunya(raw) {
    const digits = raw.replace(/\D/g, "");
    let s = digits;
    if (s.startsWith("221") && s.length >= 12) {
        s = s.slice(3);
    }
    if (s.startsWith("0") && s.length === 10) {
        s = s.slice(1);
    }
    if (s.length === 9 && /^7[0-9]{8}$/.test(s)) {
        return s;
    }
    return null;
}
//# sourceMappingURL=paydunya-disburse.util.js.map