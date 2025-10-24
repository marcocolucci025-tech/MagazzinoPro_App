# feat: Firebase web SDK + realtime, roles, admin UI

Questo PR aggiunge la migrazione al Firebase Web SDK compatibile con Expo managed, servizi Firestore per realtime e operazioni atomiche, UI admin per creare magazzini e gestire ruoli, regole Firestore di sicurezza e script server per impostare ruoli/custom claims.

## Test:
- npm install;
- npx expo start -c;
- deploy firestore.rules con firebase deploy --only firestore:rules;
- impostare admin con scripts/set-admin-server.js.