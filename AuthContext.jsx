import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

// Create Auth Context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const backendURL = process.env.backend; // Ensure this is correctly set

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
  // Function to register a user
  const register = async (form) => {
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
      const response = await axios.post(`${backendURL}/users/register`, requestBody);
  
      // Navigate to the success page
      router.push("complete");
  
      return response.data;
    } catch (error) {
      console.error("Full error response:", error);
      const errorMessage = error.response?.data?.message || "Registration failed. Please try again.";
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (phone, pin,rememberMe) => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(`${backendURL}/users/login`, {
        phone,
        pin,
      });

      // Extract data from response
      const { accessToken, refreshToken, user, profile } = response.data;
      // Store tokens securely

      await SecureStore.setItemAsync("accessToken", accessToken);
      await SecureStore.setItemAsync("refreshToken", refreshToken);

      // Store user & profile in AsyncStorage
      await AsyncStorage.setItem("user", JSON.stringify(user));
      await AsyncStorage.setItem("profile", JSON.stringify(profile));


      // Update user state
      setUser(user);
      setProfile(profile);
      router.replace("Home");
    } catch (error) {
      console.error("Login Error:", error);
      setError(
        error.response?.data?.message || "Invalid phone or PIN. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Function to log out
  const logout = async () => {
    await SecureStore.deleteItemAsync("userToken");
    setUser(null);
  };

  // ✅ Load user & profile on app start
  useEffect(() => {
    const loadUser = async () => {
      const token = await SecureStore.getItemAsync("accessToken");

      if (token) {
        const storedUser = await AsyncStorage.getItem("user");
        const storedProfile = await AsyncStorage.getItem("profile");

        setUser(storedUser ? JSON.parse(storedUser) : null);
        setProfile(storedProfile ? JSON.parse(storedProfile) : null);
      }
    };

    loadUser();
  }, []);


  return (
    <AuthContext.Provider
      value={{ user, profile, loading, error, signIn, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
