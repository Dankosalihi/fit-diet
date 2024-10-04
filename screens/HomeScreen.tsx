import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, StyleSheet, Text, View } from "react-native";
import { RootStackParamList } from "../App";
import { goalSelection } from "../data/userData";

type HomeProps = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: HomeProps) {
  const handlePress = (goalId: string) => {
    navigation.navigate("Mål", { id: goalId });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vad är ditt mål?</Text>
      <View style={styles.buttonContainer}>
        {goalSelection.map((selectedGoal) => (
          <View key={selectedGoal.goalId} style={styles.buttonWrapper}>
            <Button
              title={selectedGoal.description}
              onPress={() => handlePress(selectedGoal.goalId)}
              color="black"
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
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    marginBottom: 20,
  },
  buttonContainer: {
    alignItems: "center",
    width: "100%",
  },
  buttonWrapper: {
    marginBottom: 15,
    width: "80%",
  },
});
