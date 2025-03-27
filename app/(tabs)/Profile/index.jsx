import {
  View,
  Text,
  Image,
  ScrollView,
  Platform,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import HeaderComponent from "../../../components/HeaderComponent";
import { images, icons } from "../../../constants";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import AuthContext from "../../../AuthContext";
import * as SecureStore from "expo-secure-store";

const Profile = () => {
  const { user, profile, logout } = useContext(AuthContext);
  const handleLogout = async () => {
    try {
      // Retrieve and log current AsyncStorage contents before clearing
      const allKeys = await AsyncStorage.getAllKeys();
      const storageContents = await AsyncStorage.multiGet(allKeys);

      console.log("Storage before logout:", storageContents);

      // Clear stored authentication data
      await AsyncStorage.clear();
      await AsyncStorage.clear();
      await SecureStore.deleteItemAsync("accessToken");
      await SecureStore.deleteItemAsync("refreshToken");

      // Check if storage is cleared
      const keysAfterClear = await AsyncStorage.getAllKeys();
      console.log("Storage after logout (should be empty):", keysAfterClear);

      // Redirect to login screen
      router.replace("/sign-in"); // Ensures user cannot go back to the previous screen
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <HeaderComponent text={"Profile"} />

        {/* Wrap content inside ScrollView */}
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <View className="p-4">
            <View className="flex-col justify-center space-y-1 items-center p-4">
              {profile.personal_image ? (
                <Image
                  source={{ uri: profile.personal_image }}
                  resizeMode="cover"
                  className="w-24 h-24 rounded-full"
                />
              ) : (
                <Image
                  source={images.profile}
                  resizeMode="contain"
                  className="w-24 h-24"
                />
              )}
              <Text className="font-bold text-xl">{profile.name}</Text>
              <Text className="font-medium"> {user.phone}</Text>
              <Text className="font-pregular text-sm"> {profile.email}</Text>
            </View>

            <View className="flex-row items-center mb-2">
              <Text className="text-sm font-bold text-black">Account</Text>
              <View className="flex-1 h-[1px] bg-gray-300 ml-2" />
            </View>

            <View className="flex-col space-y-2">
              <TouchableOpacity className="bg-white p-4 rounded-lg flex-row justify-between">
                <View className="flex-row gap-x-2">
                  <Image source={icons.idCard} className="w-6 h-6" />
                  <Text className="text-black font-pregular">My Unique Id</Text>
                </View>
                <Text className="text-black font-pregular">
                  {user?._id?.slice(-10)}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  router.push("Profile/Payment");
                }}
                className="bg-white p-4 rounded-lg flex-row justify-between"
              >
                <View className="flex-row gap-x-2">
                  <Image source={icons.payment} className="w-6 h-6" />
                  <Text className="text-black font-pregular">
                    Payment Methods
                  </Text>
                </View>
                <Ionicons name="arrow-forward" size={20} color="#333" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  router.push("Profile/Score");
                }}
                className="bg-white p-4 rounded-lg flex-row justify-between"
              >
                <View className="flex-row gap-x-2">
                  <Image source={icons.medium} className="w-6 h-6" />
                  <Text className="text-black font-pregular">Fuelme Score</Text>
                </View>
                <Ionicons name="arrow-forward" size={20} color="#333" />
              </TouchableOpacity>
            </View>

            <View className="flex-row items-center mt-4">
              <Text className="text-sm font-bold text-black">About Us</Text>
              <View className="flex-1 h-[1px] bg-gray-300 ml-2" />
            </View>

            <View className="flex-col space-y-2">
              <TouchableOpacity
                onPress={() => {
                  router.push("Profile/CustomerService");
                }}
                className="bg-white p-4 rounded-lg flex-row justify-between"
              >
                <View className="flex-row gap-x-2">
                  <Image source={icons.cusomterService} className="w-6 h-6" />
                  <Text className="text-black font-pregular">
                    Customer Service
                  </Text>
                </View>
                <Ionicons name="arrow-forward" size={20} color="#333" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  router.push("Profile/Privacy");
                }}
                className="bg-white p-4 rounded-lg flex-row justify-between"
              >
                <View className="flex-row gap-x-2">
                  <Image source={icons.secured} className="w-6 h-6" />
                  <Text className="text-black font-pregular">
                    Privacy Policy
                  </Text>
                </View>
                <Ionicons name="arrow-forward" size={20} color="#333" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  router.push("Profile/TermsAndConditions");
                }}
                className="bg-white p-4 rounded-lg flex-row justify-between"
              >
                <View className="flex-row gap-x-2">
                  <Image source={icons.terms} className="w-6 h-6" />
                  <Text className="text-black font-pregular">
                    Terms and Conditions
                  </Text>
                </View>
                <Ionicons name="arrow-forward" size={20} color="#333" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleLogout()}
                className="bg-white p-4 rounded-lg flex-row justify-between"
              >
                <View className="flex-row gap-x-2">
                  <Image source={icons.logout} className="w-6 h-6" />
                  <Text className="text-black font-pregular">Logout</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity className="bg-white p-4 rounded-lg flex-row justify-between">
                <View className="flex-row gap-x-2">
                  <Image source={icons.del} className="w-6 h-6" />
                  <Text className="text-black font-pregular">
                    Delete Account
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <StatusBar style="light" backgroundColor="#663AE8" />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Profile;
