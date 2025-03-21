import { View, Text, FlatList, Image } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import waterCompanies from "./data";

const VerticalCard = () => {
  return (
    <FlatList
      className="p-2 bg-[#1d1d1d]"
      data={waterCompanies ?? []}
      numColumns={2} 
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          key={item.id}
          activeOpacity={0.7}
          className="flex-1 rounded-2xl h-48 m-2 overflow-hidden border border-[#303030]"
        >
          <View className="relative h-full">
            <Image
              source={{ uri: item.image }} 
              className="h-[70%] w-full"
              resizeMode="cover"
            />
            <View className="bg-[#303030] h-[30%] w-full px-2 relative">
              <Text className="text-white font-pmedium text-md absolute bottom-2 left-2">
                {item.name}
              </Text>
            </View>
            <View className="w-12 h-12 absolute border-[#303030] bottom-10 left-2 border-2 overflow-hidden">
              <Image
                source={item.logo} 
                resizeMode="cover"
                className="w-full h-full"
              />
            </View>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default VerticalCard;
