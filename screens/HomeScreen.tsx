import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, StyleSheet, Text, View } from "react-native";
import { RootStackParamList } from "../App";
import { goalSelection } from "../data/goalSelection";
type HomeProps = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: HomeProps) {
  const handlePress = (goalId: string) => {
    navigation.navigate("Mål", { id: goalId });
  };
  return (
    <View style={styles.container}>
      <Text>Vad är ditt mål?</Text>
      <View>
        {goalSelection.map((selectedGoal) => (
          <View key={selectedGoal.description}>
            <Button
              title={selectedGoal.description}
              onPress={() => handlePress(selectedGoal.goalId)}
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
