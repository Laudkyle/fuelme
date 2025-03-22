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
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import HeaderComponent from "../../../components/HeaderComponent";
import CreditCard from "../../../components/CreditCard";
import { icons } from "../../../constants";

const Wallet = () => {
  const [viewAll, setViewAll] = useState(false);
  const transactions = [
    { id: 1, number: "#980901", date: "23/03/2025", amount: "Ghc 400", status: "Paid Off" },
    { id: 2, number: "#980902", date: "22/03/2025", amount: "Ghc 250", status: "Pending" },
    { id: 3, number: "#980903", date: "21/03/2025", amount: "Ghc 600", status: "Paid Off" },
    { id: 4, number: "#980904", date: "20/03/2025", amount: "Ghc 150", status: "Paid Off" },
    { id: 5, number: "#980905", date: "19/03/2025", amount: "Ghc 320", status: "Pending" },
  ];

  // Filter only pending transactions for CreditCard
  const pendingTransactions = transactions.filter((t) => t.status === "Pending");

  return (
    <SafeAreaView className="flex-1">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <HeaderComponent text={viewAll ? "Transaction History" : "Credit"} />
        <View className="p-2 bg-primary flex-1">
          {!viewAll && (
            <ScrollView
              contentContainerStyle={{ flexGrow: 1 }}
              keyboardShouldPersistTaps="handled"
              className="p-4 w-full h-[45vh]"
            >
              {pendingTransactions.map((item) => (
                <CreditCard key={item.id} id={item.number} amount={item.amount} date={item.date} />
              ))}
            </ScrollView>
          )}

          <View className="bg-white p-4 rounded-lg shadow-md mt-4 flex-1">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-lg font-semibold">Recent History</Text>
              <TouchableOpacity onPress={() => setViewAll(!viewAll)}>
                <Text className="text-black font-semibold">
                  {viewAll ? "Close" : "View All"}
                </Text>
              </TouchableOpacity>
            </View>

            <ScrollView>
              {(viewAll ? transactions : [transactions[0]]).map((item) => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => {
                    router.push({
                      pathname: "Wallet/CreditDetail",
                      params: { id: item.number, amount: item.amount, date: item.date },
                    });
                  }}
                  className="flex-row justify-between items-center bg-gray-100 p-3 rounded-lg mb-2"
                >
                  <View className="flex-row items-center">
                    <Image source={icons.receipt} className="w-6 h-6 mr-2" />
                    <View>
                      <Text className="font-medium">{item.number}</Text>
                      <Text className="text-gray-500 text-sm">{item.date}</Text>
                    </View>
                  </View>
                  <View className="items-end">
                    <Text className={`font-medium ${item.status === "Paid Off" ? "text-green-600" : "text-orange-500"}`}>
                      {item.amount}
                    </Text>
                    <Text className="text-gray-500 text-sm">{item.status}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <StatusBar backgroundColor="#663AE8" style="light" />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Wallet;
