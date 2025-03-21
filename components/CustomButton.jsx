import { View, Text, TouchableOpacity, ActivityIndicator, Image } from "react-native";
import React from "react";

const CustomButton = ({
  title,
  onPress,
  text = "text-white",
  color = "bg-secondary",
  loading = false, // Loading prop
  icon = null, // Icon prop (optional)
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={loading ? null : onPress} // Disable clicks when loading
      disabled={loading}
      className={`w-64 h-12 rounded-xl border border-secondary mx-auto mt-3 ${color} flex-row justify-center items-center ${
        loading ? "opacity-50" : ""
      }`}
    >
      {loading ? (
        <ActivityIndicator size="small" color="white" />
      ) : (
        <View className="flex-row items-center">
          {icon && <Image source={icon} className="w-6 h-6" />} 
          <Text className={`text-sm ${text} capitalize`}>{title}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
