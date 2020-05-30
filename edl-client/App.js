import * as React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";

import AllContextsProvider from "./contexts/allContexts";

import useCachedResources from "./hooks/useCachedResources";
import Routes from "./navigation/Routes";

export default function App(props) {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === "ios" && <StatusBar barStyle="dark-content" />}
        <AllContextsProvider>
          <Routes />
        </AllContextsProvider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
