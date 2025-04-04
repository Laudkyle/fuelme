import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { AuthProvider } from "../../../AuthContext";


const ProfileLayout = () => {
  return (
    
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "Profile", headerShown: false }}
      />
      <Stack.Screen
        name="CustomerService"
        options={{ title: "CustomerService", headerShown: false }}
      />
      <Stack.Screen
        name="Privacy"
        options={{ title: "Privacy", headerShown: false }}
      />
      <Stack.Screen
        name="Payment"
        options={{ title: "Payment", headerShown: false }}
      />
      <Stack.Screen
        name="Score"
        options={{ title: "Score", headerShown: false }}
      />
      <Stack.Screen
        name="AddCard"
        options={{ title: "AddCard", headerShown: false }}
      />
      <Stack.Screen
        name="TermsAndConditions"
        options={{ title: "terms", headerShown: false }}
      />
    </Stack>
  );
};

export default ProfileLayout;
