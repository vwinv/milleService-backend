/**
 * Point d'entrée CommonJS pour éviter "exports is not defined" avec le client Prisma.
 * S'exécute depuis la racine du backend pour que require('cloudinary') etc. trouvent node_modules.
 */
const path = require('path');
process.chdir(__dirname);
require('./dist/src/main.js');
