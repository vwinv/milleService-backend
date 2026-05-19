import { Logger, ServiceUnavailableException } from "@nestjs/common";

/**
 * URL publique de base pour l’IPN PayDunya : {base}/webhooks/paydunya
 * Doit être HTTPS et joignable depuis Internet (pas localhost).
 */
export function resolvePaydunyaCallbackBaseUrl(
  logger?: Logger,
): string {
  let base = (
    process.env.PAYDUNYA_CALLBACK_BASE_URL?.trim() ||
    process.env.PUBLIC_API_URL?.trim() ||
    ""
  ).replace(/\/$/, "");

  if (!base) {
    throw new ServiceUnavailableException(
      "PUBLIC_API_URL ou PAYDUNYA_CALLBACK_BASE_URL requis pour les paiements PayDunya (IPN)",
    );
  }

  if (!/^https?:\/\//i.test(base)) {
    base = `https://${base.replace(/^\/+/, "")}`;
  }

  let host = "";
  try {
    host = new URL(base).hostname.toLowerCase();
  } catch {
    throw new ServiceUnavailableException(
      "PUBLIC_API_URL invalide pour PayDunya (URL mal formée)",
    );
  }

  const isLocal =
    host === "localhost" ||
    host === "127.0.0.1" ||
    host === "[::1]" ||
    host.endsWith(".local");

  if (isLocal) {
    const msg =
      "PUBLIC_API_URL pointe vers localhost : PayDunya ne peut pas appeler l’IPN. " +
      "Sur Render, définissez PUBLIC_API_URL=https://milleservice-backend-aacp.onrender.com " +
      "(sans espace en fin de ligne). En local, utilisez ngrok ou le bouton de confirmation après paiement.";
    logger?.error(msg);
    if (process.env.NODE_ENV === "production") {
      throw new ServiceUnavailableException(msg);
    }
  }

  return base;
}

export function paydunyaIpnCallbackUrl(logger?: Logger): string {
  return `${resolvePaydunyaCallbackBaseUrl(logger)}/webhooks/paydunya`;
}
