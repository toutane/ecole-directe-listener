import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";

import { ListenContext } from "../../../contexts/listenContext";

import CommandButton from "./CommandButton";
import IntervalButton from "./IntervalButton";
import ClearButton from "./ClearButton";

export default function CommandView() {
  const { isListening } = useContext(ListenContext);

  return (
    <View
      style={[
        styles.container,
        { justifyContent: !isListening ? "space-between" : "center" },
      ]}
    >
      <CommandButton />
      {!isListening ? <IntervalButton /> : <ClearButton />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    width: 250,
    flexDirection: "row",
    alignItems: "center",
  },
});
