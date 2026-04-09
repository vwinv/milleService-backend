/**
 * Tarif horaire défini par l’admin : champ `Service.tarifs` (varchar, valeur numérique en FCFA),
 * aligné avec PATCH /admin/services et `AdminController.parseServiceTarifValue`.
 */
export function hourlyTarifFromServiceCatalog(
  tarifs: string | null | undefined,
): number | null {
  if (tarifs == null) return null;
  const s = String(tarifs).trim();
  if (!s) return null;
  const n = Number(s);
  if (!Number.isFinite(n) || n <= 0) return null;
  return n;
}

/**
 * Pour une ligne `PrestataireService` : utiliser le tarif du catalogue `Service.tarifs`,
 * avec repli sur `prestataire_services.tarif_horaire` (données anciennes).
 */
export function resolveHourlyTarifForPrestation(
  ps: {
    tarifHoraire?: unknown;
    service?: { tarifs?: string | null } | null;
  } | null | undefined,
): number | null {
  if (!ps) return null;
  const fromCatalog = hourlyTarifFromServiceCatalog(ps.service?.tarifs);
  if (fromCatalog != null) return fromCatalog;
  if (ps.tarifHoraire == null) return null;
  const legacy = Number(ps.tarifHoraire);
  if (!Number.isFinite(legacy) || legacy <= 0) return null;
  return legacy;
}
