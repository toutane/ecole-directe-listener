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
import { ListenContext } from "../contexts/listenContext";
import ControlButton from "../components/ControlButton";

export default function HomeScreen() {
  const { authenticated, loading, login, logout } = useContext(AuthContext);
  const { isListening, cronId } = useContext(ListenContext);

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
          <Button title="Logout" onPress={() => logout()} />
        ) : (
          <Button title="Login to Ecole Directe" onPress={() => login()} />
        )}
        <View style={{ marginTop: 5, marginBottom: 10 }}>
          <Text style={styles.text}>{`You are ${
            !authenticated ? "not" : ""
          } authenticated`}</Text>
        </View>
        {authenticated ? <ControlButton /> : null}
        <View style={{ paddingVertical: 10 }}>
          <Text style={styles.text}>
            {isListening ? `Listening with Cron ID: ${cronId}` : ""}
          </Text>
        </View>
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
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "center",
  },
});
