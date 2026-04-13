"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.metaWithdrawalAmount = metaWithdrawalAmount;
function metaWithdrawalAmount(meta) {
    if (!meta || typeof meta !== "object")
        return null;
    const m = meta;
    const a = m.amount;
    if (typeof a === "number" && !Number.isNaN(a) && a >= 0)
        return a;
    return null;
}
//# sourceMappingURL=withdrawal-meta.util.js.map