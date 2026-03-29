"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFirebaseAdminSdk = getFirebaseAdminSdk;
let cached = null;
function getFirebaseAdminSdk() {
    if (cached != null)
        return cached;
    cached = require('firebase-admin');
    return cached;
}
//# sourceMappingURL=firebase-admin.runtime.js.map