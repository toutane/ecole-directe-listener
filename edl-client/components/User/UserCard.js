import React, { useContext } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { UserContext } from "../../contexts/userContext";
import { Feather } from "@expo/vector-icons";

export default function UserCard() {
  const { userData } = useContext(UserContext);
  return (
    <View style={styles.card}>
      <Text style={styles.title}>YOUR PROFILE</Text>
      <View style={{ marginTop: 20 }}>
        <Text style={styles.text} numberOfLines={1}>
          Username:{" "}
          <Text style={{ color: "black" }}>{userData.identifiant}</Text>
        </Text>
        <Text style={styles.text} numberOfLines={1}>
          Name:{" "}
          <Text style={{ color: "black" }}>
            {userData.prenom} {userData.nom}
          </Text>
        </Text>
        <Text style={styles.text} numberOfLines={1}>
          Email: <Text style={{ color: "black" }}>{userData.email}</Text>
        </Text>
        <Text style={styles.text} numberOfLines={1}>
          School:{" "}
          <Text style={{ color: "black" }}>{userData.nomEtablissement}</Text>
        </Text>
        <Text style={styles.text} numberOfLines={1}>
          Classroom:{" "}
          <Text style={{ color: "black" }}>{userData.profile.classe.code}</Text>
        </Text>
        <Text style={styles.text} numberOfLines={1}>
          Sex: <Text style={{ color: "black" }}>{userData.profile.sexe}</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 20,
    width: 300,
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 25,
    shadowOpacity: 0.1,
    shadowRadius: 15,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    paddingHorizontal: 25,
    paddingVertical: 25,
  },
  title: { fontSize: 18, fontWeight: "600", color: "#63B3ED" },
  text: {
    fontSize: 17,
    fontWeight: "500",
    color: "rgba(96,100,109, 0.5)",
    marginBottom: 10,
  },
});
