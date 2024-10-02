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
        if (userInformation.activityLevelId == 1) {
          return Math.round(BmiCalculateMale() * 1.375 + 500);
        } else if (userInformation.activityLevelId == 2) {
          return Math.round(BmiCalculateMale() * 1.55 + 500);
        } else if (userInformation.activityLevelId == 3) {
          return Math.round(BmiCalculateMale() * 1.725 + 500);
        }
      } else if (userInformation.gender === "Kvinna") {
        if (userInformation.activityLevelId == 1) {
          return Math.round(BmiCalculateFemale() * 1.375 + 500);
        } else if (userInformation.activityLevelId == 2) {
          return Math.round(BmiCalculateFemale() * 1.55 + 500);
        } else if (userInformation.activityLevelId == 3) {
          return Math.round(BmiCalculateFemale() * 1.725 + 500);
        }
      }
    } else if (userInformation.goalId === "2") {
      if (userInformation.gender === "Man") {
        if (userInformation.activityLevelId == 1) {
          return Math.round(BmiCalculateMale() * 1.375 - 500);
        } else if (userInformation.activityLevelId == 2) {
          return Math.round(BmiCalculateMale() * 1.55 - 500);
        } else if (userInformation.activityLevelId == 3) {
          return Math.round(BmiCalculateMale() * 1.725 - 500);
        }
      } else if (userInformation.gender === "Kvinna") {
        if (userInformation.activityLevelId == 1) {
          return Math.round(BmiCalculateFemale() * 1.375 - 500);
        } else if (userInformation.activityLevelId == 2) {
          return Math.round(BmiCalculateFemale() * 1.55 - 500);
        } else if (userInformation.activityLevelId == 3) {
          return Math.round(BmiCalculateFemale() * 1.725 - 500);
        }
      }
    } else if (userInformation.goalId === "3") {
      if (userInformation.gender === "Man") {
        if (userInformation.activityLevelId == 1) {
          return Math.round(BmiCalculateMale() * 1.375);
        } else if (userInformation.activityLevelId == 2) {
          return Math.round(BmiCalculateMale() * 1.55);
        } else if (userInformation.activityLevelId == 3) {
          return Math.round(BmiCalculateMale() * 1.725);
        }
      } else if (userInformation.gender === "Kvinna") {
        if (userInformation.activityLevelId == 1) {
          return Math.round(BmiCalculateFemale() * 1.375);
        } else if (userInformation.activityLevelId == 2) {
          return Math.round(BmiCalculateFemale() * 1.55);
        } else if (userInformation.activityLevelId == 3) {
          return Math.round(BmiCalculateFemale() * 1.725);
        }
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
      <Text>Activity {userInformation.activityLevelId}</Text>
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
