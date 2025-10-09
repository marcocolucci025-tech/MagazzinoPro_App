const admin = require('firebase-admin');
const serviceAccount = require('./service-account.json');
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
const uid = '<UID_UTENTE>';
admin.auth().setCustomUserClaims(uid, { role: 'admin' })
  .then(() => { console.log(`Utente con UID ${uid} ora è admin!`); process.exit(0); })
  .catch((error) => { console.error('Errore:', error); process.exit(1); });
