import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

import { UserContext } from "../../contexts/userContext";

export default function UserActionsView() {
  const { username } = useContext(UserContext);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{`👋 ${username}`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 10 },
  title: {
    fontSize: 34,
    fontWeight: "700",
  },
});
