const admin = require('firebase-admin');
const serviceAccount = require('./service-account.json');
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
const uid = '<UID_UTENTE>';
const role = 'magazziniere';
const validRoles = ['admin','magazziniere','visualizzatore'];
if (!validRoles.includes(role)) { console.error('Ruolo non valido'); process.exit(1); }
admin.auth().setCustomUserClaims(uid, { role })
  .then(()=>{ console.log(`Utente ${uid} ora ha ruolo ${role}`); process.exit(0); })
  .catch(e=>{ console.error(e); process.exit(1); });
