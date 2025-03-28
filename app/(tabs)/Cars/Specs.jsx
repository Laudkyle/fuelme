import {
  View,
  Text,
  Image,
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderComponent from "../../../components/HeaderComponent";
import CustomButton from "../../../components/CustomButton";
import { useLocalSearchParams } from "expo-router";

const Specs = () => {
  const { id, model, number, date, transmission, fuel, img } =
    useLocalSearchParams();

  return (
    <SafeAreaView className="flex-1">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <HeaderComponent text={"Specs"} />
        <View className="flex-row items-center px-4 mt-2">
          <Pressable onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </Pressable>
        </View>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          className="px-4 mt-2 rounded-lg bg-primary"
        >
          <View className="bg-white rounded-xl mb-2">
            <View className="flex items-center justify-center">
              <Image
                source={{ uri: img }}
                resizeMode="contain"
                className="w-64 h-48"
              />
            </View>
            <View className="p-2">
              <View className="flex-col justify-center">
                <View>
                  <Text className="text-sm mb-1 text-center font-bold capitalize">
                    {model}
                  </Text>
                  <Text className="text-xs font-bold text-center text-secondary-100 mb-2">
                    {number}
                  </Text>
                </View>
                <View className="p-4 bg-white rounded-2xl flex justify-between mt-4">
                  <View className="space-y-3">
                    <View className="flex-row justify-between pb-2">
                      <Text className="text-gray-600">Car Model</Text>
                      <Text className="font-semibold">{model}</Text>
                    </View>
                    <View className="flex-row justify-between pb-2">
                      <Text className="text-gray-600">Transmission</Text>
                      <Text className="font-semibold"> {transmission}</Text>
                    </View>
                    <View className="flex-row justify-between pb-2">
                      <Text className="text-gray-600">Car Number</Text>
                      <Text className="font-semibold">{number}</Text>
                    </View>
                    <View className="flex-row justify-between pb-2">
                      <Text className="text-gray-600 font-prej=gular">
                        Fuel Type
                      </Text>
                      <Text className="font-semibold">{fuel}</Text>
                    </View>
                    <View className="flex-row justify-between pb-2">
                      <Text className="text-gray-600 font-pregular">
                        Date Added
                      </Text>
                      <Text className="font-semibold">{date} </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
              <CustomButton title={'Refuel now'} onPress={()=>{
                router.push({
                    pathname:"Home/Refuel",
                    params:{id:id}
                })
              }} />
        </ScrollView>

        <StatusBar backgroundColor="#663AE8" style="light" />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Specs;
