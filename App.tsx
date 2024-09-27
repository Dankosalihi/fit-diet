import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import React, { createContext, useState } from "react";
import { StyleSheet } from "react-native";
import { UserInformation } from "./data/goalSelection";
import AfterSubmitScreen from "./screens/AfterSubmitScreen";
import HomeScreen from "./screens/HomeScreen";
import UserFormScreen from "./screens/UserFormScreen";

export type RootStackParamList = {
  Home: undefined;
  Mål: { id: string };
  Uträkning: { userInformation: UserInformation };
};

export interface Prop {
  weightInPut: string;
  setWeight: (value: string) => void;
  lenghtInPut: string;
  setLenght: (value: string) => void;
  ageInPut: string;
  setAge: (value: string) => void;
  genderInPut: string;
  setGender: (value: string) => void;
}

const RootStack = createNativeStackNavigator<RootStackParamList>();

// createContext
export const Context = createContext<Prop | undefined>(undefined);

export default function App() {
  // useState
  const [weightInPut, setWeight] = useState("");
  const [lenghtInPut, setLenght] = useState("");
  const [ageInPut, setAge] = useState("");
  const [genderInPut, setGender] = useState("");

  return (
    // <Context.Provider>
    <Context.Provider
      value={{
        weightInPut,
        setWeight,
        lenghtInPut,
        setLenght,
        ageInPut,
        setAge,
        genderInPut,
        setGender,
      }}
    >
      <NavigationContainer>
        <StatusBar style="auto" />
        <RootStack.Navigator initialRouteName="Home">
          <RootStack.Screen name="Home" component={HomeScreen} />
          <RootStack.Screen name="Mål" component={UserFormScreen} />
          <RootStack.Screen name="Uträkning" component={AfterSubmitScreen} />
        </RootStack.Navigator>
      </NavigationContainer>
    </Context.Provider>
    // </Context.Provider>
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
