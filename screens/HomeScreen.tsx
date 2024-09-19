import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, StyleSheet, Text, View } from "react-native";
import { RootStackParamList } from "../App";
import { goalSelections } from "../data/goalSelection";

type HomeProps = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: HomeProps) {
  return (
    <View style={styles.container}>
      <Text>Vad är ditt mål?</Text>
      <View>
        {goalSelections.map((selectedGoal) => (
          <View key={selectedGoal.goalId}>
            <Button
              title={selectedGoal.description}
              onPress={() => navigation.navigate("Användare")}
            />
          </View>
        ))}
      </View>
    </View>
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
