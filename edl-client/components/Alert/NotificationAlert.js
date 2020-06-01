import React, { useContext } from "react";
import { Linking, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

export default function NotificationAlert() {
  return (
    <TouchableOpacity
      style={styles.alert}
      onPress={() => Linking.openURL("app-settings:")}
      activeOpacity={0.5}
    >
      <Feather name="alert-triangle" size={35} style={styles.icon} />
      <Text style={styles.text}>
        To take full advantage of EDL Client functionality, you must activate
        notifications: (Tap ths notif to activate)
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  alert: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FBD38D",
    width: "95%",
    height: 100,
    borderRadius: 20,
    paddingHorizontal: 20,
  },
  text: { color: "#C05621", fontSize: 15 },
  icon: { color: "#C05621", marginRight: 10 },
});
