import React, { useContext } from "react";
import { StyleSheet, SafeAreaView, View } from "react-native";

import { PermissionsContext } from "../contexts/permissionsContext";
import { AuthContext } from "../contexts/authContext";

import SignOutButton from "../components/Auth/SignOutButton";
import NotificationAlert from "../components/Alert/NotificationAlert";
import UserCard from "../components/User/UserCard";
import AppVersion from "../components/User/AppVersion";

export default function UserScreen() {
  const { isNotificationsGranted } = useContext(PermissionsContext);
  const { loading } = useContext(AuthContext);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.alert}>
        {!isNotificationsGranted ? <NotificationAlert /> : null}
      </View>
      {!loading && <UserCard />}
      <SignOutButton />
      <AppVersion />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
