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
          { backgroundColor: !isListening ? "#91CB3E" : "#F40000" },
        ]}
        onPress={() => (!isListening ? startListening() : stopListening())}
      >
        {!isLoading ? (
          <Feather
            name={!isListening ? "play-circle" : "pause-circle"}
            size={25}
            color="white"
            style={{ marginRight: 7.5 }}
          />
        ) : (
          <ActivityIndicator color="white" style={{ marginRight: 7.5 }} />
        )}
        <Text style={styles.buttonText}>{!isListening ? "START" : "STOP"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "700",
    color: "white",
    textAlign: "center",
  },
});
