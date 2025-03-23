import {
  View,
  Text,
  Pressable,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import FormField from "../../../components/Formfield";
import CustomButton from "../../../components/CustomButton";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const Refuel = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [step, setStep] = useState(1);
  const [fuelQuantity, setFuelQuantity] = useState("");
  const [vehicleType, setVehicleType] = useState(null);
  const [repaymentDate, setRepaymentDate] = useState(new Date());
  const [stationCode, setStationCode] = useState("");
  const [category, setCategory] = useState("commercial");

  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: "Car", value: "0" },
    { label: "Truck", value: "1" },
    { label: "Motorcycle", value: "2" },
  ]);

  // Map ID to vehicle type (assuming an ID corresponds to a type)
  useEffect(() => {
    if (id) {
      const mappedVehicleType = items.find((item) => item.value === id)?.value;
      if (mappedVehicleType) {
        setVehicleType(mappedVehicleType);
      }
    }
  }, [id, items]);

  const validateStep1 = () => {
    if (!fuelQuantity || isNaN(fuelQuantity) || Number(fuelQuantity) <= 0) {
      Alert.alert("Validation Error", "Please enter a valid fuel quantity.");
      return false;
    }
    if (!vehicleType) {
      Alert.alert("Validation Error", "Please select a vehicle type.");
      return false;
    }
    return true;
  };

  const validateStep2 = async () => {
    if (!stationCode) {
      Alert.alert("Validation Error", "Please enter a station code.");
      return false;
    }

    try {
      const stationExists = await checkStationExists(stationCode);
      if (!stationExists) {
        Alert.alert("Error", "Invalid station code. Please enter a valid one.");
        return false;
      }
    } catch (error) {
      Alert.alert("Error", "Failed to verify station. Try again.");
      return false;
    }
    return true;
  };

  const checkStationExists = async (code) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(code === "ST123");
      }, 1500);
    });
  };

  const handleSubmit = () => {
    const refuelData = {
      fuelQuantity,
      vehicleType,
      repaymentDate: category === "commercial" ? repaymentDate : null,
      stationCode,
    };
    console.log("Submitting Refuel Request:", refuelData);
    router.push("Home/Completed");
  };

  return (
    <SafeAreaView className="flex-1 p-6 bg-primary">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View keyboardShouldPersistTaps="handled" className="flex-1">
          <View className="flex-row items-center my-6">
            <Pressable
              onPress={() => {
                if (step > 1) {
                  setStep(step - 1);
                } else {
                  router.back();
                }
              }}
            >
              <Ionicons name="arrow-back" size={24} color="black" />
            </Pressable>
            <Text className="text-xl font-bold mx-auto">Refuel Request</Text>
          </View>

          {step === 1 && (
            <View className="p-4">
              <FormField
                title="Fuel Quantity (Litres)"
                placeholder="Enter fuel quantity"
                value={fuelQuantity}
                onTextChange={setFuelQuantity}
                keyboardType="numeric"
              />

              <Text className="text-gray-600 mt-3 mb-1">Vehicle Type</Text>
              <DropDownPicker
                open={open}
                value={vehicleType}
                items={items}
                setOpen={setOpen}
                setValue={(callback) => setVehicleType(callback(vehicleType))}
                setItems={setItems}
                placeholder="Select Vehicle Type"
                containerStyle={{ height: 50, marginBottom: 10 }}
              />

              {category === "commercial" && (
                <View>
                  <Text className="text-gray-600 mt-3 mb-1">
                    Repayment Date
                  </Text>
                  <TouchableOpacity
                    onPress={() => setOpenDatePicker(true)}
                    className="border border-gray-300 p-3 rounded-lg bg-white"
                  >
                    <Text>
                      {repaymentDate
                        ? repaymentDate.toDateString()
                        : "Select Date"}
                    </Text>
                  </TouchableOpacity>

                  <DateTimePickerModal
                    isVisible={openDatePicker}
                    mode="date"
                    date={repaymentDate}
                    onConfirm={(selectedDate) => {
                      setOpenDatePicker(false);
                      setRepaymentDate(selectedDate);
                    }}
                    onCancel={() => setOpenDatePicker(false)}
                  />
                </View>
              )}

              <CustomButton
                title="Next"
                color="bg-green-100"
                onPress={() => {
                  if (validateStep1()) setStep(2);
                }}
              />
            </View>
          )}

          {step === 2 && (
            <View className="p-4">
              <FormField
                title="Station Code"
                placeholder="Enter station code"
                value={stationCode}
                onTextChange={setStationCode}
              />
              <CustomButton
                title="Next"
                color="bg-green-100"
                onPress={async () => {
                  if (await validateStep2()) setStep(3);
                }}
              />
              <CustomButton
                title="Scan QR Code"
                onPress={() => console.log("Scanning...")}
              />
            </View>
          )}

          {step === 3 && (
            <View className="p-4">
              <View className="border border-gray-300 p-4 rounded-lg bg-white shadow-md">
                <Text className="text-xl text-center font-bold mb-4 text-gray-900">
                  Confirm Details
                </Text>

                <View className="flex-row justify-between mb-3">
                  <Text className="text-lg text-gray-700">Total Litres:</Text>
                  <Text className="text-lg font-semibold text-gray-900">
                    {fuelQuantity} L
                  </Text>
                </View>

                <View className="flex-row justify-between mb-3">
                  <Text className="text-lg text-gray-700">Total Cost:</Text>
                  <Text className="text-lg font-semibold text-gray-900">
                    GHS {(fuelQuantity * 21).toFixed(2)}
                  </Text>
                </View>

                {category === "commercial" && (
                  <View className="flex-row justify-between mb-3">
                    <Text className="text-lg text-gray-700">
                      Repayment Date:
                    </Text>
                    <Text className="text-lg font-semibold text-gray-900">
                      {repaymentDate?.toDateString()}
                    </Text>
                  </View>
                )}
              </View>

              <CustomButton
                color="bg-green-600"
                title="Confirm Transaction"
                onPress={handleSubmit}
                className="mt-6"
              />
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Refuel;
