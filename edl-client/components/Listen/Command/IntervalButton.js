import React, { useContext } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

import { ListenContext } from "../../../contexts/listenContext";

export default function IntervalButton() {
  const { interval, setIntervalNum } = useContext(ListenContext);
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() =>
        setIntervalNum((prvNum) =>
          prvNum === "*/10 * * * *"
            ? "*/15 * * * *"
            : prvNum === "*/15 * * * *"
            ? "*/5 * * * *"
            : "*/10 * * * *"
        )
      }
    >
      <Text style={styles.num}>{interval.slice(2, -8)}</Text>
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
  num: {
    color: "#68D391",
    fontSize: 20,
    fontWeight: "600",
  },
});
