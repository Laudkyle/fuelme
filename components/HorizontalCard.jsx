import { View, Text, FlatList, Image } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import waterCompanies from "./data";
import { router } from "expo-router";

const HorizontalCard = ({setShowDeliveries}) => {
  return (
    <>
      <FlatList
        className="p-2 mr-2 bg-[#1d1d1d]"
        data={waterCompanies ?? []}
        keyExtractor={(item) => {
          item.id;
        }}
        renderItem={({ item }) => (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.7}
            className="rounded-2xl h-full w-48 border mx-2 overflow-hidden"
          >
            <View className="relative ">
              <Image
                source={item.logo}
                className="border h-[70%] w-full"
                resizeMode="cover"
              />
              <View className="bg-[#303030] h-[30%] w-full px-2 relative">
                <Text className="text-white font-pmedium text-md  absolute bottom-2 left-2">
                  {item.name}
                </Text>
              </View>
              <View className="w-16 h-16 absolute border-[#303030]  bottom-[20%] left-2 border-2 rounded-md overflow-hidden ">
                <Image
                  source={item.logo}
                  resizeMode="cover"
                  className="w-full h-full"
                />
              </View>
            </View>
          </TouchableOpacity>
        )}
        horizontal
      />
      <View className="px-4 my-1 w-full flex-row justify-between">
        <Text className="text-white text-lg">Order for instant Delivery</Text>
        <TouchableOpacity
          onPress={() => {
            setShowDeliveries(true);
          }}
        >
          <Text className="text-white text-lg">View all</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default HorizontalCard;
