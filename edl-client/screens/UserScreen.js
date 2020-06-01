import React, { useContext } from "react";
import { StyleSheet, SafeAreaView, View } from "react-native";

import { PermissionsContext } from "../contexts/permissionsContext";

import UserActionsView from "../components/User/UserActionsView";
import SignOutButton from "../components/Auth/SignOutButton";
import NotificationAlert from "../components/Alert/NotificationAlert";

export default function UserScreen() {
  const { isNotificationsGranted } = useContext(PermissionsContext);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.alert}>
        {isNotificationsGranted ? <NotificationAlert /> : null}
      </View>
      <UserActionsView />
      <View style={styles.button}>
        <SignOutButton />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  button: { bottom: 30, position: "absolute" },
  alert: { paddingHorizontal: 30 },
});
