import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";

const FormField = ({
  name,
  title,
  placeholder,
  value,
  onTextChange,
  keyboardType,
  leftIcon,
  otherStyle,
  secureTextEntry, // Now can be passed dynamically
}) => {
  const [showPin, setShowPin] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className={`w-full mt-2 ${otherStyle}`}>
      {/* Label */}
      <Text className="text-black font-pregular text-md capitalize mb-1">
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
          <Image
            source={leftIcon}
            className="w-6 h-6 mr-3"
            resizeMode="contain"
          />
        )}

        {/* TextInput */}
        <TextInput
          onChangeText={onTextChange}
          value={value}
          placeholder={placeholder}
          keyboardType={keyboardType}
          className="flex-1 h-10 text-sm text-black bg-white"
          secureTextEntry={secureTextEntry && !showPin} // Now it can be used for passwords, pins, etc.
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        {/* Eye Icon (Only for password or pin fields) */}
        {secureTextEntry && (
          <TouchableOpacity onPress={() => setShowPin(!showPin)}>
            <Image
              source={showPin ? icons.eye : icons.eyehide} // Fixed toggle logic
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
