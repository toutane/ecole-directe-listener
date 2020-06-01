import React, { useContext } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

import { AuthContext } from "../../contexts/authContext";
import { ListenContext } from "../../contexts/listenContext";
import { UserContext } from "../../contexts/userContext";

export default function SignOutButton() {
  const { logout } = useContext(AuthContext);
  const { setError } = useContext(UserContext);
  const { isListening } = useContext(ListenContext);
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() =>
        isListening ? setError("Please stop listening to logout") : logout()
      }
    >
      <Text style={styles.textButton}>Sign Out</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 50,
    width: 250,
    borderRadius: 13,
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: "center",
    shadowOpacity: 0.05,
    shadowRadius: 15,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
  },
  textButton: { fontSize: 17, color: "#E53E3E", fontWeight: "500" },
});
