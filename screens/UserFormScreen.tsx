import AsyncStorage from "@react-native-async-storage/async-storage";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useContext } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { CheckBox } from "react-native-elements";
import { Context, RootStackParamList } from "../App";
import { UserInformation, goalSelection } from "../data/userData";

type UserFormScreenProps = NativeStackNavigationProp<RootStackParamList, "Mål">;

export default function UserFormScreen() {
  const route = useRoute<RouteProp<RootStackParamList, "Mål">>();
  const { id } = route.params;
  const navigation = useNavigation<UserFormScreenProps>();
  const context = useContext(Context);

  if (!context) {
    console.log("inget värde");
    return null;
  }

  const {
    weightInPut,
    setWeight,
    weightGoalInPut,
    setWeightGoal,
    lenghtInPut,
    setLenght,
    ageInPut,
    setAge,
    genderInPut,
    setGender,
    checked,
    setChecked,
    weekGoalInPut,
    setWeekGoal,
  } = context;

  const handleSubmit = async () => {
    const BmrCalculate = () => {
      if (genderInPut.toLowerCase() === "man") {
        return (
          10 * parseInt(weightInPut) +
          6.25 * parseInt(lenghtInPut) -
          5 * parseInt(ageInPut) +
          5
        );
      } else {
        return (
          10 * parseInt(weightInPut) +
          6.25 * parseInt(lenghtInPut) -
          5 * parseInt(ageInPut) -
          161
        );
      }
    };

    const CalculateBmrAfterGoal = () => {
      const startBmr = BmrCalculate();

      const valueDependingOnActivityLevel = () => {
        if (checked === "1") {
          return 1.375;
        } else if (checked === "2") {
          return 1.55;
        } else {
          return 1.725;
        }
      };

      const currentWeight = parseInt(weightInPut);
      const wantedWeight = parseInt(weightGoalInPut);
      const weeks = parseInt(weekGoalInPut);
      const weightDifferent = wantedWeight - currentWeight;
      const totalCaloriesToChangeWeight = weightDifferent * 7700;
      const dailyCaloriesToChangeWeight =
        totalCaloriesToChangeWeight / (weeks * 7);

      if (id === "1") {
        return Math.round(
          startBmr * valueDependingOnActivityLevel() +
            dailyCaloriesToChangeWeight
        );
      } else if (id === "2") {
        return Math.round(
          startBmr * valueDependingOnActivityLevel() +
            dailyCaloriesToChangeWeight
        );
      } else if (id === "3") {
        return Math.round(startBmr * valueDependingOnActivityLevel());
      }
    };

    const userInformation: UserInformation = {
      weight: parseInt(weightInPut),
      weightGoal: parseInt(weightGoalInPut),
      height: parseInt(lenghtInPut),
      age: parseInt(ageInPut),
      gender: genderInPut,
      goalId: id,
      description: "",
      activityLevelText: "",
      activityLevelId: parseInt(checked),
      bmrAfterGoal: CalculateBmrAfterGoal(),
      weekGoal: parseInt(weekGoalInPut),
    };

    const saveWeightInAsyncStorage = async (weightInPut: string) => {
      const existingWeights = await AsyncStorage.getItem("userWeights");
      const weightsArray = existingWeights ? JSON.parse(existingWeights) : [];
      weightsArray.push(parseInt(weightInPut));
      await AsyncStorage.setItem("userWeights", JSON.stringify(weightsArray));
    };

    saveWeightInAsyncStorage(weightInPut);

    navigation.reset({
      index: 0,
      routes: [{ name: "Profil", params: { userInformation } }],
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.placeholderText}>Vikt</Text>
        <TextInput
          style={InPutStyle.input}
          onChangeText={setWeight}
          value={weightInPut}
          placeholder="(KG)"
          keyboardType="numeric"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.placeholderText}>Längd</Text>
        <TextInput
          style={InPutStyle.input}
          onChangeText={setLenght}
          value={lenghtInPut}
          placeholder="(CM)"
          keyboardType="numeric"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.placeholderText}>Ålder</Text>
        <TextInput
          style={InPutStyle.input}
          onChangeText={setAge}
          value={ageInPut}
          placeholder="Antal år"
          keyboardType="numeric"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.placeholderText}>Kön</Text>
        <TextInput
          style={InPutStyle.input}
          onChangeText={setGender}
          value={genderInPut}
          placeholder="Man/Kvinna"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.placeholderText}>Viktmål</Text>
        <TextInput
          style={InPutStyle.input}
          onChangeText={setWeightGoal}
          value={weightGoalInPut}
          placeholder="(KG)"
          keyboardType="numeric"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.placeholderText}>Veckor</Text>
        <TextInput
          style={InPutStyle.input}
          onChangeText={setWeekGoal}
          value={weekGoalInPut}
          placeholder="veckor"
          keyboardType="numeric"
        />
      </View>
      <Text style={styles.text}>Välj aktivitetsgrad</Text>
      <View>
        {goalSelection.map((activityLevelSelection) => (
          <CheckBox
            key={activityLevelSelection.activityLevelId}
            title={activityLevelSelection.activityLevelText}
            checked={
              checked === activityLevelSelection.activityLevelId.toString()
            }
            onPress={() =>
              setChecked(activityLevelSelection.activityLevelId.toString())
            }
            checkedColor="black"
            uncheckedColor="gray"
          />
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
    padding: 20,
    justifyContent: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  placeholderText: {
    width: "20%",
    fontSize: 16,
    color: "black",
  },
  text: {
    color: "black",
    marginBottom: 10,
    fontSize: 16,
  },
});

const InPutStyle = StyleSheet.create({
  input: {
    width: "70%",
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "white",
    borderColor: "black",
  },
});
