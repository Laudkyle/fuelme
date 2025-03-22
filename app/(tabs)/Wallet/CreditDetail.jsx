import { View, Text, Pressable } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import CustomButton from "../../../components/CustomButton";
import { icons } from "../../../constants";
import HeaderComponent from "../../../components/HeaderComponent";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

const CreditDetail = () => {
  const { id, amount, date } = useLocalSearchParams();

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <HeaderComponent text={"Credit Details"} />
      <View className="p-4 flex-1">
        <View className="flex-row items-center my-2">
          <Pressable onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </Pressable>
          <Text className="text-xl font-bold mx-auto">{id}</Text>
        </View>

        <View className="bg-white w-full my-2 rounded-2xl p-6">
          <Text className="text-red-500 text-3xl font-bold text-center">
            GHC
          </Text>
          <Text className="text-red-500 text-3xl font-bold text-center">
            {amount}
          </Text>
          <Text className="text-secondary-100 text-sm mt-4 text-center font-pregular">
            Due date:{" "}
            <Text className="text-secondary-100 font-bold">{date}</Text>
          </Text>

          <CustomButton
            icon={icons.cash}
            onPress={() => {
              router.push({
                pathname: "Wallet/CreditDetail",
                params: { id, amount, date },
              });
            }}
            title={"Pay Back"}
            color="bg-blue"
          />
        </View>

        <View className="p-6 rounded-2xl flex-1 justify-between mt-4">
          <View className="mt-6">
            <View className="flex-row items-center">
              <Text className="text-sm font-bold">Credit Details</Text>
              <View className="flex-1 h-[1px] bg-gray-300 ml-2" />
            </View>
          </View>
          <View className="space-y-3">
            <View className="flex-row justify-between border-b pb-2">
              <Text className="text-gray-600">Disbursement Date:</Text>
              <Text className="font-semibold">10/03/2025</Text>
            </View>
            <View className="flex-row justify-between border-b pb-2">
              <Text className="text-gray-600">Credit Amount:</Text>
              <Text className="font-semibold">GHC {amount}</Text>
            </View>
            <View className="flex-row justify-between border-b pb-2">
              <Text className="text-gray-600">Commitment Fee:</Text>
              <Text className="font-semibold">GHC 50.00</Text>
            </View>
            <View className="flex-row justify-between border-b pb-2">
              <Text className="text-gray-600">Financial Charge:</Text>
              <Text className="font-semibold">GHC 100.00</Text>
            </View>
            <View className="flex-row justify-between border-b pb-2">
              <Text className="text-gray-600">Daily Interest Rate:</Text>
              <Text className="font-semibold">0.5%</Text>
            </View>
            <View className="flex-row justify-between border-b pb-2">
              <Text className="text-gray-600">Total to be Paid:</Text>
              <Text className="font-semibold text-red-500">GHC 3,250.00</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CreditDetail;
