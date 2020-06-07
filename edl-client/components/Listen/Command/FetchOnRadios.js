import React, { useState, useContext } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { ListenContext } from "../../../contexts/listenContext";
import Radio from "./Radio";

export default function FetchOnRadios() {
  const { fetchOn, setFetchOn } = useContext(ListenContext);
  const [types, setTypes] = useState(["agenda", "messages", "notes"]);
  const handle_change = (type, isSelected) => {
    isSelected
      ? setFetchOn(
          JSON.stringify(JSON.parse(fetchOn).filter((t) => t !== type))
        )
      : setFetchOn(JSON.stringify(JSON.parse(fetchOn).concat([type])));
  };
  return (
    <View style={styles.container}>
      {types.map((type) => (
        <Radio
          text={type}
          isSelected={JSON.parse(fetchOn).includes(type)}
          touch={(type, isSelected) => handle_change(type, isSelected)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
