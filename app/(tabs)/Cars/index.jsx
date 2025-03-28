import {
  View,
  ScrollView,
  StatusBar,
  RefreshControl,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { router } from "expo-router";
import React, { useState, useEffect, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderComponent from "../../../components/HeaderComponent";
import CustomButton from "../../../components/CustomButton";
import { icons } from "../../../constants";
import CarCard from "../../../components/CarCard";
import api from "../../../api"; // Import API
import AuthContext from "../../../AuthContext";

const Cars = () => {
  const [carsData, setCarsData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
const {profile} = useContext(AuthContext);
  // Fetch cars data
  const fetchCars = async () => {
    try {
      setRefreshing(true);
      const response = await api.get(`/cars/user/${profile.user_uuid}`);
      setCarsData(response.data);
      console.log(carsData)
    } catch (error) {
      console.error("Error fetching cars:", error);
    } finally {
      setRefreshing(false);
    }
  };

  // Fetch data on mount
  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <SafeAreaView className="flex-1">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <HeaderComponent text={"Cars"} />
        
        <CustomButton
          title={"Add New Car"}
          icon={icons.add}
          onPress={() => router.push("Cars/AddCar")}
        />

<ScrollView
  contentContainerStyle={{ flexGrow: 1 }}
  keyboardShouldPersistTaps="handled"
  className="p-4 mt-2 rounded-lg bg-primary"
  refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchCars} />}
>
  {carsData.map((car) => (
    <CarCard
      key={car._id}
      id={car.car_uuid}
      model={car.car_model}
      transmission={car.transmission}
      fuel={car.fuel_type}
      number={car.car_number}
      date={car.date_created.slice(0, 10)} // Slices "YYYY-MM-DD" only
      img={car.picture || "https://via.placeholder.com/150"}
      onPress={() => {
        router.push({
          pathname: "Cars/Specs",
          params: {
            id: car.car_uuid,
            model: car.car_model,
            number: car.car_number,
            transmission:car.transmission,
            date: car.date_created.slice(0, 10), // Slices "YYYY-MM-DD" only
            fuel: car.fuel_type,
            img: car.picture || "https://via.placeholder.com/150",
          },
        });
      }}
    />
  ))}
</ScrollView>


        <StatusBar backgroundColor="#663AE8" style="light" />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Cars;
