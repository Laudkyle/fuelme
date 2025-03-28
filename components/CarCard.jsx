import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { icons } from "../constants";

const CarCard = ({ id,model, number, date, type, transmission, fuel, img, onPress }) => {
  return (
    <TouchableOpacity key={id} className="bg-white rounded-xl mb-2" onPress={onPress} > 
      <View className="flex items-center justify-center">
        <Image source={{uri:img}} resizeMode="contain" className="w-64 h-48" />
      </View>
      <View className="p-4">
        <View className="flex-row p-4 justify-between border-b border-b-gray-300">
          <View>
            <Text className="text-sm mb-1 font-bold capitalize">{model}</Text>
            <Text className="text-sm font-bold text-secondary-100">
               {number}
            </Text>
          </View>
          <View>
            <Text className="text-xs mb-1 font-pregular  capitalize ">
              date added
            </Text>
            <Text className="text-sm font-bold ">{date}</Text>
          </View>
        </View>
      </View>
      <View className="p-4 flex-row justify-between">
       

        <View className="flex-row px-4 items-center">
          <Image source={icons.transmission} className="w-6 h-6 mr-2" />
          <Text className="capitalize text-xs">{fuel}</Text>
        </View>
        <View className="flex-row px-4 items-center">
          <Image source={icons.automatic} className="w-6 h-6 mr-2" />
          <Text className="capitalize text-xs">{transmission}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CarCard;
