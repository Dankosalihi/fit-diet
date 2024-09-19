import React from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";

export default function UserInfoInput() {
  const [number, onChangeNumber] = React.useState("");
  return (
    <View style={styles.container}>
      <TextInput
        style={InPutStyle.input}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="Vikt"
      />
      <TextInput
        style={InPutStyle.input}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="Längd"
      />
      <TextInput
        style={InPutStyle.input}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="Ålder"
        keyboardType="numeric"
      />
      <Button title="Gå vidare" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "orange",
  },
});

const InPutStyle = StyleSheet.create({
  input: {
    width: 140,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "orange",
  },
});
