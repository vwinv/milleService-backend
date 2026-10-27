import { WithdrawalMethod } from "../../generated/prisma/client.js";

/**
 * Nom d’opérateur attendu par SamirPay (`operatorName`).
 * La collection partenaire montre `WAVE`. Orange et Free suivent le même format court.
 */
export function samirOperatorFromWithdrawalMethod(
  method: WithdrawalMethod,
): string | null {
  switch (method) {
    case WithdrawalMethod.ORANGE_MONEY:
      return "ORANGE";
    case WithdrawalMethod.WAVE:
      return "WAVE";
    case WithdrawalMethod.FREE_MONEY:
      return "FREE";
    case WithdrawalMethod.RIB:
      return null;
    default:
      return null;
  }
}

/**
 * Numéro local SN sans indicatif (9 chiffres, ex. 771234567).
 * Accepte +221, 221, espaces, 07…
 */
export function normalizeSenegalMsisdn(raw: string): string | null {
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
