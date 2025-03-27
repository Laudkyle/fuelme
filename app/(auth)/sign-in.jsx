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
import React, { useState, useEffect,useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/Formfield";
import { icons, images } from "../../constants";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Checkbox from "expo-checkbox";
import AuthContext from "../../AuthContext";
import * as SecureStore from "expo-secure-store";

const SignIn = () => {
  const navigation = useNavigation();
  const [form, setForm] = useState({ phone: "", pin: "", rememberMe: false });
  const { signIn, loading, error } = useContext(AuthContext);

  useEffect(() => {
    const checkLogin = async () => {
      const token = await SecureStore.getItemAsync("accessToken");
      
      if (token) {
        router.replace("Home"); // Redirect to H
        // home screen
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

  const handleLogin = () => {
    if (form.phone && form.pin) {
      signIn(form.phone, form.pin,form.rememberMe);
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
                onPress={() => router.push('/')}
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
              <Text className="text-white text-sm capitalize mt-2 text-center">
                Enter your phone number and pin to log in
              </Text>
            </View>

            {/* Lower Half - White Background */}
            <View className="flex-[0.75] bg-primary" />

            {/* Form Section */}
            <View className="absolute top-[30%] left-[10%] w-[80%] bg-white p-8 rounded-2xl shadow-lg">
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

                <TouchableOpacity onPress={() => router.push("/forgotPin")}>
                  <Text className="text-secondary font-pregular">
                    Forgot PIN?
                  </Text>
                </TouchableOpacity>
              </View>

              {error ? (
                <Text className="text-red-500 mt-2">{error}</Text>
              ) : null}

              <CustomButton title="Login" onPress={handleLogin} loading={loading} disabled={loading} />

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
