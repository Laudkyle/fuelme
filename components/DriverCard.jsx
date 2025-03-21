import { View, Text, Image,TouchableOpacity } from "react-native";
import React from "react";

const DriverCard = ({ image, driver, timeDifference, percentage,handleOnPress }) => {
  // Function to get bar and text color based on percentage
  const getBarColor = (percentage) => {
    return percentage <= 30 ? "#f57d7d" : "#2C9043";
  };

  return (
    <TouchableOpacity
    activeOpacity={0.7}
    onPress={handleOnPress}
    className="rounded-lg p-2 flex-row mt-2 justify-start items-center bg-[#808080]">
      {/* Driver Image */}
      <View className="w-16 h-16 rounded-full overflow-hidden">
        <Image source={image} className="w-16 h-16 rounded-full" />
      </View>

      {/* Driver Details */}
      <View className="flex-col space-y-2 flex-1 px-4">
        <Text className="text-lg font-psemibold text-white">{driver}</Text>
        <View className="flex-row space-x-2 items-center">
          <Text
          className="font-pregular"
            style={{
              color: getBarColor(percentage),
              fontSize: 16,
              fontWeight: "400",
            }}
          >
            Near you
          </Text>
          <View className="w-2 h-2 bg-primary rounded-full"></View>
          <Text className="text-lg font-pregular text-white">
            {timeDifference} away from you
          </Text>
        </View>

        {/* Loading Bar */}
        <View className="w-full h-4 bg-white rounded-full mt-2">
          <View
            style={{
              width: `${percentage}%`,
              backgroundColor: getBarColor(percentage),
              height: "100%",
              borderRadius: 999,
            }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default DriverCard;
