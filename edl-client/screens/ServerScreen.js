import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import ServerLogsCard from "../components/Server/ServerLogs/ServerLogsCard";
import ServerStatusCard from "../components/Server/ServerStatus/ServerStatusCard";

export default function ServerScreen() {
  return (
    <View style={styles.container}>
      <ServerStatusCard />
      <ServerLogsCard />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
