/** Aligné avec l’app (FCFA) : base = tarif × durée + frais service + frais déplacement. */
export const PRESTATION_SERVICE_FEE_FCFA = 500;
export const PRESTATION_TRAVEL_FEE_FCFA = 2000;

/**
 * Prélèvement plateforme = (taux × travail) + frais de service (intégral).
 * Le prestataire reçoit (travail − taux×travail) + frais de déplacement (= brut − ce montant).
 */
export function computePlatformTakePrestationFcfa(
  baseWorkFcfa: number,
  serviceFeeFcfa: number,
  rate: number,
): number {
  const work = Math.max(0, baseWorkFcfa);
  const service = Math.max(0, serviceFeeFcfa);
  const surTravail = Math.round(work * rate * 100) / 100;
  return Math.round((surTravail + service) * 100) / 100;
}

export function executionHoursFromPrestationDates(input: {
  acceptedAt: Date | null;
  completedAt: Date | null;
  createdAt: Date;
  /** Si false (prestation encore ouverte), la fin est « maintenant » pour cohérence avec l’app */
  useNowAsEndIfOpen?: boolean;
}): number {
  const start = input.acceptedAt ?? input.createdAt;
  const end =
    input.completedAt != null
      ? input.completedAt
      : input.useNowAsEndIfOpen
        ? new Date()
        : null;
  if (end == null) {
    const minutesSinceStart = Math.floor(
      (Date.now() - start.getTime()) / 60_000,
    );
    if (minutesSinceStart <= 0) return 1;
    return minutesSinceStart / 60;
  }
  const minutes = Math.floor((end.getTime() - start.getTime()) / 60_000);
  if (minutes <= 0) return 1;
  return minutes / 60;
}

export function computePrestationTotalToChargeFcfa(
  tarifHoraire: number,
  executionHours: number,
): number {
  const safeTarif = tarifHoraire < 0 ? 0 : tarifHoraire;
  const safeHours = executionHours < 0 ? 0 : executionHours;
  const base = safeTarif * safeHours;
  const total = base + PRESTATION_SERVICE_FEE_FCFA + PRESTATION_TRAVEL_FEE_FCFA;
  return Math.round(total);
}
