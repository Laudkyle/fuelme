import { View, Text, Image } from "react-native";
import { images } from "../constants";

const VisaCard = ({ cardholder, cardNumber, expiry }) => {
  // Mask all but last 4 digits
  const maskedNumber = `**** **** **** ${cardNumber.slice(-4)}`;

  return (
    <View className="bg-white rounded-xl shadow-lg p-5 w-[90%] mx-auto mt-5">
      {/* Top Row - Chip & Visa Logo */}
      <View className="flex-row justify-end items-center mb-4">
        {/* Visa Logo */}
        <Image source={images.visa} className="w-12 h-8" resizeMode="contain" />
      </View>

      <View className="flex-row items-center gap-x-2 mb-3">
        {/* Chip Image */}
        <Image source={images.Chip} className="w-10 h-8" resizeMode="contain" />

        {/* Masked Card Number */}
        <Text className="text-xl font-bold tracking-widest">{maskedNumber}</Text>
      </View>

      {/* Cardholder & Expiry */}
      <View className="flex-row justify-between">
        <View>
          <Text className="text-xs text-gray-500">Cardholder</Text>
          <Text className="text-lg font-semibold">{cardholder}</Text>
        </View>
        <View>
          <Text className="text-xs text-gray-500">Expiry</Text>
          <Text className="text-lg font-semibold">{expiry}</Text>
        </View>
      </View>
    </View>
  );
};

export default VisaCard;
