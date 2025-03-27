import { View, Text, Image, FlatList } from "react-native";
import React from "react";
import { images } from "../constants";
import { TouchableOpacity } from "react-native-gesture-handler";

const FuelStationSlider = ({ data,onStationPress }) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item._id}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 10 }}
      renderItem={({ item }) => (
        <TouchableOpacity 
        onPress={() => onStationPress(item)}
        className="bg-white rounded-lg flex-row items-center p-3 mr-4 shadow-sm">
          <Image source={images.camera} className="w-16 h-16 mr-3" />
          <View>
            <Text className="text-[#000] text-sm font-bold">{item.name}</Text>
            <Text className="text-[#000] text-xs font-pregular capitalize">{item.location}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default FuelStationSlider;
