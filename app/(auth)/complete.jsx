import { View, Text, Image } from "react-native";
import React from "react";
import CustomButton from "../../components/CustomButton";
import { router } from "expo-router";
import { images } from "../../constants";

const Complete = ({ navigation }) => {
  return (
    <View className="flex-1 gap-y-4 items-center justify-center bg-white px-6">
      <Text className="text-xl font-bold text-green  mb-2">
        Registration Completed!
      </Text>
      <Text className="text-sm font-bold text-center text-black  mb-6">
        Your application is under review. You will receive a text message
        confirming the approval of your application details.
      </Text>

      {/* GIF Image */}
      <Image
        source={images.registration}
        className="w-64 h-64 mb-6"
        resizeMode="contain"
      />

      {/* Navigate to Home or Login */}
      <CustomButton
        title="Back to Login"
        onPress={() => router.push("/sign-in")}
      />
    </View>
  );
};

export default Complete;
