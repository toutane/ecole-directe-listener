import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useContext } from "react";
import { View } from "react-native";

import BottomTabNavigator from "./BottomTabNavigator";
import { AuthContext } from "../contexts/authContext";
import AuthScreen from "../screens/AuthScreen";

const Stack = createStackNavigator();

export default function Routes(props) {
  const { authenticated } = useContext(AuthContext);

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {authenticated ? (
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Root" component={BottomTabNavigator} />
          </Stack.Navigator>
        </NavigationContainer>
      ) : (
        <AuthScreen />
      )}
    </View>
  );
}
