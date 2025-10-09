// Copia questo file come firebaseConfig.js dentro MagazzinoPro_App e compila i campi.
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

export const firebaseConfig = {
  apiKey: "AIzaSyCPhbQIV6buXrmR9_mc3UKDUnWnUJz4ZIg",
  authDomain: "magazzinopro.firebaseapp.com",
  projectId: "magazzinopro",
  storageBucket: "magazzinopro.firebasestorage.app",
  messagingSenderId: "1036019166025",
  appId: "1:1036019166025:web:69f5bb94b2778ebad3c898"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const functions = getFunctions(app);
