import React, { useContext } from "react";
import { StyleSheet, View, TextInput, Text } from "react-native";

import { AuthContext } from "../contexts/authContext";
import { UserContext } from "../contexts/userContext";

export default function AuthInput() {
  const { login } = useContext(AuthContext);
  const { setError, setUsername, setPassword } = useContext(UserContext);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        returnKeyType="next"
        onChangeText={(e) => (setUsername(e), setError(" "))}
        onSubmitEditing={() => passwordInput.focus()}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        returnKeyType="go"
        onChangeText={(e) => (setPassword(e), setError(" "))}
        secureTextEntry={true}
        ref={(input) => (passwordInput = input)}
        onSubmitEditing={login}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 30, alignItems: "center" },
  input: {
    height: 50,
    width: 250,
    backgroundColor: "rgb(242, 242, 247)",
    borderRadius: 13,
    paddingHorizontal: 15,
    marginTop: 15,
    fontSize: 18,
  },
  text: {
    fontSize: 17,
    color: "#F40000",
    lineHeight: 24,
    textAlign: "center",
  },
});
