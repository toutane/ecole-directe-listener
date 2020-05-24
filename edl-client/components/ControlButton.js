import React, { useContext } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";
import { Feather } from "@expo/vector-icons";

import { ListenContext } from "../contexts/listenContext";

export default function ControlButton() {
  const { isLoading, isListening, startListening, stopListening } = useContext(
    ListenContext
  );
  return (
    <View style={{ alignItems: "center" }}>
      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor: !isListening
              ? "rgb(52, 199, 89)"
              : "rgb(255, 59, 48)",
          },
        ]}
        onPress={() => (!isListening ? startListening() : stopListening())}
      >
        {!isLoading ? (
          <Text style={styles.buttonText}>
            {!isListening ? "START" : "STOP"}
          </Text>
        ) : (
          <ActivityIndicator color="white" />
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 5,
    height: 47,
    width: 150,
    borderRadius: 13,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 11,
    paddingHorizontal: 20,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "700",
    color: "white",
    textAlign: "center",
  },
});
