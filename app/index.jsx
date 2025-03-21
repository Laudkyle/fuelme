import { View, Text, SafeAreaView, Image } from "react-native";
import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { images } from "../constants";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const index = () => {
  const router = useRouter();
  useEffect(() => {
    const checkLogin = async () => {
      const token = await AsyncStorage.getItem("userToken");
  
      setTimeout(() => {
        if (token) {
          router.replace("/Home"); 
        } else {
          router.replace("/onboarding");
        }
      }, 3000); 
    };
  
    checkLogin();
  }, []);
  


  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="flex-1 flex-row">
        {/* Main Splash Content */}
        <View className="w-full flex items-center justify-center px-4">
          <Image
            source={images.logoSplash}
            className="w-[300px] h-[200px]"
            resizeMode="contain"
          />
        </View>

        {/* Right Side Image (2/5 width, full height) */}
        <Image
          source={images.bgside} 
          className="w-3/5 h-full absolute right-0 top-0"
          resizeMode="cover"
        />
      </View>
      
      <StatusBar backgroundColor="#eee" style="light" />
    </SafeAreaView>
  );
};

export default index;
