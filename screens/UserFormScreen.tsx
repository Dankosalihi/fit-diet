import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useContext } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { RadioButton } from "react-native-paper";
import { Context, RootStackParamList } from "../App";
import { UserInformation, goalSelection } from "../data/goalSelection";

type UserFormScreenNavigation = NativeStackNavigationProp<
  RootStackParamList,
  "Mål"
>;

export default function UserFormScreen() {
  const route = useRoute<RouteProp<RootStackParamList, "Mål">>();
  const { id } = route.params;

  const navigation = useNavigation<UserFormScreenNavigation>();
  const context = useContext(Context);

  if (!context) {
    console.log("inget värde");
    return null;
  }

  const {
    weightInPut,
    setWeight,
    lenghtInPut,
    setLenght,
    ageInPut,
    setAge,
    genderInPut,
    setGender,
    checked,
    setChecked,
  } = context;
  // useContext(Context)

  const userInformation: UserInformation = {
    weight: parseInt(weightInPut),
    height: parseInt(lenghtInPut),
    age: parseInt(ageInPut),
    gender: genderInPut,
    goalId: id,
    description: "",
    activityLevelText: "",
    activityLevelId: parseInt(checked),
  };

  const handleSubmit = () => {
    navigation.navigate("Uträkning", { userInformation });
  };

  ///

  const text = "Hello, my container is blurring contents underneath!";

  return (
    <View style={styles.container}>
      <TextInput
        style={InPutStyle.input}
        onChangeText={setWeight}
        value={weightInPut}
        placeholder="Vikt (KG)"
        keyboardType="numeric"
      />
      <TextInput
        style={InPutStyle.input}
        onChangeText={setLenght}
        value={lenghtInPut}
        placeholder="Längd (CM)"
        keyboardType="numeric"
      />
      <TextInput
        style={InPutStyle.input}
        onChangeText={setAge}
        value={ageInPut}
        placeholder="Ålder"
        keyboardType="numeric"
      />
      <TextInput
        style={InPutStyle.input}
        onChangeText={setGender}
        value={genderInPut}
        placeholder="Man/Kvinna"
      />
      <Text> Välj aktivitetsgrad</Text>
      <View>
        {goalSelection.map((activityLevelSelection) => (
          <View key={activityLevelSelection.activityLevelId}>
            <Text>{activityLevelSelection.activityLevelText}</Text>
            <RadioButton
              value={userInformation.activityLevelId.toString()}
              status={
                checked == activityLevelSelection.activityLevelId.toString()
                  ? "checked"
                  : "unchecked"
              }
              onPress={() =>
                setChecked(activityLevelSelection.activityLevelId.toString())
              }
            />
          </View>
        ))}
      </View>
      <Button onPress={handleSubmit} title="Gå vidare" />
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
