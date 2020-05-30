import React, { useContext } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { LogsContext } from "../../../contexts/logsContext";

export default function ClearButton() {
  const { setLogs } = useContext(LogsContext);
  return (
    <TouchableOpacity style={styles.button} onPress={() => setLogs([])}>
      <Feather name="refresh-ccw" size={25} color="#E53E3E" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginLeft: 20,
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 15,
    shadowOpacity: 0.1,
    shadowRadius: 15,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
  },
});
