// Sostituisci i valori con quelli del tuo progetto Firebase
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "TUO_API_KEY",
  authDomain: "TUO_AUTH_DOMAIN",
  projectId: "TUO_PROJECT_ID",
  storageBucket: "TUO_STORAGE_BUCKET",
  messagingSenderId: "TUO_MESSAGING_SENDER_ID",
  appId: "TUO_APP_ID",
};

// Evita inizializzazioni multiple durante hot-reload
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };