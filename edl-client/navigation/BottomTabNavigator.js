import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

import { ListenContext } from "../contexts/listenContext";

import ListenScreen from "../screens/ListenScreen";
import ServerScreen from "../screens/ServerScreen";
import UserScreen from "../screens/UserScreen";

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = "User";

function TabBar({ state, descriptors, navigation }) {
  const { isListening } = useContext(ListenContext);
  return (
    <View
      style={{
        // backgroundColor:
        //   state.index === 1 ? (!isListening ? "white" : "#68D391") : "white",
        width: "100%",
        height: 70,
      }}
    >
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={index}
              onPress={onPress}
              style={{ flex: 1, alignItems: "center", marginTop: 10 }}
            >
              <Feather
                name={
                  label === "Server"
                    ? "hard-drive"
                    : label === "User"
                    ? "user"
                    : "headphones"
                }
                size={25}
                color={isFocused ? "#63B3ED" : "rgba(96,100,109, 0.5)"}
                style={{ marginBottom: 5 }}
              />
              <Text
                style={[
                  styles.label,
                  {
                    color: isFocused ? "#63B3ED" : "rgba(96,100,109, 0.5)",
                  },
                ]}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

export default function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName={INITIAL_ROUTE_NAME}
      tabBarOptions={{ activeTintColor: "#63B3ED" }}
      tabBar={(props) => <TabBar {...props} />}
    >
      <BottomTab.Screen name="User" component={UserScreen} />
      <BottomTab.Screen name="Listen" component={ListenScreen} />
      <BottomTab.Screen name="Server" component={ServerScreen} />
    </BottomTab.Navigator>
  );
}

const styles = StyleSheet.create({
  label: { fontSize: 10, textAlign: "center" },
  tabBar: {
    flex: 1,
    flexDirection: "row",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: "white",
    shadowOpacity: 0.1,
    shadowRadius: 15,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
  },
});
