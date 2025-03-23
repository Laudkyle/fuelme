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
import { router } from "expo-router";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderComponent from "../../../components/HeaderComponent";
import CustomButton from "../../../components/CustomButton";
import { icons, images } from "../../../constants";
import CarCard from "../../../components/CarCard";
const Cars = () => {
  const carsData = [
    {
      id: 1,
      name: "Toyota Camry",
      transmission: "Automatic",
      type: "Sedan",
      fuel: "Petrol",
      number: "2500.00",
      date: "04/09/2025",
      img: "https://s3-alpha-sig.figma.com/img/3abb/6a55/d49aa739fa6d616252466e32485d9b93?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=WrcERBZw-fdqiEYsor6YPLYXhAhHXXEY1vNpg0pIJNDvwdlrFDEO0dlD2yFjHfhnLp9Mw6Ny2iuu3W-C~qHVPT99MpsbgdUqHaYib1pGZSA937Pr6SCfi6xEvYH-nB5-cyVR4IDBXs9IUW-ADri7C7JFoALZu44FyrufivJFsbk~6YcJ--kzDAcCx~64o2slG8su8l334Alius2byig7Hljv7yP7XRRBwujwX0tQ20Zj9jqVlTgBDtEAiUyPaU6FFXfUl1oU~T-WYGk2oE~OmF~r1WaGfnJE7Rk3BOGThh~tBfCBas6Wm~mtjh~woEcV1WXoY4ecgh7DKRaAB7hB6Q__",
    },
    {
      id: 2,
      name: "Honda Civic",
      transmission: "Manual",
      type: "Hatchback",
      fuel: "Diesel",
      number: "GT-1800-23",
      date: "15/03/2025",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNq9nN0ijgO1JY0aUHwAirVpm2HIf3ndti7g&s",
    },
    {
      id: 3,
      name: "Ford F-150",
      transmission: "Automatic",
      type: "Truck",
      fuel: "Diesel",
      number: "VR-4500-21",
      date: "21/07/2025",
      img: "https://t3.ftcdn.net/jpg/01/23/52/24/360_F_123522471_XZe5ebqil1DFJRgOUJ6taDP4DnmHjtL7.jpg",
    },
    {
      id: 4,
      name: "Nissan Rogue",
      transmission: "CVT",
      type: "SUV",
      fuel: "Hybrid",
      number: "GA-3200-24",
      date: "10/05/2025",
      img: "https://cdn.motor1.com/images/mgl/mrz1e/s3/coolest-cars-feature.jpg",
    },
    {
      id: 5,
      name: "Mercedes-Benz C300",
      transmission: "Automatic",
      type: "Luxury Sedan",
      fuel: "Petrol",
      number: "BA-7800-20",
      date: "30/01/2025",
      img: "https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?cs=srgb&dl=pexels-pixabay-210019.jpg&fm=jpg",
    },
  ];

  return (
    <SafeAreaView className="flex-1">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <HeaderComponent text={"Cars"} />
        <CustomButton title={"add new car"} icon={icons.add} onPress={()=>{
          router.push('Cars/AddCar')
        }} />
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          className="p-4 mt-2 rounded-lg bg-primary"
        >
          {carsData.map((car) => (
            <CarCard
              key={car.id}
              id={car.id}
              model={car.name}
              transmission={car.transmission}
              type={car.type}
              fuel={car.fuel}
              number={car.number}
              date={car.date}
              img={car.img}
              onPress={() => {
                router.push({
                  pathname: "Cars/Specs",
                  params: {
                    id:car.id,
                    model:car.name,
                    number:car.number,
                    date:car.date,
                    type:car.type,
                    transmission:car.transmission,
                    fuel:car.fuel,
                    img:car.img,
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
