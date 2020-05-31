import React, { useContext } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import * as Linking from "expo-linking";
import { Feather } from "@expo/vector-icons";

import { LogsContext } from "../../../contexts/logsContext";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function ServerStatusCard() {
  const { isLoading, serverStatus } = useContext(LogsContext);
  let date = new Date(serverStatus.createdAt),
    month = "" + date.getMonth(),
    day = "" + date.getDay(),
    hours = "" + date.getHours(),
    minutes = "" + date.getMinutes(),
    seconds = date.getSeconds();

  let created_date = `${month < 10 ? `0` + month : month}/${
    day < 10 ? `0` + day : day
  } ${hours < 10 ? `0` + hours : hours}:${
    minutes < 10 ? `0` + minutes : minutes
  }:${seconds < 10 ? `0` + seconds : seconds}`;
  return (
    <View
      style={[
        styles.card,
        {
          alignItems: isLoading ? "center" : "flex-start",
          borderColor:
            serverStatus.readyState === "READY" ? "#68D391" : "#E53E3E",
        },
      ]}
    >
      {!isLoading ? (
        <View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.title}>STATUS</Text>
            <View
              style={[
                styles.badge,
                {
                  backgroundColor:
                    serverStatus.readyState === "READY" ? "#68D391" : "#E53E3E",
                },
              ]}
            />
            <Text style={styles.text}>{serverStatus.readyState}</Text>
          </View>
          <View style={{ marginTop: 10 }}>
            <Text style={styles.title}>DOMAINS</Text>
            <View style={{ marginTop: 5 }} />
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center" }}
              onPress={() => Linking.openURL("https://edl-core.toutane.now.sh")}
            >
              <Feather
                size={15}
                name="external-link"
                style={{ marginRight: 5 }}
              />
              <Text style={styles.text}>edl-core.toutane.now.sh</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 3,
              }}
              onPress={() => Linking.openURL(`https://${serverStatus.url}`)}
            >
              <Feather
                size={15}
                name="external-link"
                style={{ marginRight: 5 }}
              />
              <Text style={styles.text}>{serverStatus.url}</Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 10 }}>
            <Text style={styles.title}>CREATE AT</Text>
            <View style={{ marginTop: 5 }} />
            <Text style={[styles.text, { marginTop: 5 }]}>
              {" "}
              {`On ${created_date}`}
            </Text>
          </View>
        </View>
      ) : (
        <ActivityIndicator size="large" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    paddingVertical: 20,
    paddingHorizontal: 30,
    marginTop: 50,
    width: 300,
    height: 200,
    backgroundColor: "#fff",
    borderRadius: 30,
    shadowOpacity: 0.1,
    shadowRadius: 15,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    borderWidth: 2,

    justifyContent: "center",
  },
  title: { color: "rgba(96,100,109, 0.5)", fontSize: 14 },
  text: { fontWeight: "600", fontSize: 15 },
  badge: { marginHorizontal: 7.5, width: 12.5, height: 12.5, borderRadius: 50 },
});
