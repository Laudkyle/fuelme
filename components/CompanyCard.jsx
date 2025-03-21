import { View, Text, Image } from "react-native";
import React from "react";
import { icons } from "../constants";
import { TouchableOpacity } from "react-native";

const CompanyCard = ({ image, name, availability,onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}  className="border-[0.5px] flex-row justify-between p-2 items-center bg-[#40444b]">
      <Image
        source={image}
        className="w-20 h-20 rounded-lg mx-2"
        resizeMode="contain"
      />
      <View className="flex-col justify-start mx-2 flex-1 items-start space-y-2">
        <Text className="text-white font-pmedium text-lg">{name}</Text>
        <Text className="text-green-100">
          {availability < 1 ? "Finished" : "Available"}
        </Text>
        <Text className="text-white text-sm">
          <Text className="font-psemibold">{availability < 1 ? "No" : availability}</Text> cars available
        </Text>
      </View>
      <View className="flex-col justify-center items-center">
        <Image source={icons.order} resizeMode="contain" className="w-6 h-6" />
        <Text className="text-white font-pregular">order now</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CompanyCard;
