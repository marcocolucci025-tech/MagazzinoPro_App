/**
 * Script server per impostare ruolo in modo sicuro usando Admin SDK.
 * USO:
 *   node scripts/set-admin-server.js /path/to/serviceAccountKey.json uid role
 *
 * Esempio:
 *   node scripts/set-admin-server.js ./serviceAccountKey.json some-uid admin
 *
 * Il script:
 * - imposta customClaims { role: "admin" } per l'utente (opzionale, utile se vuoi usare claims)
 * - scrive nella collection roles/{uid} { role }
 */
const admin = require("firebase-admin");
const fs = require("fs");

if (process.argv.length < 5) {
  console.error("Usage: node scripts/set-admin-server.js <serviceAccountKey.json> <uid> <role>");
  process.exit(1);
}

const serviceAccountPath = process.argv[2];
const uid = process.argv[3];
const role = process.argv[4];

if (!fs.existsSync(serviceAccountPath)) {
  console.error("Service account key not found:", serviceAccountPath);
  process.exit(1);
}

const serviceAccount = require(serviceAccountPath);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

async function run() {
  try {
    // Imposta custom claim (opzionale)
    await admin.auth().setCustomUserClaims(uid, { role });
    console.log("Custom claims impostati:", role);

    // Scrive nella collection roles
    const db = admin.firestore();
    await db.collection("roles").doc(uid).set({ role });
    console.log("Role document scritto in firestore/roles/" + uid);
    process.exit(0);
  } catch (e) {
    console.error("Errore:", e);
    process.exit(1);
  }
}

run();