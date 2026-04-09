"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFirebaseAdminSdk = getFirebaseAdminSdk;
exports.getFirebaseAdminLastLoadError = getFirebaseAdminLastLoadError;
let cached = null;
let loadAttempted = false;
let lastLoadError = null;
function getFirebaseAdminSdk() {
    if (loadAttempted)
        return cached;
    loadAttempted = true;
    try {
        cached = require("firebase-admin");
        return cached;
    }
    catch (e) {
        lastLoadError = e instanceof Error ? e.message : String(e);
        cached = null;
        return null;
    }
}
function getFirebaseAdminLastLoadError() {
    return lastLoadError;
}
//# sourceMappingURL=firebase-admin.runtime.js.map