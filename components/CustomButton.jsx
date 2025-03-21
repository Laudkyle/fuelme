import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";

const CustomButton = ({
  title,
  onPress,
  text = "text-white",
  color = "bg-secondary",
  loading = false, // New loading prop
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={loading ? null : onPress} // Disable clicks when loading
      disabled={loading}
      className={`w-64 h-12 rounded-xl border border-secondary mx-auto mt-3 ${color} justify-center items-center ${
        loading ? "opacity-50" : ""
      }`}
    >
      {loading ? (
        <ActivityIndicator size="small" color="white" />
      ) : (
        <Text className={`text-sm ${text} capitalize`}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
