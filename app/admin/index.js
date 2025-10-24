import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function AdminHome() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pannello Admin</Text>
      <Button title="Crea magazzino" onPress={() => router.push("/admin/create-warehouse")} />
      <View style={{ height: 12 }} />
      <Button title="Gestisci ruoli" onPress={() => router.push("/admin/manage-roles")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: "center" },
  title: { fontSize: 18, marginBottom: 16, textAlign: "center" }
});