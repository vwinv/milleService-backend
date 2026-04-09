"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hourlyTarifFromServiceCatalog = hourlyTarifFromServiceCatalog;
exports.resolveHourlyTarifForPrestation = resolveHourlyTarifForPrestation;
function hourlyTarifFromServiceCatalog(tarifs) {
    if (tarifs == null)
        return null;
    const s = String(tarifs).trim();
    if (!s)
        return null;
    const n = Number(s);
    if (!Number.isFinite(n) || n <= 0)
        return null;
    return n;
}
function resolveHourlyTarifForPrestation(ps) {
    if (!ps)
        return null;
    const fromCatalog = hourlyTarifFromServiceCatalog(ps.service?.tarifs);
    if (fromCatalog != null)
        return fromCatalog;
    if (ps.tarifHoraire == null)
        return null;
    const legacy = Number(ps.tarifHoraire);
    if (!Number.isFinite(legacy) || legacy <= 0)
        return null;
    return legacy;
}
//# sourceMappingURL=service-catalog-tarif.util.js.map