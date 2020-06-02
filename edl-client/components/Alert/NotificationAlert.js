import React, { useContext } from "react";
import {
  View,
  Linking,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { Feather } from "@expo/vector-icons";

export default function NotificationAlert() {
  return (
    <TouchableOpacity
      style={styles.alert}
      onPress={() => Linking.openURL("app-settings:")}
      activeOpacity={0.8}
    >
      <Feather name="alert-triangle" size={35} style={styles.icon} />
      <Text style={styles.text}>
        {`To take full advantage of EDL Client functionality, activate notifications:\n\n`}
        <Text style={[styles.text, { fontWeight: "700" }]}>
          Tap this notif to activate →
        </Text>
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  alert: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FBD38D",
    height: 100,
    borderRadius: 20,
    paddingHorizontal: 20,
  },
  text: { color: "#C05621", fontSize: 15, flexShrink: 10 },
  icon: { color: "#C05621", marginRight: 15 },
});
