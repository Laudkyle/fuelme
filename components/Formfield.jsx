import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";

const FormField = ({
  uppercaseLabel = false, // Renamed 'case' to avoid reserved keyword issue
  title,
  placeholder,
  value,
  onTextChange,
  keyboardType = "default",
  leftIcon,
  otherStyle = "", // Ensure it does not break layout when undefined
  secureTextEntry = false, // Default to false for normal fields
  maxLength, // Fixed missing prop
}) => {
  const [showPin, setShowPin] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className={`w-full mt-2 ${otherStyle}`}>
      {/* Label */}
      <Text
        className={`text-black font-pregular text-md mb-1 ${
          uppercaseLabel ? "uppercase" : "capitalize"
        }`}
      >
        {title}
      </Text>

      {/* Input Container */}
      <View
        className={`rounded-2xl px-4 border w-full bg-white items-center flex-row ${
          isFocused ? "border-secondary-100" : "border-gray-200"
        }`}
      >
        {/* Left Icon */}
        {leftIcon && (
          <Image source={leftIcon} className="w-6 h-6 mr-3" resizeMode="contain" />
        )}

        {/* TextInput */}
        <TextInput
          onChangeText={onTextChange}
          value={value}
          maxLength={maxLength} // Now correctly passed
          placeholder={placeholder}
          keyboardType={keyboardType}
          className="flex-1 h-10 text-sm text-black bg-white"
          secureTextEntry={secureTextEntry && !showPin} // Toggle for password/PIN fields
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        {/* Eye Icon (Only for password or pin fields) */}
        {secureTextEntry && (
          <TouchableOpacity onPress={() => setShowPin(!showPin)}>
            <Image
              source={showPin ? icons.eye : icons.eyehide}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
