import { View, Text, Image } from "react-native";
import React, { useEffect } from "react";
import { images } from "../../../constants";
import { router } from "expo-router";

const Completed = () => {

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("Home"); // Redirect to Home after 3 seconds
    }, 3000);

    return () => clearTimeout(timer); 
  }, []);

  return (
    <View className="flex-1 gap-y-4 items-center justify-center bg-white px-6">
      <Text className="text-xl font-bold text-green-600 mb-2">
        Transaction Completed!
      </Text>

      {/* GIF Image */}
      <Image
        source={images.completed}
        className="w-64 h-64 mb-6"
        resizeMode="contain"
      />
    </View>
  );
};

export default Completed;
