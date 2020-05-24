import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Linking,
} from "react-native";
import { Feather } from "@expo/vector-icons";

export default function NotificationsAlert() {
  return (
    <View style={styles.container}>
      <View style={styles.hr} />
      <Feather
        name="alert-triangle"
        size={40}
        style={{ marginBottom: 10, color: "rgb(255, 204, 0)" }}
      />
      <Text style={styles.text}>
        To take full advantage of EDL Client functionality, you must activate
        notifications:
      </Text>
      <TouchableOpacity
        onPress={() => Linking.openURL("app-settings:")}
        activeOpacity={0.5}
        style={styles.buton}
      >
        <Text style={styles.textButton}>Open Settings.app</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center", paddingHorizontal: 40 },
  hr: {
    height: 1.5,
    width: "100%",
    backgroundColor: "rgb(242, 242, 247)",
    marginBottom: 15,
  },
  buton: {
    marginTop: 20,
    width: 250,
    borderRadius: 13,
    backgroundColor: "rgb(242, 242, 247)",
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: "center",
  },
  textButton: { fontSize: 17, color: "rgb(0, 122, 255)" },
  text: {
    fontSize: 15,
    color: "rgba(96,100,109, 0.5)",
    lineHeight: 24,
    textAlign: "center",
  },
});
