import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { setRole } from "../../services/firestoreService";

export default function ManageRoles() {
  const [uid, setUid] = useState("");
  const [role, setRoleLocal] = useState("user");
  const [loading, setLoading] = useState(false);

  const handleSetRole = async () => {
    if (!uid.trim()) return Alert.alert("Inserisci uid dell'utente");
    setLoading(true);
    try {
      await setRole(uid.trim(), role);
      Alert.alert("Ruolo impostato", `UID ${uid} -> ${role}`);
      setUid("");
    } catch (e) {
      Alert.alert("Errore", e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestisci ruoli</Text>
      <TextInput placeholder="User UID" value={uid} onChangeText={setUid} style={styles.input} />
      <View style={{ marginBottom: 12 }}>
        <Text>Seleziona ruolo:</Text>
        <View style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 6 }}>
          <TextInput value={role} onChangeText={setRoleLocal} style={styles.input} />
          <Text style={{ fontSize: 12, color: "#666" }}>Scrivi uno dei ruoli: admin, magazziniere, user</Text>
        </View>
      </View>
      <Button title={loading ? "Impostazione..." : "Imposta ruolo"} onPress={handleSetRole} disabled={loading} />
      <View style={{ height: 8 }} />
      <Text style={{ fontSize: 12, color: "#666", marginTop: 16 }}>
        Nota: per impostare via email è necessario cercare l'UID dell'utente (operazione admin server) o usar le utilities admin.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 18, marginBottom: 12 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 6, marginBottom: 12 }
});