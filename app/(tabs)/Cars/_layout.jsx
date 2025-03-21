import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const CarsLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Cars", headerShown:false }} />
    </Stack>
  );
};

export default CarsLayout;
