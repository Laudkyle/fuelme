import { View, Text } from "react-native";
import React from "react";

const CarsLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Cars" }} />
    </Stack>
  );
};

export default CarsLayout;
