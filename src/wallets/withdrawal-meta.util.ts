/** Montant stocké dans `WithdrawalRequest.meta` (création côté prestataire). */
export function metaWithdrawalAmount(meta: unknown): number | null {
  if (!meta || typeof meta !== "object") return null;
  const m = meta as Record<string, unknown>;
  const a = m.amount;
  if (typeof a === "number" && !Number.isNaN(a) && a >= 0) return a;
  return null;
}
