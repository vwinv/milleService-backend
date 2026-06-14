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

export function appendSslModeIfNeeded(connectionString: string): string {
  if (!databaseUrlNeedsSsl(connectionString)) {
    return connectionString;
  }
  if (connectionString.includes("sslmode=")) {
    return connectionString;
  }
  return (
    connectionString +
    (connectionString.includes("?") ? "&" : "?") +
    "sslmode=require"
  );
}
