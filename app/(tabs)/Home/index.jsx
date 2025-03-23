import { View, Text, Image, FlatList } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons, images } from "../../../constants";
import CustomButton from "../../../components/CustomButton";
import FuelStationSlider from "../../../components/FuelStationSlider";
import RefuelingHistoryChart from "../../../components/RefuelingHistoryChart";
import { ScrollView } from "react-native-gesture-handler";
import { router, useNavigation } from "expo-router";
useNavigation;
// Function to get appropriate greeting
const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning!";
  if (hour < 18) return "Good Afternoon!";
  return "Good Evening!";
};
// Sample filling stations
const stations = [
  { id: "1", name: "Goiling Filling Station", location: "Darkuan Junction", latitude: 5.6037, longitude: -0.1870 },
  { id: "2", name: "Shell Fuel Station", location: "Main Street", latitude: 5.5600, longitude: -0.2057 },
  { id: "3", name: "Total Energies", location: "Market Road", latitude: 5.5900, longitude: -0.2200 },
  { id: "4", name: "Allied Oil", location: "East Legon", latitude: 5.6500, longitude: -0.1700 },
];

const Home = () => {
  return (
    <SafeAreaView className="py-2 px-6 h-screen">
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 60 }}
      >
        <View className="flex-row justify-between items-center mb-2">
          {/* Logo */}
          <Image source={images.logoUp} className="w-12 h-12" />

          {/* Greeting and User Name */}
          <View className="items-center">
            <Text className="text-center font-pregular text-sm">
              {getGreeting()}
            </Text>
            <Text className="text-center font-bold text-xl">User Name</Text>
          </View>

          {/* Notification Icon */}
          <Image source={icons.notification} className="w-6 h-6" />
        </View>

        {/* Credit Section */}
        <View className="bg-secondary-100 w-full h-[40%] mt-2 rounded-2xl p-4">
          <Text className="text-white text-sm text-center capitalize">
            available credit limit
          </Text>
          <Text className="text-white text-3xl mt-6 font-bold text-center">
            GHC
          </Text>
          <Text className="text-white text-3xl font-bold text-center">
            3000.00
          </Text>
          <Text className="text-white text-sm mt-4 text-center font-pregular">
            Outstanding bill ={" "}
            <Text className="text-red-500 font-bold">GHC 250.00</Text>
          </Text>
          <CustomButton
            icon={icons.refuel}
            onPress={()=>{router.push('Home/Refuel')}}
            title={"Refuel now"}
            color="bg-green-100"
          />
          <CustomButton
            icon={icons.cash}
            onPress={()=>{router.push('Wallet')}}

            title={"Pay Back"}
            color="bg-green-100"
          />
        </View>

        {/* Recent Fuel Stations */}
        <View className="mt-2">
          <Text className="text-sm text-black capitalize font-pregular">
            Recent Fuel Stations
          </Text>
          <FuelStationSlider data={stations} />
        </View>

        {/* Refueling History Chart */}
        <View className="mt-2">
          <RefuelingHistoryChart />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
