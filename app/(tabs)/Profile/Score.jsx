import {
  View,
  Text,
  ScrollView,
  Platform,
  Pressable,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import HeaderComponent from "../../../components/HeaderComponent";
import { router } from "expo-router";
import ScoreSpeedometer from "../../../components/ScoreSpeedometer"; // Import the component
import { icons } from "../../../constants";
const Score = () => {
  // State to store the score value
  const [score, setScore] = useState(2500);

  // You can fetch the score from an API or other source
  useEffect(() => {
    // Example: Fetch score from API
    // const fetchScore = async () => {
    //   try {
    //     const response = await fetch('your-api-endpoint');
    //     const data = await response.json();
    //     setScore(data.score);
    //   } catch (error) {
    //     console.error('Error fetching score:', error);
    //   }
    // };
    //
    // fetchScore();

    const intervalId = setInterval(() => {
      setScore((prevScore) => {
        // Generate a random change between -200 and 200
        const change = Math.floor(Math.random() * 400) - 200;
        return Math.min(Math.max(prevScore + change, 100), 5000);
      });
    }, 3000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <SafeAreaView className="flex-1">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <HeaderComponent text={"Profile"} />
        <View className="flex-row items-center px-4 my-2">
          <Pressable
            onPress={() => {
              router.back();
            }}
          >
            <Ionicons name="arrow-back" size={24} color="black" />
          </Pressable>
          <Text className="text-lg font-bold mx-auto">My Fuelme Score</Text>
        </View>

        <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
          {/* Pass the dynamic score to the speedometer component */}
          <ScoreSpeedometer score={100} maxScore={180} />
          <View className="mt-4">
            <Text className="font-bold text-lg text-center">
              Want to increase your score?
            </Text>
            <Text className="font-pregular text-sm text-center">
              Follow these instructions to increase your score!
            </Text>
            <Text className="font-pregular text-sm text-center">
              A higher score unlocks higher credit limits and improved terms
            </Text>
            <View className="flex-col gap-y-2 my-2">
              <View className="flex-row gap-x-2 items-center bg-white p-4 rounded-lg">
                <Image
                  source={icons.idea}
                  className="w-6 h-6"
                  resizeMode="contain"
                />
                <Text className="font-pregular text-sm text-center">
                  Complete Repayment on time
                </Text>
              </View>
              <View className="flex-row gap-x-2 items-center bg-white p-4 rounded-lg">
                <Image
                  source={icons.idea}
                  className="w-6 h-6"
                  resizeMode="contain"
                />
                <Text className="font-pregular text-sm text-center">
                Try not to exhaust all your credit limit
                </Text>
              </View>
            </View>
          </View>

          {/* Rest of your content */}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Score;
