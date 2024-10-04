import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import React, { createContext, useState } from "react";
import { StyleSheet } from "react-native";
import { UserInformation } from "./data/userData";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import UserFormScreen from "./screens/UserFormScreen";

export type RootStackParamList = {
  Home: undefined;
  Mål: { id: string };
  Profil: { userInformation: UserInformation };
};

export interface Prop {
  weightInPut: string;
  setWeight: (value: string) => void;
  weightGoalInPut: string;
  setWeightGoal: (value: string) => void;
  lenghtInPut: string;
  setLenght: (value: string) => void;
  ageInPut: string;
  setAge: (value: string) => void;
  genderInPut: string;
  setGender: (value: string) => void;
  checked: string;
  setChecked: (value: string) => void;
  weekGoalInPut: string;
  setWeekGoal: (value: string) => void;
}

const RootStack = createNativeStackNavigator<RootStackParamList>();

export const Context = createContext<Prop | undefined>(undefined);

export default function App() {
  const [weightInPut, setWeight] = useState("");
  const [weightGoalInPut, setWeightGoal] = useState("");
  const [lenghtInPut, setLenght] = useState("");
  const [ageInPut, setAge] = useState("");
  const [genderInPut, setGender] = useState("");
  const [checked, setChecked] = useState("");
  const [weekGoalInPut, setWeekGoal] = useState("");

  return (
    <Context.Provider
      value={{
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
      }}
    >
      <NavigationContainer>
        <StatusBar style="auto" />
        <RootStack.Navigator initialRouteName="Home">
          <RootStack.Screen name="Home" component={HomeScreen} />
          <RootStack.Screen name="Mål" component={UserFormScreen} />
          <RootStack.Screen name="Profil" component={ProfileScreen} />
        </RootStack.Navigator>
      </NavigationContainer>
    </Context.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
