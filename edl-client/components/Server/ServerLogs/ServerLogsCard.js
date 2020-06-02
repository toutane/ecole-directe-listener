import React, { useContext, useEffect } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  ActivityIndicator,
} from "react-native";

import { LogsContext } from "../../../contexts/logsContext";

import Line from "./Line";

export default function ServerLogsCard() {
  const { serverStatus, buildLogs, isLogsLoading } = useContext(LogsContext);
  return (
    <View style={{ marginTop: 20 }}>
      <View
        style={[
          styles.card,
          {
            borderColor:
              buildLogs.length == 0
                ? "rgba(96,100,109, 0.2)"
                : isLogsLoading
                ? "rgba(96,100,109, 0.2)"
                : serverStatus.readyState === "READY"
                ? "#68D391"
                : "#E53E3E",
          },
        ]}
      >
        {!isLogsLoading ? (
          <ScrollView
            onEndReachedThreshold={0}
            style={[styles.scrollView]}
            showsVerticalScrollIndicator={false}
            maximumZoomScale={1.001}
            minimumZoomScale={1}
            zoomScale={0}
            bouncesZoom={true}
          >
            {buildLogs.length !== 0 && (
              <Text style={styles.text}>Last build logs:</Text>
            )}
            {buildLogs.map((log, i) => (
              <Line
                key={i}
                log={log}
                index={i}
                isLast={i === buildLogs.length - 1}
              />
            ))}
          </ScrollView>
        ) : (
          <ActivityIndicator size="large" />
        )}
        {buildLogs.length === 0 && (
          <View style={styles.overlay}>
            <Text style={styles.infoText}>No logs to show</Text>
          </View>
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    width: 300,
    height: 300,
    backgroundColor: "#fff",
    borderRadius: 25,
    shadowOpacity: 0.1,
    shadowRadius: 15,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    borderWidth: 2,
    zIndex: 0,
    justifyContent: "center",
  },
  scrollView: {
    borderRadius: 25,
    height: 400,
  },
  text: {
    marginTop: 10,
    marginLeft: 30,
    fontSize: 15,
    fontWeight: "600",
  },
  infoText: { color: "rgba(96,100,109, 0.2)", fontSize: 17, fontWeight: "500" },
  overlay: {
    right: -2,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    width: 300,
    height: 300,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    zIndex: 1,
    position: "absolute",
  },
});
