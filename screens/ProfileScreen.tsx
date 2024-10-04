import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import {
  Button,
  Dimensions,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import { RootStackParamList } from "../App";

type ProfileScreenProps = NativeStackScreenProps<RootStackParamList, "Profil">;
const screenWidth = Dimensions.get("window").width;

export default function ProfileScreen({
  route,
  navigation,
}: ProfileScreenProps) {
  const { userInformation } = route.params;
  const [savedWeights, setSavedWeights] = useState<number[]>([]);

  useEffect(() => {
    const getWeightFromStorage = async () => {
      const existingWeights = await AsyncStorage.getItem("userWeights");
      setSavedWeights(existingWeights ? JSON.parse(existingWeights) : []);
    };

    getWeightFromStorage();
  }, []);

  const progress = (userInformation.weight / userInformation.weightGoal) * 100;
  const weight = userInformation.weight;
  const height = userInformation.height / 100;

  function calculateBMI(weight: number, height: number): number {
    return weight / (height * height);
  }

  const bmi = calculateBMI(weight, height);

  const generateWeightData = (
    weeks: number,
    startWeight: number,
    wantedWeight: number
  ): { labels: string[]; datasets: { data: number[] }[] } => {
    const weightLossPerWeek: number = (startWeight - wantedWeight) / weeks;
    const points: { weekName: string; currentWeight: number }[] = [];

    for (let week = 0; week <= weeks; week++) {
      const weekName = "v" + week;
      const currentWeight = startWeight - weightLossPerWeek * week;
      points.push({ weekName, currentWeight });
    }

    return {
      labels: points.map((firstDot) => firstDot.weekName),
      datasets: [
        {
          data: points.map((dot) => dot.currentWeight),
        },
      ],
    };
  };

  const chartData = generateWeightData(
    userInformation.weekGoal,
    weight,
    userInformation.weightGoal
  );

  return (
    <ImageBackground
      source={{
        uri: "https://i.pinimg.com/736x/37/b5/75/37b57509ff47f603e522df4fcb5c3b48.jpg",
      }}
      style={styles.backgroundImage}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <BlurView intensity={60} tint="dark" style={styles.blurContainer}>
          <Text style={styles.textLarge}>
            Du har uppnått: {progress.toFixed(1)}% av ditt mål!
          </Text>
          <View style={styles.progressBar}>
            <LinearGradient
              colors={["white", "red"]}
              style={{ height: "100%", width: `${progress}%` }}
            />
          </View>
        </BlurView>

        <BlurView intensity={60} tint="dark" style={styles.infoContainer}>
          <Text style={styles.textLarge}>
            Ditt viktmål är: {userInformation.weightGoal} Kg
          </Text>
          <Text style={styles.textSmall}>
            Din nuvarande vikt: {userInformation.weight} Kg
          </Text>
          <Text style={styles.textSmall}>
            För att nå ditt mål på {userInformation.weekGoal} veckor behöver du{" "}
            {userInformation.bmrAfterGoal} kalorier per dag.
          </Text>
          <Text style={styles.textSmall}>
            Ditt nuvarande BMI (Body Mass Index) är {bmi.toFixed(2)}.
          </Text>
        </BlurView>
        <LineChart
          data={chartData}
          width={screenWidth - 32}
          height={220}
          yAxisLabel=""
          yAxisSuffix="kg"
          chartConfig={{
            backgroundGradientFrom: "blue",
            backgroundGradientTo: "red",
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "5",
              strokeWidth: "2",
              stroke: "black",
            },
          }}
          style={{
            marginVertical: 16,
            borderRadius: 16,
          }}
        />
        <BlurView
          intensity={60}
          tint="dark"
          style={styles.storageInfoContainer}
        >
          <ScrollView>
            <Text style={styles.textLarge}>Vikt-historik:</Text>
            {savedWeights.map((weight, index) => (
              <Text key={index} style={styles.textSmall}>
                {weight} Kg
              </Text>
            ))}
          </ScrollView>
        </BlurView>

        <View style={styles.buttonContainer}>
          <Button
            title="Redigera mål"
            onPress={() => navigation.replace("Home")}
          />
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: "space-between",
    paddingTop: 50,
    alignItems: "center",
    paddingBottom: 30,
  },
  blurContainer: {
    width: "90%",
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    padding: 10,
  },
  infoContainer: {
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
    marginTop: 20,
  },
  storageInfoContainer: {
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    padding: 20,
    marginTop: 15,
    marginBottom: 20,
    maxHeight: 300,
  },
  progressBar: {
    marginTop: 20,
    height: 20,
    width: "100%",
    backgroundColor: "white",
  },
  textLarge: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
  textSmall: {
    fontSize: 16,
    textAlign: "center",
    color: "white",
    marginTop: 5,
  },
  buttonContainer: {
    width: "100%",
    paddingBottom: 30,
  },
});
