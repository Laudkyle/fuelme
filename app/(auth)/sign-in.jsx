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

const SignIn = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ phone: "", pin: "", rememberMe: false });
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  // Auto-login if token exists
  useEffect(() => {
    const checkLogin = async () => {
      const token = await AsyncStorage.getItem("userToken");
      if (token) {
        router.replace("Home"); // Redirect to Home screen
      }
    };
    checkLogin();
  }, []);

  const handleChange = (field, value) => {
    setForm((prevForm) => ({
      ...prevForm,
      [field]: value,
    }));
  };

  const login = async () => {
    setLoading(true);
    setError("");
  
    if (!form.phone || !form.pin) {
      setError("Please enter both phone number and PIN.");
      setLoading(false);
      return;
    }
  
    try {
      const response = await fetch(`https://fuel-me.onrender.com/api/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: form.phone, pin: form.pin }),
      });
  
      const data = await response.json();
      console.log(data)
      if (!response.ok) {
        console.log(response)
        throw new Error(data.message || "Login failed.");
      }
  
      try {
        if (form.rememberMe && data.accessToken) {
          await AsyncStorage.setItem("userToken", data.accessToken);
        } else {
          console.error("Access token is missing.");
        }
        
      } catch (err) {
        console.error("Error storing token:", err);
      }
  
      router.replace("Home");
  
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
            <View className="flex-[0.4] bg-purple justify-center items-center px-6">
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
                Login
              </Text>
              <Text className="text-white text-lg capitalize mt-2 text-center">
                Enter your phone number and pin to log in
              </Text>
            </View>

            {/* Lower Half - White Background */}
            <View className="flex-[0.6] bg-primary" />

            {/* Form Section */}
            <View className="absolute top-[40%] left-[10%] w-[80%] bg-white p-8 rounded-2xl shadow-lg">
              <View className="flex-row items-center my-4">
                <View className="flex-1 h-[1px] bg-gray-300" />
                <Text className="mx-2 text-gray-500 font-semibold">Login</Text>
                <View className="flex-1 h-[1px] bg-gray-300" />
              </View>

              <FormField
                title="Phone Number"
                name="phone"
                placeholder="Enter your phone number"
                value={form.phone}
                onTextChange={(text) => handleChange("phone", text)}
              />
              <FormField
                title="PIN"
                name="pin"
                placeholder="Enter your pin"
                secureTextEntry
                value={form.pin}
                onTextChange={(text) => handleChange("pin", text)}
              />

              {/* Remember Me & Forgot PIN */}
              <View className="flex-row justify-between items-center mt-2">
                <View className="flex-row items-center">
                  <Checkbox
                    value={form.rememberMe}
                    onValueChange={(value) => handleChange("rememberMe", value)}
                    color={form.rememberMe ? "#6B46C1" : undefined} // Purple when checked
                    className="mr-2"
                  />
                  <Text className="text-gray-500">Remember Me</Text>
                </View>

                <TouchableOpacity onPress={() => router.push("/forgot-pin")}>
                  <Text className="text-secondary font-pregular">
                    Forgot PIN?
                  </Text>
                </TouchableOpacity>
              </View>

              {error ? (
                <Text className="text-red-500 mt-2">{error}</Text>
              ) : null}

              <CustomButton title="Login" onPress={login} loading={loading} disabled={loading} />

              <View className="flex-row justify-center mt-4">
                <Text className="text-gray-500">Don't have an account? </Text>
                <Link href="/sign-up" className="text-secondary capitalize font-semibold">
                  Sign Up
                </Link>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

     
    </SafeAreaView>
  );
};

export default SignIn;
