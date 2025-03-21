import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import { icons, images } from "../constants";
import { useNavigation } from "@react-navigation/native";

const CompanyHeader = ({ header }) => {
  const navigation = useNavigation();

  return (
    <View className="relative bg-primary mb-2">
      <Pressable
        className="w-6 h-6 mt-2 justify-start items-start absolute"
        onPress={() => navigation.goBack()}
      >
        <Image source={icons.arrowleft} resizeMode="contain" />
      </Pressable>
      <View className="items-center justify-center">
        <Text className="text-center text-white text-xl mt-2 font-bold capitalize">
          {header}
        </Text>
      </View>
      <Pressable
        className="w-8 h-8 mt-2 right-2 rounded-full items-center justify-center bg-[#808080] absolute"
        onPress={() => {}}
      >
        <Image source={icons.menu} resizeMode="contain" />
      </Pressable>
    </View>
  );
};

export default CompanyHeader;
