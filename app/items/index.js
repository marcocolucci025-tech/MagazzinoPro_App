import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Button, Alert } from "react-native";
import { useRouter, useSearchParams } from "expo-router";
import { listenItemsRealtime, changeQuantityAtomic, listWarehouses } from "../../services/firestoreService";
import { auth } from "../../firebaseConfig";

export default function ItemsList() {
  const router = useRouter();
  const params = useSearchParams();
  const [warehouseId, setWarehouseId] = useState(params.warehouseId || null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [warehouses, setWarehouses] = useState([]);

  useEffect(() => {
    // lista magazzini per scegliere
    (async () => {
      try {
        const ws = await listWarehouses();
        setWarehouses(ws);
        if (!warehouseId && ws.length) setWarehouseId(ws[0].id);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  useEffect(() => {
    if (!warehouseId) return;
    setLoading(true);
    const unsub = listenItemsRealtime(
      warehouseId,
      (list) => {
        setItems(list);
        setLoading(false);
      },
      (err) => {
        Alert.alert("Errore listener", err.message || String(err));
        setLoading(false);
      }
    );
    return () => unsub();
  }, [warehouseId]);

  const onChangeQty = async (itemId, delta) => {
    try {
      const userId = auth.currentUser?.uid || null;
      await changeQuantityAtomic(warehouseId, itemId, delta, userId);
    } catch (e) {
      Alert.alert("Errore operazione", e.message);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <TouchableOpacity style={{ flex: 1 }} onPress={() => router.push(`/items/${item.id}`, { warehouseId })}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.qty}>Qty: {item.quantity ?? 0}</Text>
      </TouchableOpacity>
      <View style={styles.buttons}>
        <Button title="+1" onPress={() => onChangeQty(item.id, 1)} />
        <View style={{ width: 8 }} />
        <Button title="-1" color="#d9534f" onPress={() => onChangeQty(item.id, -1)} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={{ marginBottom: 8 }}>Seleziona magazzino:</Text>
      <View style={{ flexDirection: "row", marginBottom: 12 }}>
        {warehouses.map((w) => (
          <Button key={w.id} title={w.name} onPress={() => setWarehouseId(w.id)} />
        ))}
      </View>

      <Button title="Crea magazzino (admin)" onPress={() => router.push("/admin/create-warehouse")} />

      <Text style={{ marginTop: 12, marginBottom: 8 }}>Articoli (magazzino {warehouseId ?? "-" }):</Text>
      {loading ? <Text>Caricamento...</Text> : <FlatList data={items} keyExtractor={(i) => i.id} renderItem={renderItem} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  row: { padding: 12, borderBottomWidth: 1, borderColor: "#eee", flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  name: { fontSize: 16, fontWeight: "600" },
  qty: { fontSize: 13, color: "#666" },
  buttons: { flexDirection: "row" }
});