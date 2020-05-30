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
    <View style={[styles.line, { marginTop: props.log.index === 1 ? 20 : 0 }]}>
      {/* {props.log.status === 200 && <View style={styles.badge} />} */}
      {props.log.code !== 111 ? (
        <View>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Text
              style={[
                styles.logs,
                { color: props.log.code === 200 ? "#68D391" : "#E53E3E" },
              ]}
            >{`${props.log.index} - ${props.log.message}`}</Text>
            <Text style={styles.time}>{`[${created_date}]`}</Text>
          </View>
          <Text
            style={[
              styles.logs,
              {
                width: 200,
                color:
                  props.log.code === 200 ? "rgba(96,100,109, 0.4)" : "#E53E3E",
                marginLeft: 10,
              },
            ]}
          >
            {props.log.text}
          </Text>
        </View>
      ) : (
        <View style={styles.hr} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  line: {
    marginLeft: 30,
    marginRight: 30,
  },
  hr: {
    height: 1.5,
    width: "100%",
    backgroundColor: "rgb(242, 242, 247)",
    marginTop: 10,
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
