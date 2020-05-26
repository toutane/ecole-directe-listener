import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  Button,
  ActivityIndicator,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { AuthContext } from "../contexts/authContext";
import { UserContext } from "../contexts/userContext";
import { ListenContext } from "../contexts/listenContext";
import { PermissionsContext } from "../contexts/permissionsContext";

import AuthInput from "../components/AuthInputs";
import NotificationsAlert from "../components/NotificationsAlert";
import ListeningView from "../components/ListeningView";

export default function HomeScreen() {
  const { authenticated, loading, login, logout } = useContext(AuthContext);
  const { password, username, error, setError } = useContext(UserContext);
  const { isListening } = useContext(ListenContext);
  const { isNotificationsGranted } = useContext(PermissionsContext);

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={styles.title}>⚡️EDL Client</Text>
        <View style={styles.activityIndicatorContainer}>
          {loading && <ActivityIndicator />}
        </View>
        {authenticated ? (
          <Button
            title="Logout"
            onPress={() =>
              isListening
                ? setError("Please stop listening to logout")
                : logout()
            }
          />
        ) : (
          <Button
            title="Login to Ecole Directe"
            onPress={() =>
              (username && password) === ""
                ? setError("Please fill the requiered fields")
                : login()
            }
          />
        )}
        <View style={{ paddingVertical: 5 }}>
          <Text
            style={[
              styles.text,
              {
                color:
                  error !== " " ? "rgb(255, 59, 48)" : "rgba(96,100,109, 0.5)",
              },
            ]}
          >
            {error === "  "
              ? `You are ${!authenticated ? "not" : ""} authenticated ${
                  !authenticated ? "" : "with: " + username
                }`
              : error}
          </Text>
        </View>
        {authenticated ? <ListeningView /> : <AuthInput />}
        {authenticated && !isNotificationsGranted ? (
          <NotificationsAlert />
        ) : null}
      </ScrollView>
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  activityIndicatorContainer: { paddingTop: 5, height: 30 },
  title: { fontSize: 24, fontWeight: "700", textAlign: "center" },
  text: {
    fontSize: 17,
    color: "rgba(96,100,109, 0.5)",
    lineHeight: 24,
    textAlign: "center",
  },
});
