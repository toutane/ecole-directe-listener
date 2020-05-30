import React, { useContext } from "react";
import {
  StyleSheet,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";

import { AuthContext } from "../contexts/authContext";
import { UserContext } from "../contexts/userContext";

import AuthCard from "../components/Auth/AuthCard";

export default function AuthScreen() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPress={Keyboard.dismiss}
        style={styles.touchableOpacity}
      >
        <AuthCard />
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  touchableOpacity: {
    height: 800,
    justifyContent: "center",
    paddingHorizontal: 40,
  },
});

{
  /* <Text style={styles.title}>⚡️EDL Client</Text>
<View style={styles.activityIndicatorContainer}>
  {loading && <ActivityIndicator />}
</View>
<Button
  title="Login to Ecole Directe"
  onPress={() =>
    (username && password) === ""
      ? setError("Please fill the requiered fields")
      : login()
  }
/>
<AuthInput /> */
}
