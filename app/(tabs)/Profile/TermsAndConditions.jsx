import {
  View,
  Text,
  ScrollView,
  Platform,
  Pressable,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import HeaderComponent from "../../../components/HeaderComponent";
import { router } from "expo-router";

const TermsAndConditions = () => {
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <HeaderComponent text={"Profile"} />

        {/* Header */}
        <View className="flex-row px-6 items-center mt-4 mb-2">
          <Pressable onPress={() => router.back()} className="p-2">
            <Ionicons name="arrow-back" size={28} color="black" />
          </Pressable>
          <Text className="text-lg font-bold mx-auto">
            Terms and Conditions
          </Text>
        </View>

        {/* Content */}
        <ScrollView
          className="flex-1 px-6"
          showsVerticalScrollIndicator={false}
        >
          {/* Section 1: Introduction */}
          <View className="bg-white rounded-lg p-6 shadow-md mb-5">
            <Text className="text-xl font-semibold text-gray-800">
              1. Introduction
            </Text>
            <Text className="text-gray-600 mt-3 leading-relaxed">
              Welcome to FuelMe Loan Services. By using our platform, you agree
              to comply with these terms. FuelMe provides users with access to
              fuel loans, allowing them to refuel at designated partner stations
              on a credit basis. These loans must be repaid under the agreed
              conditions.
            </Text>
          </View>

          {/* Section 2: Eligibility & Registration */}
          <View className="bg-white rounded-lg p-6 shadow-md mb-5">
            <Text className="text-xl font-semibold text-gray-800">
              2. Eligibility & Registration
            </Text>
            <Text className="text-gray-600 mt-3 leading-relaxed">
              To qualify for a FuelMe loan, users must:
            </Text>
            <View className="mt-3">
              <Text className="text-gray-600">• Be at least 18 years old.</Text>
              <Text className="text-gray-600">
                • Have an active FuelMe account.
              </Text>
              <Text className="text-gray-600">
                • Provide a valid government-issued ID.
              </Text>
              <Text className="text-gray-600">
                • Have a verified mobile number linked to the account.
              </Text>
              <Text className="text-gray-600">
                • Maintain a history of timely repayments.
              </Text>
            </View>
          </View>

          {/* Section 3: Loan Terms & Credit Limits */}
          <View className="bg-white rounded-lg p-6 shadow-md mb-5">
            <Text className="text-xl font-semibold text-gray-800">
              3. Loan Terms & Credit Limits
            </Text>
            <Text className="text-gray-600 mt-3 leading-relaxed">
              Loan limits are assigned based on account activity and repayment
              history. Fuel loans must be repaid within the designated period to
              maintain eligibility. Continuous late repayments may lead to
              reduced credit limits or account suspension.
            </Text>
          </View>

          {/* Section 4: Repayment Process */}
          <View className="bg-white rounded-lg p-6 shadow-md mb-5">
            <Text className="text-xl font-semibold text-gray-800">
              4. Repayment Process
            </Text>
            <Text className="text-gray-600 mt-3 leading-relaxed">
              Repayments can be made through:
            </Text>
            <View className="mt-3">
              <Text className="text-gray-600">• Mobile Money Transfers</Text>
              <Text className="text-gray-600">• Bank Direct Deposits</Text>
              <Text className="text-gray-600">• Debit Card Payments</Text>
            </View>
            <Text className="text-gray-600 mt-3 leading-relaxed">
              Late repayments may result in additional fees, penalties, or
              restrictions on future fuel loan access.
            </Text>
          </View>

          {/* Section 5: Late Payments & Consequences */}
          <View className="bg-white rounded-lg p-6 shadow-md mb-5">
            <Text className="text-xl font-semibold text-gray-800">
              5. Late Payments & Consequences
            </Text>
            <Text className="text-gray-600 mt-3 leading-relaxed">
              If a user fails to make timely repayments, FuelMe reserves the
              right to:
            </Text>
            <View className="mt-3">
              <Text className="text-gray-600">• Apply penalty fees.</Text>
              <Text className="text-gray-600">
                • Reduce or revoke credit limits.
              </Text>
              <Text className="text-gray-600">
                • Report non-payment to credit bureaus.
              </Text>
              <Text className="text-gray-600">
                • Pursue legal action if necessary.
              </Text>
            </View>
          </View>

          {/* Section 6: Data Protection & Privacy */}
          <View className="bg-white rounded-lg p-6 shadow-md mb-5">
            <Text className="text-xl font-semibold text-gray-800">
              6. Data Protection & Privacy
            </Text>
            <Text className="text-gray-600 mt-3 leading-relaxed">
              We are committed to safeguarding your personal information. All
              data collected is stored securely and used strictly for loan
              assessment and processing purposes. FuelMe does not share user
              data with third parties without consent, except where required by
              law.
            </Text>
          </View>

          {/* Section 7: Amendments to Terms */}
          <View className="bg-white rounded-lg p-6 shadow-md mb-5">
            <Text className="text-xl font-semibold text-gray-800">
              7. Amendments to Terms
            </Text>
            <Text className="text-gray-600 mt-3 leading-relaxed">
              FuelMe reserves the right to update these terms at any time. Users
              will be notified of significant changes. Continued use of the
              service after an update implies acceptance of the revised terms.
            </Text>
          </View>

          {/* Section 8: Contact Information */}
          <View className="bg-white rounded-lg p-6 shadow-md mb-6">
            <Text className="text-xl font-semibold text-gray-800">
              8. Contact Information
            </Text>
            <Text className="text-gray-600 mt-3 leading-relaxed">
              If you have any questions about these terms, please contact us at:
            </Text>
            <Text className="text-gray-600 mt-2 font-semibold">
              Email: support@fuelme.com
            </Text>
            <Text className="text-gray-600 mt-1 font-semibold">
              Phone: 030 - 7786 -88908 / +233 546785064
            </Text>
          </View>
        </ScrollView>

        {/* Accept Button */}
        <View className="px-6 pb-6">
          <TouchableOpacity
            onPress={() => router.push("Profile")}
            className="bg-blue rounded-lg py-4 flex items-center"
          >
            <Text className="text-white font-semibold text-lg">
              Accept & Continue
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default TermsAndConditions;
