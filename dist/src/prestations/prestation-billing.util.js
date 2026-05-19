"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PRESTATION_TRAVEL_FEE_FCFA = exports.PRESTATION_SERVICE_FEE_FCFA = void 0;
exports.computePlatformTakePrestationFcfa = computePlatformTakePrestationFcfa;
exports.executionHoursFromPrestationDates = executionHoursFromPrestationDates;
exports.computePrestationTotalToChargeFcfa = computePrestationTotalToChargeFcfa;
exports.PRESTATION_SERVICE_FEE_FCFA = 500;
exports.PRESTATION_TRAVEL_FEE_FCFA = 2000;
function computePlatformTakePrestationFcfa(baseWorkFcfa, serviceFeeFcfa, rate) {
    const work = Math.max(0, baseWorkFcfa);
    const service = Math.max(0, serviceFeeFcfa);
    const surTravail = Math.round(work * rate * 100) / 100;
    return Math.round((surTravail + service) * 100) / 100;
}
function executionHoursFromPrestationDates(input) {
    const start = input.startedAt ?? input.acceptedAt ?? input.createdAt;
    const end = input.completedAt != null
        ? input.completedAt
        : input.useNowAsEndIfOpen
            ? new Date()
            : null;
    if (end == null) {
        const minutesSinceStart = Math.floor((Date.now() - start.getTime()) / 60_000);
        if (minutesSinceStart <= 0)
            return 1;
        return minutesSinceStart / 60;
    }
    const minutes = Math.floor((end.getTime() - start.getTime()) / 60_000);
    if (minutes <= 0)
        return 1;
    return minutes / 60;
}
function computePrestationTotalToChargeFcfa(tarifHoraire, executionHours) {
    const safeTarif = tarifHoraire < 0 ? 0 : tarifHoraire;
    const safeHours = executionHours < 0 ? 0 : executionHours;
    const base = safeTarif * safeHours;
    const total = base + exports.PRESTATION_SERVICE_FEE_FCFA + exports.PRESTATION_TRAVEL_FEE_FCFA;
    return Math.round(total);
}
//# sourceMappingURL=prestation-billing.util.js.map