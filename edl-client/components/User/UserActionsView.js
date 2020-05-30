import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

import { UserContext } from "../../contexts/userContext";

import SignOutButton from "../Auth/SignOutButton";

export default function UserActionsView() {
  const { username } = useContext(UserContext);
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={styles.title}>{`Hey ${username},`}</Text>
        <SignOutButton />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "700",
  },
});
