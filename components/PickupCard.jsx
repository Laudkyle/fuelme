import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";

const PickupCard = ({
  image,
  name,
  location,
  date,
  time,
  price,
  status,
  onPress, // Added onPress prop
}) => {
  // Determine status color dynamically
  const getStatusColor = () => {
    if (status === "completed" || status === "accepted") {
      return "text-green-100";
    } else if (status === "pending" || status === "ongoing") {
      return "text-[#f2a78c]";
    } else {
      return "text-red-600";
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress} // Attach the onPress logic
      className="border-[0.5px] flex-row justify-between p-2 items-center bg-[#40444b]"
    >
      <Image
        source={image}
        className="w-20 h-20 rounded-lg mx-2"
        resizeMode="contain"
      />
      <View className="flex-col justify-start mx-2 flex-1 items-start space-y-2">
        <Text className="text-white font-pmedium text-lg">{name}</Text>
        <Text className="text-white">{location}</Text>
        <Text className="font-pregular text-white text-sm">
          {date} : {time}
        </Text>
      </View>
      <View className="flex-col justify-center items-center">
        <Text className="text-white font-psemibold text-lg">GH₵ {price}</Text>
        <Text className={`font-pregular ${getStatusColor()}`}>{status}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default PickupCard;
