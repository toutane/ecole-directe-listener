import React, { useContext } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import { ListenContext } from "../../../contexts/listenContext";

export default function CommandButton() {
  const { isLoading, isListening, startListening, getListenInfo } = useContext(
    ListenContext
  );
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: !isListening ? "#68D391" : "#E53E3E" },
      ]}
      onPress={() => (!isListening ? startListening() : getListenInfo(true))}
    >
      {!isLoading ? (
        <Text style={styles.text}>{!isListening ? `START` : `STOP`}</Text>
      ) : (
        <ActivityIndicator color="white" />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 50,
    width: 180,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 15,
  },
  text: { fontSize: 19, fontWeight: "700", color: "white" },
});
