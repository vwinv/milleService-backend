import type { PoolConfig } from "pg";

export function isLocalDatabaseUrl(connectionString: string): boolean {
  return (
    connectionString.includes("localhost") ||
    connectionString.includes("127.0.0.1")
  );
}

/** URL interne Render : @dpg-xxx-a/... sans .render.com — réseau privé, pas de SSL. */
export function isRenderInternalDatabaseUrl(connectionString: string): boolean {
  return (
    connectionString.includes("@dpg-") &&
    !connectionString.includes(".render.com")
  );
}

export function databaseUrlNeedsSsl(connectionString: string): boolean {
  return (
    !isLocalDatabaseUrl(connectionString) &&
    !isRenderInternalDatabaseUrl(connectionString)
  );
}

export function stripSslQueryParams(connectionString: string): string {
  return connectionString
    .replace(/([?&])sslmode=[^&]*/g, "")
    .replace(/([?&])ssl=[^&]*/g, "")
    .replace(/([?&])uselibpqcompat=[^&]*/g, "")
    .replace(/\?&/, "?")
    .replace(/[?&]$/, "");
}

/** PoolConfig pour @prisma/adapter-pg (ne pas passer une instance Pool : instanceof pg casse sous Nest). */
export function resolvePgPoolConfig(raw: string): PoolConfig {
  const connectionString = stripSslQueryParams(raw);
  const config: PoolConfig = { connectionString };
  if (databaseUrlNeedsSsl(raw)) {
    config.ssl = { rejectUnauthorized: false };
  }
  return config;
}

/** CLI Prisma migrate : sslmode dans l’URL + certificat auto-signé. */
export function appendSslModeIfNeeded(connectionString: string): string {
  if (!databaseUrlNeedsSsl(connectionString)) {
    return stripSslQueryParams(connectionString);
  }
  const base = stripSslQueryParams(connectionString);
  if (base.includes("sslmode=")) {
    return base;
  }
  return base + (base.includes("?") ? "&" : "?") + "sslmode=require";
}

export function describeDatabaseUrl(raw: string | undefined): string {
  if (!raw) return "missing";
  if (isLocalDatabaseUrl(raw)) return "local";
  if (isRenderInternalDatabaseUrl(raw)) return "render-internal";
  if (raw.includes(".render.com")) return "render-external";
  return "remote";
}
