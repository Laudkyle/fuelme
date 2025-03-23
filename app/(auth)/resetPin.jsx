import {
  View,
  Text,
  Image,
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/Formfield";
import { icons, images } from "../../constants";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Checkbox from "expo-checkbox";

const resetPin = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ phone: "", pin: "", rememberMe: false });

  const handleChange = (field, value) => {
    setForm((prevForm) => ({
      ...prevForm,
      [field]: value,
    }));
  };

  const handleReset = async () => {
    setLoading(true);
    setError("");

    if (!form.phone.trim()) {
      setError("Please enter your phone number.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "https://fuel-me.onrender.com/api/users/reset",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone: form.phone }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Reset failed.");
      }

      router.replace("resetPin");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1">
            {/* Upper Half - Purple Background */}
            <View className="flex-[0.25] bg-purple justify-center items-center px-6">
              <Pressable
                className="absolute left-5 top-6"
                onPress={() => navigation.goBack()}
              >
                <Image source={icons.back} resizeMode="contain" />
              </Pressable>

              <Image
                source={images.logoUp}
                resizeMode="contain"
                className="w-80 h-16"
              />
              <Text className="text-white text-3xl mt-4 font-semibold capitalize">
                Pin Reset
              </Text>
            </View>

            {/* Lower Half - White Background */}
            <View className="flex-[0.7] bg-primary" />

            {/* Form Section */}
            <View className="absolute top-[30%] left-[10%] w-[80%] bg-white p-8 rounded-2xl shadow-lg">
              <View className="flex-row items-center my-4">
                <View className="flex-1 h-[1px] bg-gray-300" />
                <Text className="mx-2 text-gray-500 font-semibold">
                  Reset your password
                </Text>
                <View className="flex-1 h-[1px] bg-gray-300" />
              </View>

              <FormField
                title="OTP"
                uppercaseLabel="true"
                name="phone"
                placeholder="Enter your phone number"
                value={form.phone}
                onTextChange={(text) => handleChange("phone", text)}
              />
              <FormField
                title="pin"
                name="pin"
                uppercaseLabel="true"
                placeholder="Enter your phone number"
                value={form.phone}
                secureTextEntry
                onTextChange={(text) => handleChange("phone", text)}
              />
             

              {error ? (
                <Text className="text-red-500 mt-2">{error}</Text>
              ) : null}

              <CustomButton
                title="Reset"
                onPress={handleReset}
                loading={loading}
                disabled={loading}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default resetPin;
