import {
  View,
  Text,
  TextInput,
  Image,
  Pressable,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import React, { useState, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/Formfield";
import { icons, images } from "../../constants";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { useNavigation } from "expo-router";
const Register = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    pin: "",
    otp: ["", "", "", "", ""], // OTP as an array for 5 digits
    category: "",
    staffId: "",
    companyId: "",
    idFront: null,
    idBack: null,
    selfie: null,
  });

  const otpInputs = useRef([]);


const [loading, setLoading] = useState(false)
const [error, setError] = useState('')
const navigation = useNavigation();

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dinb6qtto/image/upload"; 

const uploadToCloudinary = async (imageUri) => {
  const data = new FormData();

  // Generate a unique filename
  const uniqueFilename = `image_${Date.now()}_${Math.floor(Math.random() * 10000)}.jpg`;

  data.append("file", { uri: imageUri, name: uniqueFilename, type: "image/jpeg" });
  data.append("upload_preset", "fuelme");

  try {
    const response = await axios.post(CLOUDINARY_URL, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data.secure_url;  
  } catch (error) {
    console.error("Cloudinary Upload Error:", error.response?.data || error.message);
    return null;
  }
};


const registerUser = async (form) => {
  setLoading(true);
  setError(null);

  try {
    // Upload images & handle errors
    const idFrontUrl = await uploadToCloudinary(form.idFront).catch(() => "");
    const idBackUrl = await uploadToCloudinary(form.idBack).catch(() => "");
    const selfieUrl = await uploadToCloudinary(form.selfie).catch(() => "");

    // Construct request body
    const requestBody = {
      user: {
        phone: form.phone,
        pin: form.pin,
      },
      profile: {
        name: form.name,
        address: form.address,
        email: form.email,
        category: form.category,
        staff_id: form.staffId || "",
        company_id: form.companyId || "",
        id_image1: idFrontUrl, 
        id_image2: idBackUrl,
        personal_image: selfieUrl,
      },
    };

    console.log("Final request body:", JSON.stringify(requestBody, null, 2));

    // API request
    const response = await axios.post(`${process.env.backend}/users/register`, requestBody);

    // Navigate to the success page
    navigation.navigate("complete");

    return response.data;
  } catch (error) {
    console.error("Full error response:", error.response);
    const errorMessage = error.response?.data?.message || "Registration failed. Please try again.";
    setError(errorMessage);
    return null;
  } finally {
    setLoading(false);
  }
};

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < 5) setStep(step + 1);
    else {
      //register
      console.log("Form Data:", JSON.stringify(form, null, 2));
      registerUser(form)
     
    }
  };

  const handleImagePick = async (field) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      // mediaTypes: 'images',
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      handleChange(field, result.assets[0].uri);
    }
  };

  const handleSelfie = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      handleChange("selfie", result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1">
            {/* Upper Half - Progress Indicator */}
            <View className="flex-[0.20] bg-purple justify-center items-center px-6">
              {/* Back Button */}
              <Pressable
                className="absolute left-5 top-6"
                onPress={() => {
                  if (step > 1) {
                    setStep(step - 1);
                  } else {
                    router.back();
                  }
                }}
              >
                <Image source={icons.back} resizeMode="contain" />
              </Pressable>

              {/* Step Title */}
              <Text className="text-white w-[60vw] text-center font-bold mt-2 text-xl">
                {step === 1 && "Register to Start Fueling!"}
                {step === 2 && "Enter OTP"}
                {step === 3 && "Register to Start Fueling!"}
                {step === 4 && "Register to Start Fueling!"}
                {step === 5 && "Register to Start Fueling!"}
              </Text>
              <Text className="text-white w-[70vw] text-center font-bold mt-1 text-xs">
                {step === 2 &&
                  "An OTP has been sent to the phone number provided"}
              </Text>

              {/* Stepper */}
              <View className="flex-row">
                {[1, 2, 3, 4, 5].map((num) => (
                  <View
                    key={num}
                    className={`w-10 h-10 mx-2 rounded-full flex items-center justify-center ${
                      step > num
                        ? "bg-green-500"
                        : step === num
                        ? "bg-gray-500"
                        : "bg-gray-300"
                    }`}
                  >
                    {step > num ? (
                      <Text className="text-white font-bold">✔</Text>
                    ) : (
                      <Text className="text-white font-bold">{num}</Text>
                    )}
                  </View>
                ))}
              </View>
            </View>

            {/* Lower Half - Form Section */}
            <View className="flex-[0.6] bg-primary" />

            <View className="absolute top-[25%] left-[10%] w-[80%] bg-white p-8 rounded-2xl shadow-lg">
              <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{ flexGrow: 1 }}
              >
                {step === 1 && (
                  <>
                    <Text className="text-sm text-black font-psemibold text-center">
                      Personal Inforamtion
                    </Text>
                    <FormField
                      title="Full Name"
                      value={form.name}
                      onTextChange={(text) => handleChange("name", text)}
                    />
                    <FormField
                      title="Phone Number"
                      value={form.phone}
                      onTextChange={(text) => handleChange("phone", text)}
                    />
                    <FormField
                      title="Email"
                      value={form.email}
                      onTextChange={(text) => handleChange("email", text)}
                    />
                    <FormField
                      title="Address"
                      value={form.address}
                      onTextChange={(text) => handleChange("address", text)}
                    />
                    <FormField
                      title="PIN"
                      value={form.pin}
                      secureTextEntry
                      onTextChange={(text) => handleChange("pin", text)}
                    />
                    <View className="flex-row justify-center mt-4">
                      <Text className="text-gray-500">
                        Already have an account?{" "}
                      </Text>
                      <Link
                        href="/sign-up"
                        className="text-secondary capitalize font-semibold"
                      >
                        log in
                      </Link>
                    </View>
                  </>
                )}

                {step === 2 && (
                  <View className="flex-col space-y-4">
                    <Text className="text-sm mb-4 text-black font-psemibold text-center">
                      Enter OTP
                    </Text>

                    <View className="flex-row justify-between">
                      {form.otp.map((digit, index) => (
                        <TextInput
                          key={index}
                          ref={(el) => (otpInputs.current[index] = el)}
                          className="w-12 h-12 text-center border border-gray-400 rounded-lg text-xl"
                          maxLength={1}
                          keyboardType="number-pad"
                          value={digit}
                          onChangeText={(text) => {
                            let newOtp = [...form.otp];
                            newOtp[index] = text;
                            handleChange("otp", newOtp);

                            // Auto-focus next input
                            if (text && index < 4) {
                              otpInputs.current[index + 1]?.focus();
                            }
                          }}
                          onKeyPress={({ nativeEvent }) => {
                            if (
                              nativeEvent.key === "Backspace" &&
                              index > 0 &&
                              !form.otp[index]
                            ) {
                              otpInputs.current[index - 1]?.focus();
                            }
                          }}
                        />
                      ))}
                    </View>
                  </View>
                )}

                {step === 3 && (
                  <>
                    <Text className="text-sm mb-4 text-black font-psemibold text-center">
                      Select Category
                    </Text>

                    {[
                      "Civil Work",
                      "Commercial Driver",
                      "Corporate Worker",
                    ].map((option) => (
                      <TouchableOpacity
                        key={option}
                        onPress={() => handleChange("category", option)}
                        className="flex-row justify-between items-center mb-3 p-4 border rounded-lg"
                      >
                        <Text>{option}</Text>
                        <View className="w-6 h-6 mr-3 border border-gray-500 rounded-full flex items-center justify-center">
                          {form.category === option && (
                            <View className="w-3 h-3 bg-blue-500 rounded-full" />
                          )}
                        </View>
                      </TouchableOpacity>
                    ))}

                    {/* Conditional Input for Civil Work */}
                    {form.category === "Civil Work" && (
                      <FormField
                        title="Please enter staff ID"
                        value={form.staffId || ""}
                        onTextChange={(text) => handleChange("staffId", text)}
                      />
                    )}

                    {/* Conditional Select for Corporate Worker */}
                    {form.category === "Corporate Worker" && (
                      <View>
                        <Text className="text-sm font-semibold mb-2">
                          Please select your company
                        </Text>
                        <View className="border border-gray-400 rounded-lg p-2">
                          <Picker
                            selectedValue={form.companyId}
                            onValueChange={(itemValue) =>
                              handleChange("company", itemValue)
                            }
                          >
                            <Picker.Item label="Select Company" value="" />
                            <Picker.Item label="Company A" value="1" />
                            <Picker.Item label="Company B" value="2" />
                            <Picker.Item label="Company C" value="3" />
                          </Picker>
                        </View>
                      </View>
                    )}
                  </>
                )}

                {step === 4 && (
                  <>
                    <Text className="text-sm mb-4 text-black font-psemibold text-center">
                      Upload ID
                    </Text>
                    {/* Ghana Card Front Upload */}
                    <TouchableOpacity
                      onPress={() => handleImagePick("idFront")}
                    >
                      <View className="border-dashed border border-gray-500 bg-gray-100 p-6 flex items-center justify-center mb-4 w-full h-40">
                        {form.idFront ? (
                          <Image
                            source={{ uri: form.idFront }}
                            className="w-full h-full rounded-lg"
                            resizeMode="cover"
                          />
                        ) : (
                          <>
                            <Image
                              source={icons.cloud}
                              className="w-6 h-6 mb-2"
                            />
                            <Text className="text-gray-400 mb-4 font-medium">
                              Browse your device for images
                            </Text>
                            <Image
                              source={icons.plus}
                              className="w-6 h-6 mb-2"
                            />
                          </>
                        )}
                      </View>
                    </TouchableOpacity>

                    {/* Ghana Card Back Upload */}
                    <TouchableOpacity onPress={() => handleImagePick("idBack")}>
                      <View className="border-dashed border border-gray-500 bg-gray-100  p-6 flex items-center justify-center w-full h-40">
                        {form.idBack ? (
                          <Image
                            source={{ uri: form.idBack }}
                            className="w-full h-full rounded-lg"
                            resizeMode="cover"
                          />
                        ) : (
                          <>
                            <Image
                              source={icons.cloud}
                              className="w-6 h-6 mb-2"
                            />
                            <Text className="text-gray-400 mb-4 font-medium">
                              Browse your device for images
                            </Text>
                            <Image
                              source={icons.plus}
                              className="w-6 h-6 mb-2"
                            />
                          </>
                        )}
                      </View>
                    </TouchableOpacity>
                  </>
                )}

                {step === 5 && (
                  <View className="bg-white shadow-md rounded-lg p-4">
                    <Text className="text-lg mb-4 text-gray-800 font-medium text-center">
                      Identity Verification Required
                    </Text>
                    <Text className="text-sm mb-4 text-gray-600 text-center">
                      Please position your ID card clearly within the frame
                    </Text>
                    <TouchableOpacity
                      onPress={handleSelfie}
                      className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 flex items-center justify-center bg-gray-50"
                    >
                      {form.selfieWithId ? (
                        <Image
                          source={{ uri: form.selfie }}
                          className="w-full h-64 rounded-lg"
                          resizeMode="cover"
                        />
                      ) : (
                        <>
                          <Image
                            source={images.camera}
                            className="w-20 h-20 mb-4"
                            resizeMode="contain"
                          />
                          <Text className="text-sm text-gray-500 font-medium">
                            Tap to capture photo
                          </Text>
                        </>
                      )}
                    </TouchableOpacity>
                    <Text className="text-xs mt-3 text-gray-500 text-center">
                      Your information is encrypted and secure
                    </Text>
                  </View>
                )}
              </ScrollView>

              <View className="flex-row justify-between mt-4">
                <CustomButton
                  title={step === 5 && form.selfie ? "Complete" : "Next"}
                  onPress={handleNext}
                  loading={loading}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Register;
