import { RouteProp } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import { RootStackParamList } from "../App";

type SvarScreenRouteProp = RouteProp<RootStackParamList, "Uträkning">;

interface Props {
  route: SvarScreenRouteProp;
}

export default function AfterSubmitScreen({ route }: Props) {
  const { userInformation } = route.params;

  const Räkna = () => {
    return userInformation.weight * 10;
  };

  return (
    <View style={styles.container}>
      <Text>
        ID: {userInformation.goalId}
        Weight: {userInformation.weight} {Räkna()}
      </Text>
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
