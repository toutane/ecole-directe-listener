import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Line(props) {
  let date = new Date(props.log.created),
    hours = "" + date.getHours(),
    minutes = "" + date.getMinutes(),
    seconds = date.getSeconds();

  let created_date = `${hours < 10 ? `0` + hours : hours}:${
    minutes < 10 ? `0` + minutes : minutes
  }:${seconds < 10 ? `0` + seconds : seconds}`;

  return (
    <View
      style={[
        styles.line,
        {
          marginTop: props.index === 0 ? 10 : 0,
          marginBottom: props.isLast ? 20 : 0,
        },
      ]}
    >
      <Text
        style={[
          styles.logs,
          { color: props.log.type === "stdout" ? "#68D391" : "#F6AD55" },
        ]}
      >{`${props.index} - ${props.log.payload.text}`}</Text>
      <Text style={styles.time}>{`[${created_date}]`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  line: {
    flexDirection: "row",
    marginLeft: 30,
    marginRight: 30,
  },
  logs: {
    width: 170,
    marginBottom: 5,
    fontFamily: "space-mono",
    color: "rgba(96,100,109, 0.4)",
  },
  time: {
    marginTop: 3,
    marginRight: 10,
    fontSize: 11,
    marginBottom: 5,
    fontFamily: "space-mono",
    color: "rgba(96,100,109, 0.4)",
  },
  badge: {
    marginTop: 6,
    marginRight: 30,
    width: 10,
    height: 10,
    borderRadius: 50,
    backgroundColor: "#68D391",
  },
});
