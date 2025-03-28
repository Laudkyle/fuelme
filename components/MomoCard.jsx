import { View, Text, Image } from "react-native";
import { images } from "../constants";

const MomoCard = ({ name = "John Doe", phoneNumber = "0543123456", vendor = "MTN" }) => {
  // Mask phone number except for the last 4 digits
  const maskedNumber = `${phoneNumber.slice(0,3)} *** ${phoneNumber.slice(-4)}`;

  // Select the correct image based on the vendor
  const vendorLogos = {
    MTN: images.mtn,
    Telecel: images.telecel,
    AirtelTigo: images.airteltigo,
  };

  return (
    <View className="bg-white rounded-xl shadow-lg p-5 w-[90%] mx-auto mt-5 items-center">
      {/* Cardholder Name */}
      <Text className="text-lg font-semibold text-gray-700">{name}</Text>

      {/* Masked Phone Number */}
      <Text className="text-xl font-semibold tracking-widest my-2">
        {maskedNumber}
      </Text>

      {/* Mobile Money Logo */}
      <Image source={vendorLogos[vendor] || images.default} className="w-16 h-16" resizeMode="contain" />
    </View>
  );
};

export default MomoCard;
