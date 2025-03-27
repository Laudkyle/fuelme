import { View, Text, Image, FlatList, RefreshControl } from "react-native";
import React, { useState,useEffect,useContext, use } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons, images } from "../../../constants";
import CustomButton from "../../../components/CustomButton";
import FuelStationSlider from "../../../components/FuelStationSlider";
import RefuelingHistoryChart from "../../../components/RefuelingHistoryChart";
import { ScrollView } from "react-native-gesture-handler";
import { router, useNavigation } from "expo-router";
import fetchStations from "../../../components/FetchStations";
import AuthContext from "../../../AuthContext";
useNavigation;
// Function to get appropriate greeting
const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning!";
  if (hour < 18) return "Good Afternoon!";
  return "Good Evening!";
};
// Sample filling stations

  const stationsdata = fetchStations()
  const stations= stationsdata
  console.log('This is the sations',stations)
const Home = () => {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false); // State for pull-to-refresh

  const {user,profile} = useContext(AuthContext);

  const loadStations = async () => {
    setLoading(true);
    const data = await fetchStations();
    setStations(data);
    setLoading(false);
  };
  
  // Function to handle pull-to-refresh
  const onRefresh = async () => {
    setRefreshing(true);
    await loadStations();
    setRefreshing(false);
  };

  useEffect(() => {
    loadStations();
  }, []);

  return (
    <SafeAreaView className="py-2 px-6 h-screen">
      <ScrollView
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
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
            <Text className="text-center font-bold text-xl">{profile.name}</Text>
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
