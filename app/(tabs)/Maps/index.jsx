import {
  View,
  Text,
  Image,
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderComponent from "../../../components/HeaderComponent";
const Maps = () => {
  return (
    <SafeAreaView className="flex-1">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
               <HeaderComponent text={'Filling Stations'} />

        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          className="p-6 bg-primary"

        >
      <StatusBar backgroundColor="#663AE8" style="light" />
      </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Maps;
