import React, { useContext, useEffect } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  ActivityIndicator,
  RefreshControl,
} from "react-native";

import { LogsContext } from "../../../contexts/logsContext";

import Line from "./Line";

export default function ServerLogsCard() {
  const {
    serverStatus,
    buildLogs,
    isLogsLoading,
    onRefresh,
    refreshing,
  } = useContext(LogsContext);
  return (
    <View style={{ marginTop: 20 }}>
      <View
        style={[
          styles.card,
          {
            borderColor:
              serverStatus.readyState === "READY" ? "#68D391" : "#E53E3E",
          },
        ]}
      >
        {!isLogsLoading ? (
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            onEndReachedThreshold={0}
            style={[styles.scrollView]}
            showsVerticalScrollIndicator={false}
            maximumZoomScale={1.001}
            minimumZoomScale={1}
            zoomScale={0}
            bouncesZoom={true}
          >
            <Text style={styles.text}>Last build logs:</Text>
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
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    width: 300,
    height: 300,
    backgroundColor: "#fff",
    borderRadius: 30,
    shadowOpacity: 0.1,
    shadowRadius: 15,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    borderWidth: 2,
    zIndex: 0,
    justifyContent: "center",
  },
  scrollView: {
    borderRadius: 30,
    height: 400,
  },
  text: {
    marginTop: 10,
    marginLeft: 30,
    fontSize: 15,
    fontWeight: "600",
  },
});
