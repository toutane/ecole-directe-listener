import React, { useContext, useEffect } from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";

import { ListenContext } from "../../../contexts/listenContext";
import { LogsContext } from "../../../contexts/logsContext";

import Line from "./Line";
import LogsInfo from "./LogsInfo";

export default function LogsCard() {
  const { isListening } = useContext(ListenContext);
  const { logs } = useContext(LogsContext);
  return (
    <View style={{ marginTop: 50 }}>
      <View
        style={[
          styles.card,
          {
            borderColor: !isListening ? "#68D391" : "#E53E3E",
          },
        ]}
      >
        <ScrollView
          style={[styles.scrollView]}
          scrollEnabled={isListening}
          showsVerticalScrollIndicator={false}
        >
          {logs.map((log, i) => (
            <Line key={i} log={log} />
          ))}
        </ScrollView>
      </View>
      {!isListening && (
        <View style={styles.overlay}>
          <LogsInfo />
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    width: 300,
    height: 400,
    backgroundColor: "#fff",
    borderRadius: 30,
    shadowOpacity: 0.1,
    shadowRadius: 15,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    borderWidth: 2,
    zIndex: 0,
  },
  overlay: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    width: 300,
    height: 400,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    zIndex: 1,
    position: "absolute",
  },
  scrollView: {
    borderRadius: 30,
    height: 400,
  },
});
