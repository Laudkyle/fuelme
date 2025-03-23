import { View, Text, Image } from "react-native";
import React,{useEffect} from "react";
import CustomButton from "../../../components/CustomButton";
import { router } from "expo-router";
import { images } from "../../../constants";

const RepaymentCompleted = () => {
   useEffect(() => {
      const timer = setTimeout(() => {
        router.push("Wallet"); 
      }, 3000);
  
      return () => clearTimeout(timer); 
    }, []);
  return (
    <View className="flex-1 gap-y-4 items-center justify-center bg-white px-6">
      <Text className="text-xl font-bold text-purple  mb-2">
        Awaiting Confirmation
      </Text>
      <Text className="text-sm font-bold text-center text-black mb-6">
      You will receive a prompt to enter your Mobile money PIN
      </Text>

      {/* GIF Image */}
      <Image
        source={images.transaction}
        className="w-64 h-64 mb-6"
        resizeMode="contain"
      />

      {/* Navigate to Home or Login */}
      <CustomButton
        title="Payment Completed"
        color="bg-green-100"
        onPress={()=>{
          router.push("Wallet");
        }}
      />
    </View>
  );
};

export default RepaymentCompleted;
