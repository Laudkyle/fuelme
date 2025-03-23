import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableOpacity,
  StatusBar,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { images } from "../../../constants";

const Repayment = () => {
  const [paymentOption, setPaymentOption] = useState("full");
  const [customAmount, setCustomAmount] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { id, amount, date } = useLocalSearchParams();

  return (
    <SafeAreaView className="flex-1">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="p-4">
          {/* Header */}
          <View className="flex-row items-center my-2">
            <Pressable onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color="black" />
            </Pressable>
            <Text className="text-xl font-bold mx-auto">Repayment</Text>
          </View>
        </View>

        {/* Body */}
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          className="p-4 bg-primary"
        >
          <View>
            <Text className="font-bold mb-2 text-sm">
              How much are you willing to repay?
            </Text>
            <Text className="text-black mb-2 text-xs">
              Remember to complete the repayment by the due date to maintain a
              good refueling score.
            </Text>
          </View>

          {/* Payment Options */}
          <View className="mt-4">
            {/* Full Payment Option */}
            <TouchableOpacity
              className="flex-row justify-between items-center p-4 rounded-lg bg-white mb-2"
              onPress={() => setPaymentOption("full")}
            >
              <View className="flex-row">
                <View
                  className={`w-5 h-5 rounded-full border-2 ${
                    paymentOption === "full" ? "bg-blue-600" : "border-gray-400"
                  } mr-2`}
                />
                <Text className="text-black font-pregular">Full Payment</Text>
              </View>
              <Text className="text-black font-bold">Ghc 1,000</Text>
            </TouchableOpacity>

            {/* Custom Payment Option */}
            <TouchableOpacity
              className="flex-row items-center p-4 rounded-lg bg-white mb-2"
              onPress={() => setPaymentOption("custom")}
            >
              <View
                className={`w-5 h-5 rounded-full border-2 ${
                  paymentOption === "custom" ? "bg-blue-600" : "border-gray-400"
                } mr-2`}
              />
              <Text className="text-black font-pregular">Custom </Text>
            </TouchableOpacity>

            {/* Show Input Field if "Custom Payment" is Selected */}
            {paymentOption === "custom" && (
              <TextInput
                className="flex-row items-center p-4 rounded-lg bg-white mb-2"
                placeholder="Enter amount (Ghc)"
                keyboardType="numeric"
                value={customAmount}
                onChangeText={setCustomAmount}
              />
            )}
          </View>

          {/* Payment Summary */}
          <View className="p-4 bg-white rounded-2xl flex justify-between mt-4">
            <View className="space-y-3">
              <View className="flex-row justify-between pb-2">
                <Text className="text-gray-600">Repayment Amount</Text>
                <Text className="font-semibold">GHC 250.00</Text>
              </View>
              <View className="flex-row justify-between pb-2">
                <Text className="text-gray-600">Total Paid</Text>
                <Text className="font-semibold">GHC {amount}</Text>
              </View>
              <View className="flex-row justify-between pb-2">
                <Text className="text-gray-600">Repayment Date</Text>
                <Text className="font-semibold">03/07/2025</Text>
              </View>
              <View className="flex-row justify-between pb-2">
                <Text className="text-gray-600 font-bold">
                  Total Amount Due
                </Text>
                <Text className="font-semibold">GHC 3,250.00</Text>
              </View>
            </View>
          </View>

          {/* Confirm Button */}
          <TouchableOpacity
            className="mt-6 bg-blue-600 p-3 rounded-lg items-center"
            onPress={() => setShowModal(true)}
          >
            <Text className="text-white font-bold">Confirm Repayment</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Payment Modal */}
        <Modal
          transparent
          animationType="slide"
          visible={showModal}
          onRequestClose={() => setShowModal(false)}
        >
          <TouchableWithoutFeedback onPress={() => setShowModal(false)}>
            <View className="flex-1 justify-end bg-black/50">
              <View className="bg-white px-6 py-2 rounded-t-2xl max-h-[350px] h-[40%]">
                <Text className="text-center text-black text-sm font-bold mb-2">
                  Select Account
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    console.log("Airteltigo");
                  }}
                  className="p-4 flex-row gap-x-4 items-center bg-white border border-gray-300 rounded-lg mb-2"
                >
                  <Image
                    className="w-16 h-12"
                    resizeMode="contain"
                    source={images.airteltigo}
                  />
                  <Text className="text-black font-bold">
                    Airtel Tigo Money
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    console.log("MTN");
                    router.push('Wallet/RepaymentCompleted')
                  }}
                  className="p-4 flex-row gap-x-4 items-center bg-white border border-gray-300 rounded-lg mb-2"
                >
                  <Image
                    className="w-16 h-12"
                    resizeMode="contain"
                    source={images.mtn}
                  />
                  <Text className="text-black font-bold">MTN Mobile Money</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    console.log("Telecel");
                  }}
                  className="p-4 flex-row gap-x-4 items-center bg-white border border-gray-300 rounded-lg mb-2"
                >
                  <Image
                    className="w-16 h-12"
                    resizeMode="contain"
                    source={images.telecel}
                  />
                  <Text className="text-black font-bold">Telecel Cash</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        <StatusBar backgroundColor="#fff" style="dark" />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Repayment;
