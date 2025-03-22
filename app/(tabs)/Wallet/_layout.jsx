import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const WalletLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Wallet", headerShown:false }} />
      <Stack.Screen name="CreditDetail" options={{ title: "Details", headerShown:false }} />
    </Stack>
  );
};

export default WalletLayout;
