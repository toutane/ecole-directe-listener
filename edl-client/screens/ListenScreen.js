import React, { useContext } from "react";
import { StyleSheet, View, Text, SafeAreaView } from "react-native";

import CommandView from "../components/Listen/Command/CommandView";
import LogsCard from "../components/Listen/Logs/LogsCard";
import FetchOnRadios from "../components/Listen/Command/FetchOnRadios";
import { ListenContext } from "../contexts/listenContext";

export default function ListenScreen() {
  const { isListening } = useContext(ListenContext);
  return (
    <SafeAreaView style={[styles.container]}>
      {!isListening && <FetchOnRadios />}
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
