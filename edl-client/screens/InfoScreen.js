import { Feather } from "@expo/vector-icons";
import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";

import { UserContext } from "../contexts/userContext";

export default function InfoScreen() {
  const { username, token, eleveId, expoPushToken } = useContext(UserContext);

  return (
    <View style={{ marginTop: 20 }}>
      <OptionButton icon="user" label={`Username: ${username}`} />
      <OptionButton icon="briefcase" label={`ED eleveID: ${eleveId}`} />
      <OptionButton icon="credit-card" label={`ED token: ${token}`} />
      <OptionButton
        icon="credit-card"
        label={`Notification token: ${expoPushToken.substring(
          expoPushToken.lastIndexOf("[") + 1,
          expoPushToken.lastIndexOf("]")
        )}`}
      />
      <OptionButton icon="git-commit" label={`EDL Client v1.26-05`} />
    </View>
  );
}

function OptionButton({ icon, label, onPress, isLastOption }) {
  return (
    <RectButton style={[styles.option, isLastOption && styles.lastOption]}>
      <View style={{ flexDirection: "row" }}>
        <View style={styles.optionIconContainer}>
          <Feather name={icon} size={22} color="rgba(0,0,0,0.35)" />
        </View>
        <View style={styles.optionTextContainer}>
          <Text style={styles.optionText} numberOfLines={1}>
            {label}
          </Text>
        </View>
      </View>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  optionIconContainer: {
    marginRight: 12,
  },
  option: {
    backgroundColor: "#fdfdfd",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: "#ededed",
  },
  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionText: {
    width: 300,
    fontSize: 15,
    alignSelf: "flex-start",
    marginTop: 1,
  },
});
