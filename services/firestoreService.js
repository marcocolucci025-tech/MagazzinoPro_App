// Servizi per operazioni su Firestore: realtime listeners e operazioni atomiche
import {
  collection,
  doc,
  getDoc,
  addDoc,
  setDoc,
  updateDoc,
  runTransaction,
  onSnapshot,
  query,
  orderBy,
  getDocs
} from "firebase/firestore";
import { db } from "../firebaseConfig";

/*
  Data model:
  - warehouses (doc: warehouseId) { name, createdAt, createdBy }
    - items (subcollection) (doc: itemId) { name, quantity, notes, updatedAt }
  - roles (doc id = uid) { role: "admin"|"magazziniere"|"user" }
*/

// Realtime listener per items di un magazzino
export function listenItemsRealtime(warehouseId, onUpdate, onError) {
  const itemsRef = collection(db, "warehouses", warehouseId, "items");
  const q = query(itemsRef, orderBy("name"));
  const unsub = onSnapshot(
    q,
    (snapshot) => {
      const items = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      onUpdate(items);
    },
    (err) => {
      console.error("listenItemsRealtime error:", err);
      if (onError) onError(err);
    }
  );
  return unsub;
}

// Carico/scarico atomico con transaction, aggiunge log nella sottocollection logs
export async function changeQuantityAtomic(warehouseId, itemId, delta, userId) {
  const itemRef = doc(db, "warehouses", warehouseId, "items", itemId);

  return runTransaction(db, async (t) => {
    const snap = await t.get(itemRef);
    if (!snap.exists()) throw new Error("Articolo non trovato");
    const data = snap.data();
    const current = Number(data.quantity || 0);
    const next = current + Number(delta);
    if (next < 0) throw new Error("Quantità non può essere negativa");

    t.update(itemRef, {
      quantity: next,
      updatedAt: new Date(),
    });

    // log movimento
    const logsRef = collection(db, "warehouses", warehouseId, "items", itemId, "logs");
    await addDoc(logsRef, {
      delta,
      prevQuantity: current,
      nextQuantity: next,
      userId: userId || null,
      createdAt: new Date(),
    });

    return { prevQuantity: current, nextQuantity: next };
  });
}

// Creare un nuovo magazzino
export async function createWarehouse(name, ownerUid) {
  const warehousesRef = collection(db, "warehouses");
  const res = await addDoc(warehousesRef, {
    name,
    createdAt: new Date(),
    createdBy: ownerUid || null,
  });
  return res.id;
}

// Elenca i magazzini (semplice)
export async function listWarehouses() {
  const q = collection(db, "warehouses");
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

// Gestione ruoli lato client: scrive nella collection roles (solo admin permesso dalle rules)
export async function setRole(uid, role) {
  const ref = doc(db, "roles", uid);
  await setDoc(ref, { role }, { merge: true });
}

export async function getRole(uid) {
  const ref = doc(db, "roles", uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return snap.data().role;
}