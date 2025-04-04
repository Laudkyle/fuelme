import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const CarsLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Cars", headerShown:false }} />
      <Stack.Screen name="Specs" options={{ title: "Specs", headerShown:false }} />
      <Stack.Screen name="AddCar" options={{ title: "AddCar", headerShown:false }} />
      <Stack.Screen name="CarCompleted" options={{ title: "CarCompleted", headerShown:false }} />
    </Stack>
  );
};

export default CarsLayout;
