import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";

const FormFieldLabel = ({
  name,
  title,
  placeholder,
  value,
  onTextChange,
  leftIcon,
  otherStyle,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`mt-2 w-full ${otherStyle}`}>
      <Text className="text-white font-pregular text-lg mt-1 ml-2 capitalize">
        {title}
      </Text>

      {/* Input Container with Icon on Left */}
      <View className="bg-[#40444B] rounded-2xl px-4 border-2 items-center flex-row border-gray-800 focus:border-red-500">
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
          placeholderTextColor="#ffffff"
          className="flex-1 h-10 text-xl text-white"
          secureTextEntry={name === "Password" && !showPassword}
        />

        {/* Eye Icon for Password */}
        {name === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormFieldLabel;
