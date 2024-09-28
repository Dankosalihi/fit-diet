import { RouteProp } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import { RootStackParamList } from "../App";

type SvarScreenRouteProp = RouteProp<RootStackParamList, "Uträkning">;

interface Props {
  route: SvarScreenRouteProp;
}

export default function AfterSubmitScreen({ route }: Props) {
  const { userInformation } = route.params;

  const BmiCalculateFemale = () => {
    return (
      10 * userInformation.weight +
      6.25 * userInformation.height -
      5 * userInformation.age -
      161
    );
  };
  const BmiCalculateMale = () => {
    return (
      10 * userInformation.weight +
      6.25 * userInformation.height -
      5 * userInformation.age +
      5
    );
  };

  const CalculateBmi = () => {
    if (userInformation.goalId === "1") {
      if (userInformation.gender === "Man") {
        return BmiCalculateMale();
      } else if (userInformation.gender === "Kvinna") {
        return BmiCalculateFemale();
      }
    } else if (userInformation.goalId === "2") {
      if (userInformation.gender === "Man") {
        return "c";
      } else if (userInformation.gender === "Kvinna") {
        return "d";
      }
    } else if (userInformation.goalId === "3") {
      if (userInformation.gender === "Man") {
        return "e";
      } else if (userInformation.gender === "Kvinna") {
        return "f";
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text>{CalculateBmi()}</Text>
      <Text>Weight: {userInformation.weight}</Text>
      <Text>Height: {userInformation.height}</Text>
      <Text>Age: {userInformation.age}</Text>
      <Text>Gender: {userInformation.gender}</Text>
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
