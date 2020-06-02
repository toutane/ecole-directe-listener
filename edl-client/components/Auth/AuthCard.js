import React, { useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Feather } from "@expo/vector-icons";

import AuthInput from "./AuthInputs";
import { AuthContext } from "../../contexts/authContext";
import { UserContext } from "../../contexts/userContext";

export default function AuthCard() {
  const { authenticated, loading, login } = useContext(AuthContext);
  const { password, username, error, setError } = useContext(UserContext);
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Ecole Directe Listener</Text>
      <Text style={styles.infoText}>
        Start listening by filling out these fields with your{" "}
        <Text style={{ color: "#63B3ED" }}>Ecole Directe </Text>
        credentials:
      </Text>
      <AuthInput />
      <Text style={styles.errorText}>{error}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          (username && password) === ""
            ? setError("Please fill the requiered fields")
            : login()
        }
      >
        <Text style={styles.text}>Start listening now</Text>
        <View style={{ marginLeft: 10 }}>
          {!loading ? (
            <Feather name="arrow-right" color="white" size={20} />
          ) : (
            <ActivityIndicator color="white" />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 25,
    shadowOpacity: 0.1,
    shadowRadius: 15,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    paddingVertical: 30,
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 15,
    textAlign: "center",
  },
  button: {
    marginTop: 10,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#63B3ED",
    borderRadius: 13,
  },
  text: { fontSize: 19, fontWeight: "600", color: "white" },
  infoText: {
    fontSize: 15,
    color: "rgba(96,100,109, 0.5)",
    lineHeight: 24,
    marginBottom: 20,
  },
  errorText: {
    marginTop: 10,
    fontSize: 15,
    color: "rgb(255, 59, 48)",
    lineHeight: 24,
  },
});
