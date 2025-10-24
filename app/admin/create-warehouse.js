import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { createWarehouse } from "../../services/firestoreService";
import { auth } from "../../firebaseConfig";
import { useRouter } from "expo-router";

export default function CreateWarehouse() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCreate = async () => {
    if (!name.trim()) return Alert.alert("Nome richiesto");
    setLoading(true);
    try {
      const uid = auth.currentUser?.uid || null;
      const id = await createWarehouse(name.trim(), uid);
      Alert.alert("Magazzino creato", `ID: ${id}`);
      router.replace("/admin"); // torna alla dashboard admin
    } catch (e) {
      Alert.alert("Errore", e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crea nuovo magazzino</Text>
      <TextInput value={name} onChangeText={setName} placeholder="Nome magazzino" style={styles.input} />
      <Button title={loading ? "Creazione..." : "Crea"} onPress={handleCreate} disabled={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: "center" },
  title: { fontSize: 18, marginBottom: 12, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 6, marginBottom: 12 }
});