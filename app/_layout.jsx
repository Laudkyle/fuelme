import React, { useEffect } from "react";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { SplashScreen } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler"; // Import GestureHandlerRootView
import { PopupProvider, usePopup } from "../PopupContext";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { BlurView } from "expo-blur";
SplashScreen.preventAutoHideAsync();

const RenderModal = () => {
  const { popUpVisible, popupMessage, hidePopup } = usePopup(); // Get popup state and methods from context

  return (
    <Modal
      transparent={true}
      visible={popUpVisible}
      animationType="slide"
      onRequestClose={hidePopup} // Use hidePopup to close the popup
    >
      {/* Blur Effect */}
      <BlurView
        intensity={80}
        tint="dark"
        className="absolute inset-0 w-full h-full"
      />
      <View className="flex-1 justify-center items-center">
        <View className="bg-primary w-80 p-4 rounded-lg items-center">
          <Text className="text-white text-lg font-pregular mb-4">
            {popupMessage || "Water finished, can't place order."}
          </Text>
          <TouchableOpacity
            className="bg-secondary p-3 rounded-md mt-4 w-full"
            onPress={() => {
              hidePopup();
            }}
          >
            <Text className="text-white text-center font-psemibold">
              Schedule Order
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const RootLayout = () => {
  // Load fonts unconditionally
  const [fontsLoaded, error] = useFonts({
    "Inter-Light": require("../assets/fonts/Inter-Italic.otf"),
    "Inter-Medium": require("../assets/fonts/Inter-Medium.otf"),
    "Inter-Regular": require("../assets/fonts/Inter-Regular.otf"),
    "Inter-SemiBold": require("../assets/fonts/Inter-SemiBold.otf"),
    "Inter-Bold": require("../assets/fonts/Inter-Bold.otf"),
  });

  // Handle font errors and hide the splash screen
  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  return (
    <PopupProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <RenderModal />
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> 
          <Stack.Screen
            name="search/[query]"
            options={{ headerShown: false }}
          />
        </Stack>
      </GestureHandlerRootView>
    </PopupProvider>
  );
};

export default RootLayout;
