import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import * as Linking from "expo-linking";

export default function AppVersion() {
  return (
    <View>
      <Text
        style={{
          textAlign: "center",
          color: "rgba(96,100,109, 0.5)",
          marginTop: 20,
          lineHeight: 24,
        }}
      >
        EDL-Client version 1.0
      </Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text
          style={{
            textAlign: "center",
            color: "rgba(96,100,109, 0.5)",
            lineHeight: 34,
          }}
        >
          Made with ❤️ by
        </Text>
        <TouchableOpacity style={{ marginLeft: 5 }}>
          <Text
            style={{ color: "#63B3ED", fontSize: 15 }}
            onPress={() => Linking.openURL("https://github.com/toutane")}
          >
            @toutane
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
