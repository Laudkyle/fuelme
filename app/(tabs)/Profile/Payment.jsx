import {
  View,
  Text,
  Image,
  ScrollView,
  Platform,
  TouchableOpacity,
  Pressable,
  KeyboardAvoidingView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import HeaderComponent from "../../../components/HeaderComponent";
import CustomButton from "../../../components/CustomButton";
import { images, icons } from "../../../constants";
import { router } from "expo-router";
import VisaCard from "../../../components/VisaCard";
import MomoCard from "../../../components/MomoCard";
const Payment = () => {
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
          <Text className="text-lg font-bold mx-auto">Payment Methods</Text>
        </View>
        <CustomButton
          title={"add new"}
          icon={icons.add}
          onPress={() => {
            router.push("Profile/AddCard");
          }}
        />
        {/* Wrap content inside ScrollView */}
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <VisaCard
            cardholder="Kwame Boateng"
            cardNumber="4567123412345678"
            expiry="08/27"
          />
          <MomoCard />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Payment;
