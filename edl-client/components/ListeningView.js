import React, { useContext } from "react";
import { StyleSheet, View, Text } from "react-native";

import { ListenContext } from "../contexts/listenContext";
import ControlButton from "./ControlButton";

export default function ListeningView() {
  const { isListening, cronId } = useContext(ListenContext);

  return (
    <View style={styles.container}>
      <View style={styles.hr} />
      <Text style={styles.text}>
        {isListening
          ? `→ You are listening with Cron ID: ${cronId}`
          : "Start to listen to EDL Core:"}
      </Text>
      <ControlButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingHorizontal: 40,
    paddingVertical: 30,
  },
  hr: {
    height: 1.5,
    width: "100%",
    backgroundColor: "rgb(242, 242, 247)",
    marginBottom: 15,
  },
  text: {
    fontSize: 15,
    color: "rgba(96,100,109, 0.5)",
    lineHeight: 24,
    textAlign: "center",
    marginBottom: 10,
  },
});
