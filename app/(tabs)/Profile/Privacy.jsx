import {
  View,
  Text,
  ScrollView,
  Platform,
  Pressable,
  KeyboardAvoidingView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import HeaderComponent from "../../../components/HeaderComponent";
import { router } from "expo-router";

const Privacy = () => {
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <HeaderComponent text="Profile" />

        {/* Back Button and Title */}
        <View className="flex-row items-center px-4 my-2">
          <Pressable onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </Pressable>
          <Text className="text-lg font-bold mx-auto">Privacy Policy</Text>
        </View>

        {/* Content */}
        <ScrollView
          className="flex-1 px-4"
          showsVerticalScrollIndicator={false}
        >
          <View className="bg-white rounded-lg p-4 mb-4 shadow-sm">
            <Text className="text-lg font-bold mb-2">Your Privacy Matters</Text>
            <Text className="text-gray-700">
              At FuelMe, we are committed to protecting your privacy. This
              Privacy Policy outlines how we collect, use, and safeguard your
              personal information.
            </Text>
          </View>

          {/* Section: Information Collection */}
          <View className="bg-white rounded-lg p-4 mb-4 shadow-sm">
            <Text className="text-lg font-bold mb-2">
              1. Information We Collect
            </Text>
            <Text className="text-gray-700">
              We collect personal information that you provide when registering,
              including:
            </Text>
            <Text className="text-gray-700 mt-2">
              - <Text className="font-bold">Personal Details:</Text> Name, email, phone number.{"\n"}
              - <Text className="font-bold">Identity Verification:</Text> Ghana Card, staff ID (if applicable).{"\n"}
              - <Text className="font-bold">Usage Data:</Text> App interactions and preferences.{"\n"}
              - <Text className="font-bold">Payment Details:</Text> Linked payment methods for fuel credit transactions.
            </Text>
          </View>

          {/* Section: How We Use Your Information */}
          <View className="bg-white rounded-lg p-4 mb-4 shadow-sm">
            <Text className="text-lg font-bold mb-2">
              2. How We Use Your Information
            </Text>
            <Text className="text-gray-700">
              The collected data helps us provide and improve our services,
              including:
            </Text>
            <Text className="text-gray-700 mt-2">
              - <Text className="font-bold">Processing Transactions:</Text> Managing your fuel loan applications.{"\n"}
              - <Text className="font-bold">Customer Support:</Text> Assisting you with any issues.{"\n"}
              - <Text className="font-bold">Security Measures:</Text> Preventing fraud and ensuring compliance.{"\n"}
              - <Text className="font-bold">Marketing & Personalization:</Text> Recommending offers based on usage.
            </Text>
          </View>

          {/* Section: Data Protection */}
          <View className="bg-white rounded-lg p-4 mb-4 shadow-sm">
            <Text className="text-lg font-bold mb-2">
              3. Data Security & Protection
            </Text>
            <Text className="text-gray-700">
              We implement security measures to safeguard your personal
              information. However, you should also take precautions, such as
              keeping your login credentials secure.
            </Text>
          </View>

          {/* Section: Third-Party Sharing */}
          <View className="bg-white rounded-lg p-4 mb-4 shadow-sm">
            <Text className="text-lg font-bold mb-2">
              4. Sharing Your Information
            </Text>
            <Text className="text-gray-700">
              We do not sell or rent your data. However, we may share
              information with:
            </Text>
            <Text className="text-gray-700 mt-2">
              - <Text className="font-bold">Payment Providers:</Text> For processing payments securely.{"\n"}
              - <Text className="font-bold">Regulatory Authorities:</Text> If required by law.{"\n"}
              - <Text className="font-bold">Service Partners:</Text> To enhance app functionality.
            </Text>
          </View>

          {/* Section: Your Rights */}
          <View className="bg-white rounded-lg p-4 mb-4 shadow-sm">
            <Text className="text-lg font-bold mb-2">
              5. Your Rights & Choices
            </Text>
            <Text className="text-gray-700">
              You have control over your data. You can:
            </Text>
            <Text className="text-gray-700 mt-2">
              - <Text className="font-bold">Update Your Information:</Text> Edit your profile at any time.{"\n"}
              - <Text className="font-bold">Request Data Deletion:</Text> Contact us to delete your account.{"\n"}
              - <Text className="font-bold">Opt-Out of Marketing:</Text> Unsubscribe from promotional messages.
            </Text>
          </View>

          {/* Section: Updates */}
          <View className="bg-white rounded-lg p-4 mb-4 shadow-sm">
            <Text className="text-lg font-bold mb-2">6. Policy Updates</Text>
            <Text className="text-gray-700">
              This Privacy Policy may be updated periodically. We encourage you
              to review it regularly.
            </Text>
          </View>

          {/* Section: Contact */}
          <View className="bg-white rounded-lg p-4 mb-10 shadow-sm">
            <Text className="text-lg font-bold mb-2">7. Contact Us</Text>
            <Text className="text-gray-700">
              If you have questions or concerns, contact us at:
            </Text>
            <Text className="text-gray-700 font-bold mt-2">
              support@fuelme.com
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Privacy;
