import React, { useContext } from "react";
import { StyleSheet, SafeAreaView } from "react-native";

import UserActionsView from "../components/User/UserActionsView";

export default function UserScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <UserActionsView />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});
