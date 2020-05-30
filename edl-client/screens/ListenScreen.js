import React, { useContext } from "react";
import { StyleSheet, View, Text, SafeAreaView } from "react-native";

import CommandView from "../components/Listen/Command/CommandView";
import LogsCard from "../components/Listen/Logs/LogsCard";

export default function ListenScreen() {
  return (
    <SafeAreaView style={[styles.container]}>
      <LogsCard />
      <CommandView />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
