import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function ServerStatus() {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={[
        styles.serverButton,
        { justifyContent: "space-between", paddingHorizontal: 15 },
      ]}
    >
      <Text style={{ color: "black", fontWeight: "600", fontSize: 16 }}>
        Server status
      </Text>
      <View
        style={[styles.badge, { backgroundColor: "#68D391", marginLeft: 10 }]}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  serverButton: {
    marginTop: 10,
    height: 50,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 13,
    shadowOpacity: 0.1,
    shadowRadius: 15,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
  },
  badge: { width: 12.5, height: 12.5, borderRadius: 50 },
});
