````markdown
```markdown
Aggiunte e passi per mettere in produzione le migliorie

1) Aggiorna le dipendenze
   npm install

2) Sostituisci firebaseConfig.js con le tue credenziali client (dal progetto Firebase)

3) Deploy regole Firestore
   - Installa Firebase CLI se non lo hai: npm i -g firebase-tools
   - Loggati: firebase login
   - Inizializza se non fatto: firebase init (scegli Firestore rules)
   - Sostituisci il file firestore.rules e poi:
     firebase deploy --only firestore:rules

4) Impostare ruoli in modo sicuro (server):
   - Prepara una chiave di servizio (Service Account) dal Firebase Console -> Project Settings -> Service accounts -> Generate new private key
   - Esegui lo script:
     node scripts/set-admin-server.js ./serviceAccountKey.json <uid> admin
   Questo imposta sia custom claim che scrive la collection roles/{uid}

5) Se vuoi che tutto funzioni in Expo Go:
   - Usa Firebase Web SDK (già incluso)
   - Esegui npx expo start -c

6) Se preferisci usare @react-native-firebase e build nativa:
   - Dovrai eseguire npx expo prebuild e poi gestire il progetto nativo oppure usare EAS build
```
````