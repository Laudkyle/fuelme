import {
    View,
    Text,
    Image,
    ScrollView,
    Platform,Pressable,
    TouchableOpacity,
    KeyboardAvoidingView,
  } from "react-native";
  import { SafeAreaView } from "react-native-safe-area-context";
  import { Ionicons } from "@expo/vector-icons";
  import HeaderComponent from "../../../components/HeaderComponent";
  import { images, icons } from "../../../constants";
  import { router } from "expo-router";
const Customer = () => {
  return (
    <SafeAreaView className="flex-1">
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <HeaderComponent text={"Profile"} />
      <View className="flex-row items-center px-4 my-2">
          <Pressable
            onPress={() => {
              router.back();
            }}
          >
            <Ionicons name="arrow-back" size={24} color="black" />
          </Pressable>
          <Text className="text-xl font-bold mx-auto">Customer Service</Text>
        </View>
      {/* Wrap content inside ScrollView */}
      <ScrollView 
        className="flex-1" 
        showsVerticalScrollIndicator={false}
      ></ScrollView></KeyboardAvoidingView></SafeAreaView>
  )
}

export default Customer;