/**
 * Chargement runtime de `firebase-admin` (évite TS2307 au build si la résolution
 * des types depuis node_modules échoue sur certains hébergeurs).
 * Le package reste une dépendance npm obligatoire.
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

export function getFirebaseAdminSdk(): FirebaseAdminSdk {
  if (cached != null) return cached;
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  cached = require('firebase-admin') as FirebaseAdminSdk;
  return cached;
}
