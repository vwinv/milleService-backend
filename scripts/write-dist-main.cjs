/**
 * Après `nest build`, le point d'entrée est `dist/src/main.js`.
 * Ce script crée `dist/main.js` pour les commandes du type `node dist/main`.
 */
const fs = require('fs');
const path = require('path');

const dist = path.join(__dirname, '..', 'dist');
const target = path.join(dist, 'main.js');
const entry = path.join(dist, 'src', 'main.js');

if (!fs.existsSync(entry)) {
  console.warn('[write-dist-main] dist/src/main.js absent — build ignoré ou erreur.');
  process.exit(0);
}

fs.writeFileSync(target, "require('./src/main.js');\n");
console.log('[write-dist-main] dist/main.js → ./src/main.js');
