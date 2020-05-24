import React, { useState, useEffect, useContext } from "react";
import * as Permissions from "expo-permissions";
import { Notifications } from "expo";
import { AppState } from "react-native";

const PermissionsContext = React.createContext();
const { Provider } = PermissionsContext;

const PermissionsProvider = (props) => {
  const [appState, setAppState] = useState(AppState.currentState);
  const [isNotificationsGranted, setIsNotificationsGranted] = useState(false);

  useEffect(() => {
    AppState.addEventListener("change", _handleAppStateChange);
  }, []);

  _handleAppStateChange = (nextAppState) => {
    setAppState(nextAppState);
  };

  useEffect(() => {
    appState === "active" && checkPermissionsStatus();
  }, [appState]);

  async function checkPermissionsStatus() {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);

    status === "granted"
      ? setIsNotificationsGranted(true)
      : setIsNotificationsGranted(false);
  }

  async function getExpoNotificationsToken() {
    return (token = await Notifications.getExpoPushTokenAsync());
  }

  return (
    <Provider value={{ isNotificationsGranted, getExpoNotificationsToken }}>
      {props.children}
    </Provider>
  );
};

export { PermissionsContext, PermissionsProvider };
