/**
 * Chargement runtime de `firebase-admin` (évite TS2307 au build si la résolution
 * des types depuis node_modules échoue sur certains hébergeurs).
 * Si le module est absent (ex. mauvais root sur Render), require échoue : on expose null + message.
 */

export interface FirebaseServiceAccountJson extends Record<string, unknown> {
  project_id?: string;
  client_email?: string;
}

export interface FcmOutgoingMessage {
  token: string;
  notification: { title: string; body: string };
  data: Record<string, string>;
  android: {
    priority: string;
    notification: { channelId: string; sound: string };
  };
}

export interface FirebaseAdminSdk {
  apps: { length: number };
  initializeApp(options: { credential: unknown }): void;
  credential: {
    cert(serviceAccount: FirebaseServiceAccountJson): unknown;
  };
  messaging(): {
    send(message: FcmOutgoingMessage): Promise<string>;
  };
}

let cached: FirebaseAdminSdk | null = null;
let loadAttempted = false;
let lastLoadError: string | null = null;

/**
 * Retourne le SDK ou null si `firebase-admin` n’est pas résolvable (déploiement / node_modules).
 */
export function getFirebaseAdminSdk(): FirebaseAdminSdk | null {
  if (loadAttempted) return cached;
  loadAttempted = true;
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    cached = require("firebase-admin") as FirebaseAdminSdk;
    return cached;
  } catch (e) {
    lastLoadError = e instanceof Error ? e.message : String(e);
    cached = null;
    return null;
  }
}

export function getFirebaseAdminLastLoadError(): string | null {
  return lastLoadError;
}
