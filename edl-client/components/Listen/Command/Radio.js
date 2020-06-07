import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

export default function Radio(props) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.container}
      onPress={() => props.touch(props.text, props.isSelected)}
    >
      <TouchableOpacity
        style={styles.border}
        onPress={() => props.touch(props.text, props.isSelected)}
      >
        <View
          style={[
            styles.circle,
            { backgroundColor: props.isSelected ? "#68D391" : "transparent" },
          ]}
        />
      </TouchableOpacity>
      <Text style={styles.text}>{props.text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    paddingHorizontal: 15,
    alignItems: "center",
  },
  text: { marginTop: 5, fontSize: 15, color: "rgba(96,100,109, 0.6)" },
  border: {
    justifyContent: "center",
    alignItems: "center",
    width: 25,
    height: 25,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "rgba(96,100,109, 0.2)",
  },
  circle: {
    width: 17.5,
    height: 17.5,
    borderRadius: 50,
  },
});
