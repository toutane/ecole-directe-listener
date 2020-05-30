import React, { useContext } from "react";
import { View, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

import { AuthContext } from "../../contexts/authContext";
import { ListenContext } from "../../contexts/listenContext";
import { UserContext } from "../../contexts/userContext";

export default function SignOutButton() {
  const { logout } = useContext(AuthContext);
  const { setError } = useContext(UserContext);
  const { isListening } = useContext(ListenContext);
  return (
    <TouchableOpacity
      style={{ justifyContent: "center", alignItems: "center" }}
      onPress={() =>
        isListening ? setError("Please stop listening to logout") : logout()
      }
    >
      <Feather name="log-out" size={20} color="rgba(96,100,109, 0.5)" />
    </TouchableOpacity>
  );
}
