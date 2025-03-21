import { View, Text,TouchableOpacity,Image } from "react-native";
import { icons } from "../constants";
import React from "react";

const HomeHeader = ({ username }) => {
  return (
    <View className="px-4 justify-center rounded-2xl bg-primary">
      <View className="justify-between items-start flex-row mb-2 pl-4">
        <View className="justify-center flex-1 h-12">
          <Text className="text-lg font-pregular text-white">
            Good Morning {username}
          </Text>
        </View>
        <TouchableOpacity className="mt-1.5 w-9 h-9 bg-[#40444b] items-center justify-center rounded-full">
          <Image source={icons.menu} className="w-6 h-6" resizeMode="contain" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeHeader;
