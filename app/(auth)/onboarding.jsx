import { 
  View, SafeAreaView, Image, Text, Dimensions, 
  FlatList, TouchableOpacity 
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { images } from "../../constants";
import CustomButton from "../../components/CustomButton";
import { router } from "expo-router";

const Splash = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
  const flatListRef = useRef(null);

  const slides = [
    {
      id: "1",
      title: "Register for Fuel Financing",
      description: "Sign up today and unlock access to fuel financing options tailored to your needs.",
      image: images.fuelStation,
    },
    {
      id: "2",
      title: "No Upfront Payments",
      description: "Get the fuel you need now without paying upfront. Enjoy seamless fueling with flexible payment options.",
      image: images.slide2,
    },
    {
      id: "3",
      title: "Flexible Repayments",
      description: "Repay your fuel costs on your terms with customizable and stress-free repayment plans.",
      image: images.slide3,
    },
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % slides.length;
      setCurrentIndex(nextIndex);
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const renderItem = ({ item }) => (
    <View className="items-center mt-12" style={{ width: screenWidth, height: screenHeight * 0.7 }}>
      <Image source={item.image} className="w-72 h-72 mb-12" style={{ resizeMode: "contain" }} />
      <Text className="text-center text-black-100 text-xl font-semibold mr-4">{item.title}</Text>
      <Text className="text-center text-sm text-black-100 mt-4 mr-6">{item.description}</Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-primary px-4">
      <TouchableOpacity 
        className="flex mt-12 items-end"
        onPress={() => router.push("/home")}
      >
        <Text className="font-medium text-lg text-black-100">Skip</Text>
      </TouchableOpacity>

      <View className="flex-1 justify-between py-10">
        {/* FlatList Slider */}
        <View className="items-center" style={{ height: screenHeight * 0.65 }}>
          <FlatList
            ref={flatListRef}
            data={slides}
            renderItem={renderItem}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            onScrollToIndexFailed={(error) => {
              console.warn(error);
            }}
          />

          {/* Pagination Dots */}
          <View className="flex-row justify-center mt-5">
            {slides.map((_, index) => (
              <View
                key={index}
                className={`w-3 h-3 border border-purple p-2 rounded-full mx-1 ${
                  index === currentIndex ? "bg-secondary" : "bg-white"
                }`}
              />
            ))}
          </View>
        </View>

        {/* Buttons */}
        <View className="items-center mb-10">
          <CustomButton title="Register" onPress={() => router.push("/sign-up")} />
          <CustomButton color="bg-white" text="text-secondary" title="Login" onPress={() => router.push("/sign-in")} />
        </View>
      </View>

      <StatusBar backgroundColor="#272b2f" style="light" />
    </SafeAreaView>
  );
};

export default Splash;
