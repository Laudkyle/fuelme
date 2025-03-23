import {
  View,
  Text,
  ScrollView,
  Platform,
  Pressable,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import HeaderComponent from "../../../components/HeaderComponent";
import { router } from "expo-router";

const CustomerService = () => {
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        {/* Header */}
        <HeaderComponent text="Profile" />
        
        {/* Back Button and Title */}
        <View className="flex-row items-center px-4 my-2">
          <Pressable onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </Pressable>
          <Text className="text-lg font-bold mx-auto">Customer Support</Text>
        </View>

        {/* Content */}
        <ScrollView
          className="flex-1 px-4"
          showsVerticalScrollIndicator={false}
        >
          {/* Support Message */}
          <View className="bg-white rounded-lg p-4 mb-4 shadow-sm">
            <Text className="text-lg font-bold mb-2">How Can We Help?</Text>
            <Text className="text-gray-700">
              Our team is here to assist you with any issues or inquiries.
            </Text>
          </View>

          {/* Frequently Asked Questions */}
          <View className="bg-white rounded-lg p-4 mb-4 shadow-sm">
            <Text className="text-lg font-bold mb-2">Frequently Asked Questions</Text>
            
            <View className="mb-3">
              <Text className="text-md font-semibold">1. How do I reset my PIN?</Text>
              <Text className="text-gray-700">
                Go to Profile → Security → Reset PIN. Follow the instructions to change your PIN securely.
              </Text>
            </View>

            <View className="mb-3">
              <Text className="text-md font-semibold">2. How can I track my fuel transactions?</Text>
              <Text className="text-gray-700">
                All transactions can be viewed under the "Transactions" tab in your dashboard.
              </Text>
            </View>

            <View>
              <Text className="text-md font-semibold">3. What should I do if my fuel loan is declined?</Text>
              <Text className="text-gray-700">
                Ensure you meet the eligibility criteria. Contact support for further assistance.
              </Text>
            </View>
          </View>

          {/* Contact Support */}
          <View className="bg-white rounded-lg p-4 mb-4 shadow-sm">
            <Text className="text-lg font-bold mb-2">Contact Support</Text>
            <Text className="text-gray-700">For further assistance, reach out to us:</Text>

            <View className="mt-3">
              <Text className="font-semibold">📧 Email:</Text>
              <Text className="text-gray-700">support@fuelme.com</Text>
            </View>

            <View className="mt-3">
              <Text className="font-semibold">📞 Phone:</Text>
              <Text className="text-gray-700">030 - 7786 -88908 / +233 546785064</Text>
            </View>

            <View className="mt-3">
              <Text className="font-semibold">💬 Live Chat:</Text>
              <Text className="text-gray-700">Available on the FuelMe app (8 AM - 6 PM)</Text>
            </View>
          </View>

          {/* Submit a Ticket */}
          <TouchableOpacity
            className="bg-blue-600 p-4 rounded-lg items-center shadow-sm mb-10"
            onPress={() => router.push("/support/ticket")}
          >
            <Text className="text-white font-bold text-lg">Submit a Ticket</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CustomerService;
