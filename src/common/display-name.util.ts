/**
 * Fusionne prénom + nom sans doubler le prénom quand `name` contient déjà le complet.
 * Corrige l'ancien flux Flutter qui envoyait prenom + name="prenom nom".
 */
export function buildPrestataireNomComplet(input: {
  prenom?: string | null;
  nom?: string | null;
  name?: string | null;
}): string {
  const prenom = (input.prenom ?? "").trim();
  const nomFamily = (input.nom ?? "").trim();
  const nameField = (input.name ?? "").trim();

  if (nameField) {
    const alreadyIncludesPrenom =
      !prenom ||
      nameField.localeCompare(prenom, undefined, { sensitivity: "accent" }) ===
        0 ||
      nameField.toLowerCase().startsWith(`${prenom.toLowerCase()} `);
    return alreadyIncludesPrenom
      ? nameField
      : [prenom, nameField].filter(Boolean).join(" ").trim();
  }

  return [prenom, nomFamily].filter(Boolean).join(" ").trim();
}

/** Enlève les mots consécutifs doublés ("Moussa Moussa Diallo" → "Moussa Diallo"). */
export function collapseDuplicateNameTokens(raw: string | null | undefined): string {
  const s = (raw ?? "").trim();
  if (!s) return "";
  const parts = s.split(/\s+/).filter(Boolean);
  if (parts.length < 2) return s;
  const out: string[] = [parts[0]!];
  for (let i = 1; i < parts.length; i++) {
    const prev = out[out.length - 1]!;
    const cur = parts[i]!;
    if (prev.localeCompare(cur, undefined, { sensitivity: "accent" }) !== 0) {
      out.push(cur);
    }
  }
  return out.join(" ");
}
