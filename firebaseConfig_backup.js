import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";
const firebaseConfig = { apiKey: "TUO_API_KEY", authDomain: "PROJECT.firebaseapp.com", projectId: "PROJECT_ID", storageBucket: "PROJECT.appspot.com", messagingSenderId: "SENDER_ID", appId: "APP_ID" };
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
try { enableIndexedDbPersistence(db); } catch(e){ console.warn(e); }
