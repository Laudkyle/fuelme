import { View, Text } from "react-native";
import React from "react";

const WalletLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Wallet" }} />
    </Stack>
  );
};

export default WalletLayout;
