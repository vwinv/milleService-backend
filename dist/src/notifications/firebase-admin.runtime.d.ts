export interface FirebaseServiceAccountJson extends Record<string, unknown> {
    project_id?: string;
    client_email?: string;
}
export interface FcmOutgoingMessage {
    token: string;
    notification: {
        title: string;
        body: string;
    };
    data: Record<string, string>;
    android: {
        priority: string;
        notification: {
            channelId: string;
            sound: string;
        };
    };
}
export interface FirebaseAdminSdk {
    apps: {
        length: number;
    };
    initializeApp(options: {
        credential: unknown;
    }): void;
    credential: {
        cert(serviceAccount: FirebaseServiceAccountJson): unknown;
    };
    messaging(): {
        send(message: FcmOutgoingMessage): Promise<string>;
    };
}
export declare function getFirebaseAdminSdk(): FirebaseAdminSdk;
