import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import React from "react";

const CustomButton = ({
  title,
  onPress,
  text = "text-white",
  color = "bg-secondary",
  borderColor = "border-secondary", 
  loading = false,
  icon = null,
  disabled,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={loading ? null : onPress} 
      disabled={loading || disabled}
      className={`w-64 h-12 rounded-xl border mx-auto mt-3 ${color} ${borderColor} flex-row justify-center items-center ${
        loading ? "opacity-50" : ""
      }`}
    >
      {loading ? (
        <ActivityIndicator size="small" color="white" />
      ) : (
        <View className="flex-row items-center">
          {icon && <Image source={icon} className="w-6 h-6 text-white mr-1" />}
          <Text className={`text-sm ${text} capitalize`}>{title}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
