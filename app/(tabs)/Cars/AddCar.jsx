import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import FormField from "../../../components/Formfield";
import CustomButton from "../../../components/CustomButton";
import HeaderComponent from "../../../components/HeaderComponent";
import DropDownPicker from "react-native-dropdown-picker";
import { icons } from "../../../constants";

const AddCar = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    model: "",
    type: "",
    number: "",
    fuelType: null,
    picture: null,
  });
  const [fuelOpen, setFuelOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [fuelOptions, setFuelOptions] = useState([
    { label: "Petrol", value: "Petrol" },
    { label: "Diesel", value: "Diesel" },
  ]);

  const CLOUDINARY_URL =
    "https://api.cloudinary.com/v1_1/dinb6qtto/image/upload";

  const uploadToCloudinary = async (imageUri) => {
    const data = new FormData();

    // Generate a unique filename
    const uniqueFilename = `image_${Date.now()}_${Math.floor(
      Math.random() * 10000
    )}.jpg`;

    data.append("file", {
      uri: imageUri,
      name: uniqueFilename,
      type: "image/jpeg",
    });
    data.append("upload_preset", "fuelme");

    try {
      const response = await axios.post(CLOUDINARY_URL, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return response.data.secure_url;
    } catch (error) {
      console.error(
        "Cloudinary Upload Error:",
        error.response?.data || error.message
      );
      return null;
    }
  };
  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleImagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      handleChange("picture", result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    if (
      !form.model ||
      !form.type ||
      !form.number ||
      !form.fuelType ||
      !form.picture
    ) {
      Alert.alert("Error", "Please fill all fields and upload an image.");
      return;
    }
    setLoading(true);
    const picture = await uploadToCloudinary(form.picture).catch(() => "");
    form.picture = picture;

    // Submit logic here (API call or local processing)
    console.log("Form Submitted", form);
    Alert.alert("Success", "Car added successfully!");
    setLoading(false);
    router.push('Cars/CarCompleted');
  };

  return (
    <SafeAreaView className="flex-1">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 py-4"
      >
        <HeaderComponent text={"Cars"} />
        <View className="flex-row items-center px-4 my-2">
          <Pressable
            onPress={() => {
              router.back();
            }}
          >
            <Ionicons name="arrow-back" size={24} color="black" />
          </Pressable>
          <Text className="text-xl font-bold mx-auto">Add Car</Text>
        </View>
        <View className="p-6 mt-2 rounded-lg bg-primary">
          <View>
            <FormField
              title={"Car Model"}
              placeholder={"Toyota Camry 2024"}
              value={form.model}
              onTextChange={(text) => handleChange("model", text)}
            />
            <FormField
              title={"Car Type"}
              placeholder={"Luxury"}
              value={form.type}
              onTextChange={(text) => handleChange("type", text)}
            />
            <FormField
              title={"Car Number"}
              placeholder={"GT-2024-20"}
              value={form.number}
              onTextChange={(text) => handleChange("number", text)}
            />

            <Text className="my-2 text-black font-pregular">Fuel Type</Text>
            <DropDownPicker
              open={fuelOpen}
              value={form.fuelType}
              items={fuelOptions}
              setOpen={setFuelOpen}
              setValue={(callback) => {
                const value = callback(form.fuelType);
                handleChange("fuelType", value);
              }}
              setItems={setFuelOptions}
              placeholder="Select Fuel Type"
              containerStyle={{ marginBottom: 15 }}
            />

            <TouchableOpacity onPress={handleImagePick}>
              <View className="border-dashed border border-gray-500 bg-gray-100 p-6 flex items-center justify-center w-full h-40">
                {form.picture ? (
                  <Image
                    source={{ uri: form.picture }}
                    className="w-full h-full rounded-lg"
                    resizeMode="cover"
                  />
                ) : (
                  <>
                    <Image source={icons.cloud} className="w-6 h-6 mb-2" />
                    <Text className="text-gray-400 mb-4 font-medium">
                      Browse your device for images
                    </Text>
                    <Image source={icons.plus} className="w-6 h-6 mb-2" />
                  </>
                )}
              </View>
            </TouchableOpacity>

            <CustomButton
              title="Add car"
              onPress={handleSubmit}
              className="mt-6"
              loading={loading}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddCar;
