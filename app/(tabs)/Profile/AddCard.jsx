import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  StatusBar,
  Alert,
} from "react-native";
import React, { useState, useEffect,useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import DropDownPicker from "react-native-dropdown-picker";
import HeaderComponent from "../../../components/HeaderComponent";
import FormField from "../../../components/Formfield";
import { ScrollView } from "react-native-gesture-handler";
import CustomButton from "../../../components/CustomButton";
import api from "../../../api"; // Import API
import AuthContext from "../../../AuthContext";
const AddCard = () => {
  const [cardType, setCardType] = useState("momo"); // Default selection
  const [networkOpen, setNetworkOpen] = useState(false);
  const { user,profile } = useContext(AuthContext); 

  const [networkType, setNetworkType] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0); // Timer countdown
  const [loading, setLoading] = useState(false); // For submit button
  const [form, setForm] = useState({
    name: "",
    phone: "",
    otp: "",
    card_number: "",
    expiry_date: "",
    cvc: "",
  });

  const [networkOptions, setNetworkOptions] = useState([
    { label: "MTN", value: "MTN" },
    { label: "Telecel", value: "Telecel" },
    { label: "AirtelTigo", value: "AirtelTigo" },
  ]);

  // Handle input changes
  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  // Handle OTP sending
  const sendOTP = () => {
    if (form.phone.length === 10) {
      setOtpSent(true);
      setOtpTimer(60); // Start countdown
      Alert.alert("OTP Sent!", "Please check your phone for the OTP.");
    } else {
      Alert.alert("Error", "Enter a valid phone number!");
    }
  };

  // Countdown timer effect
  useEffect(() => {
    let timer;
    if (otpTimer > 0) {
      timer = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [otpTimer]);

  // **Submit Form**
  const handleSubmit = async () => {
    try {
      setLoading(true);

      let endpoint = cardType === "card" ? "/cards/create" : "/momo";
      let payload = {};

      if (cardType === "card") {
        // Validate card details
        if (!form.name || !form.card_number || !form.expiry_date || !form.cvc) {
          Alert.alert("Error", "Please fill in all card details.");
          setLoading(false);
          return;
        }

        payload = {
          user_uuid: profile.user_uuid, 
          name: form.name,
          phone_number:form.phone,
          card_number: form.card_number,
          expiry_date: form.expiry_date,
          cvc: form.cvc,
        };
      } else {
        // Validate mobile money details
        if (!form.name || !form.phone || !networkType || !form.otp) {
          Alert.alert("Error", "Please fill in all mobile money details.");
          setLoading(false);
          return;
        }

        payload = {
          user_uuid: profile.user_uuid, // Include user_uuid
          name: form.name,
          phone: form.phone,
          vendor: networkType,
        };
      }

      console.log("Submitting to:", endpoint);
      console.log("Payload:", payload);

      const response = await api.post(endpoint, payload);

      if (response.status === 201) {
        Alert.alert("Success", "Payment method added successfully!");
        router.back(); // Navigate back
      } else {
        Alert.alert("Error", "Failed to add payment method.");
      }
    } catch (error) {
      console.error("Submit Error:", error);
      Alert.alert("Error", "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <HeaderComponent text="Profile" />

      <View className="flex-row items-center px-4 my-2">
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </Pressable>
        <Text className="text-xl font-bold mx-auto">Add Payment Method</Text>
      </View>

      <ScrollView className="mt-2 p-4">
        <Text className="font-bold mb-2">Select Card Type</Text>

        {/* Mobile Money Option */}
        <TouchableOpacity
          className="flex-row items-center p-4 rounded-lg bg-white mb-2"
          onPress={() => setCardType("momo")}
        >
          <View
            className={`w-5 h-5 rounded-full border-2 ${
              cardType === "momo" ? "bg-blue-600" : "border-gray-400"
            } mr-2`}
          />
          <Text className="text-black">Mobile Money</Text>
        </TouchableOpacity>

        {/* Bank Card Option */}
        <TouchableOpacity
          className="flex-row items-center p-4 rounded-lg bg-white mb-2"
          onPress={() => setCardType("card")}
        >
          <View
            className={`w-5 h-5 rounded-full border-2 ${
              cardType === "card" ? "bg-blue-600" : "border-gray-400"
            } mr-2`}
          />
          <Text className="text-black">Card</Text>
        </TouchableOpacity>

        {cardType === "momo" ? (
          <View className="my-2">
            <Text className="my-2 text-black">Select Network Provider</Text>
            <DropDownPicker
              open={networkOpen}
              value={networkType}
              items={networkOptions}
              setOpen={setNetworkOpen}
              setValue={setNetworkType}
              setItems={setNetworkOptions}
              placeholder="Select Network Provider"
              containerStyle={{ marginBottom: 15 }}
            />

            {/* Mobile Money Fields */}
            <FormField
              title={"Name"}
              placeholder="Enter your name"
              value={form.name}
              onTextChange={(text) => handleChange("name", text)}
            />

            <FormField
              title={"Phone number"}
              placeholder="Enter phone number"
              keyboardType="phone-pad"
              maxLength={10}
              value={form.phone}
              onTextChange={(text) => handleChange("phone", text)}
            />

            {otpSent && (
              <FormField
                title={"OTP"}
                uppercaseLabel="true"
                placeholder="Enter OTP"
                keyboardType="numeric"
                maxLength={6}
                value={form.otp}
                onTextChange={(text) => handleChange("otp", text)}
              />
            )}

            {/* OTP Button */}
            <CustomButton
              title={otpTimer > 0 ? `Resend OTP in ${otpTimer}s` : "Send OTP"}
              color={otpTimer > 0 ? "bg-gray-300" : "bg-green-100"}
              onPress={sendOTP}
              disabled={otpTimer > 0}
            />
          </View>
        ) : (
          <View className="my-2">
            {/* Bank Card Fields */}
            <FormField
              title={"Name"}
              placeholder="Enter name on card"
              value={form.name}
              onTextChange={(text) => handleChange("name", text)}
            />

            <FormField
              title={"Card Number"}
              placeholder="Enter card number"
              keyboardType="numeric"
              maxLength={16}
              value={form.card_number}
              onTextChange={(text) => handleChange("card_number", text)}
            />

            <FormField
              title={"Expiry Date"}
              placeholder="MM/YY"
              value={form.expiry_date}
              onTextChange={(text) => handleChange("expiry_date", text)}
            />

            <FormField
              title={"CVC"}
              placeholder="CVC"
              secureTextEntry
              value={form.cvc}
              onTextChange={(text) => handleChange("cvc", text)}
            />
          </View>
        )}
      </ScrollView>

      {/* Submit Button */}
      <CustomButton title={"Done"} onPress={handleSubmit} loading={loading} />

      <StatusBar backgroundColor="#663AE8" style="dark" />
    </SafeAreaView>
  );
};

export default AddCard;
