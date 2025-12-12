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
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import FormField from "../../../components/Formfield";
import CustomButton from "../../../components/CustomButton";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AuthContext from "../../../AuthContext";
import { useStations } from "../../../StationContext"; 
import api from "../../../api";

const Refuel = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [fuelQuantity, setFuelQuantity] = useState("");
  const [amount, setAmount] = useState("");
  const [vehicleType, setVehicleType] = useState(null);
  const [vehicleFuel, setVehicleFuel] = useState(null);
  const [repaymentDate, setRepaymentDate] = useState(new Date());
  const [station, setStation] = useState("");
  const [stationCode, setStationCode] = useState("");
  const [category, setCategory] = useState("commercial");
  const [stationError, setStationError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [fuelPrice, setFuelPrice] = useState(0);
  const [isLoadingPrice, setIsLoadingPrice] = useState(false);
  const [isPriceFetched, setIsPriceFetched] = useState(false); // Track if price is fetched

  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);

  const { profile } = useContext(AuthContext);
  const user_uuid = profile.user_uuid
  const { 
    stations: stationOptions, 
    loading: stationsLoading, 
    checkStationExist,
    getStationDetails,
    isStationActive,
    searchStations,
    refreshStations 
  } = useStations();

  // Fetch user cars
  const fetchUserCars = async () => {
    try {
      const userUUID = profile.user_uuid; 
      const response = await api.get(`/cars/user/${userUUID}`);
      const carItems = response.data.map((car) => ({
        label: car.car_model || "Unnamed Car",
        value: car.car_uuid,
        fuel_type: car.fuel_type
      }));
      setItems(carItems);
    } catch (error) {
      console.error("Failed to fetch user cars:", error);
    }
  };

  // Fetch fuel price from backend for a specific station
  const fetchFuelPrice = async (fuelType, stationCode) => {
    if (!fuelType || !stationCode) return;
    
    setIsLoadingPrice(true);
    try {
      // Convert fuel_type to match API endpoint
      const endpoint = fuelType.toLowerCase().includes('petrol') 
        ? '/stations/ppl/petrol' 
        : '/stations/ppl/diesel';
      
      const response = await api.get(`${endpoint}/${stationCode}`);
      console.log("Fuel price response:", response.data);
      
      if (response.data && response.data.price) {
        setFuelPrice(response.data.price);
        setIsPriceFetched(true);
      } else if (response.data && response.data.average_price) {
        // If specific station doesn't have price, use average
        setFuelPrice(response.data.average_price);
        setIsPriceFetched(true);
        Alert.alert("Info", `${stationCode} doesn't have specific ${fuelType} price. Using average market price.`);
      } else {
        // Fallback price if API doesn't return expected format
        const defaultPrice = fuelType.toLowerCase().includes('petrol') ? 21.00 : 23.50;
        setFuelPrice(defaultPrice);
        setIsPriceFetched(true);
        Alert.alert("Info", "Using default fuel price. Please check with station.");
      }
    } catch (error) {
      console.error("Failed to fetch fuel price:", error);
      // Set default prices based on fuel type
      const defaultPrice = fuelType?.toLowerCase().includes('petrol') ? 21.00 : 23.50;
      setFuelPrice(defaultPrice);
      setIsPriceFetched(true);
      Alert.alert("Warning", "Could not fetch current fuel price. Using default value.");
    } finally {
      setIsLoadingPrice(false);
    }
  };

  // Calculate fuel quantity when both amount and price are available AND price is fetched
  const calculateFuelQuantity = () => {
    if (amount && fuelPrice > 0 && isPriceFetched) {
      const liters = (parseFloat(amount) / fuelPrice).toFixed(2);
      setFuelQuantity(liters);
    }
  };

  useEffect(() => {
    fetchUserCars();
  }, []);

  // Handle vehicle selection change
  useEffect(() => {
    if (vehicleType) {
      const selectedCar = items.find((item) => item.value === vehicleType);
      if (selectedCar) {
        setVehicleFuel(selectedCar.fuel_type);
        // Don't fetch price here, wait for station code
      }
    }
  }, [vehicleType, items]);

  // Recalculate fuel when amount changes AND price is fetched
  useEffect(() => {
    if (isPriceFetched) {
      calculateFuelQuantity();
    }
  }, [amount, fuelPrice, isPriceFetched]);

  const validateStep1 = () => {
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      Alert.alert("Validation Error", "Please enter a valid amount.");
      return false;
    }
    
    if (!vehicleType) {
      Alert.alert("Validation Error", "Please select a vehicle type.");
      return false;
    }
    
    if (!vehicleFuel) {
      Alert.alert("Validation Error", "Please select a vehicle with a fuel type.");
      return false;
    }
    
    return true;
  };

  const validateStep2 = async () => {
    // Reset states
    setStationError("");
    setIsPriceFetched(false);
    
    if (!stationCode.trim()) {
      setStationError("Please enter a station code.");
      return false;
    }
    
    setIsVerifying(true);
    
    try {
      // Check if station exists
      const stationExists = checkStationExist(stationCode, 'code');
      
      if (!stationExists) {
        setStationError("Invalid station code. Please enter a valid one.");
        return false;
      }

      // Check if station is active
      const isActive = isStationActive(stationCode);
      if (!isActive) {
        setStationError("This station is currently inactive. Please select another station.");
        return false;
      }
      
      const stationDetails = getStationDetails(stationCode, 'code');
      console.log("This is station details : ",stationDetails)
      setStation(stationDetails.station_uuid);

      // Fetch fuel price after station validation
      if (vehicleFuel && stationCode) {
        await fetchFuelPrice(vehicleFuel, stationCode);
      }

      return true;
    } catch (error) {
      console.error("Error verifying station:", error);
      setStationError("Failed to verify station. Please try again.");
      return false;
    } finally {
      setIsVerifying(false);
    }
  };

  const handleStationCodeChange = (text) => {
    setStationCode(text);
    // Clear error when user starts typing
    if (stationError) {
      setStationError("");
    }
    // Reset price fetched flag when station code changes
    setIsPriceFetched(false);
    setFuelPrice(0);
  };

  const handleScanQR = () => {
    // QR scanner logic
    console.log("Scanning QR code...");
   
    const scannedCode = "ST123"; 
    setStationCode(scannedCode);
  };

  const handleSubmit = () => {
    // Make sure we have all data before submission
    if (!fuelQuantity || fuelQuantity === "NaN" || isNaN(parseFloat(fuelQuantity))) {
      Alert.alert("Error", "Please complete all steps before submitting.");
      return;
    }
    
    const refuelData = {
      user_uuid,
      car_uuid: vehicleType,
      fuel_type: vehicleFuel,
      fuel: fuelQuantity,
      amount: parseFloat(amount),
      repaymentDate: repaymentDate,
      station_uuid: station
    };
    
    console.log("Submitting Refuel Request:", refuelData);
    submitRefuelRequest(refuelData);
  };

  const submitRefuelRequest = async (refuelData) => {
    try {
      await api.post('/requests', refuelData);
      router.push("Home/Completed");
    } catch (error) {
      console.error("Failed to submit refuel request:", error);
      Alert.alert("Error", "Failed to submit refuel request. Please try again.");
    }
  };

  return (
    <SafeAreaView className="flex-1 p-6 bg-primary">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView 
          keyboardShouldPersistTaps="handled" 
          className="flex-1"
          showsVerticalScrollIndicator={false}
        >
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

              {/* Amount Input */}
              <FormField
                title="Amount (GHS)"
                placeholder="Enter amount in Ghana Cedis"
                value={amount}
                onTextChange={setAmount}
                keyboardType="numeric"
              />

              {/* Conversion Display - Only show after station is validated */}
              {amount && fuelPrice > 0 && fuelQuantity && step >= 2 && isPriceFetched ? (
                <View className="mt-2 mb-4 p-3 bg-green-50 rounded-lg border border-green-200">
                  <Text className="text-gray-700 text-sm font-medium">
                    GHS {amount} ÷ GHS {fuelPrice} = {fuelQuantity} L
                  </Text>
                  <Text className="text-gray-600 text-xs mt-1">
                    Based on current fuel price at station {stationCode}
                  </Text>
                </View>
              ) : vehicleFuel && step === 1 ? (
                <View className="mt-2 mb-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <Text className="text-gray-600 text-sm">
                    Fuel quantity will be calculated after station selection
                  </Text>
                </View>
              ) : null}

              <Text className="text-gray-600 mt-3 mb-1">Vehicle</Text>
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
                disabled={isLoadingPrice}
              />
            </View>
          )}

          {step === 2 && (
            <View className="p-4">
              <FormField
                title="Station Code"
                placeholder="Enter station code"
                value={stationCode}
                onTextChange={handleStationCodeChange}
                error={stationError}
              />
              
              {stationError ? (
                <Text className="text-red-500 text-sm mt-1">{stationError}</Text>
              ) : null}
              
              {isVerifying && (
                <View className="flex-row items-center mt-2">
                  <ActivityIndicator size="small" color="#0000ff" />
                  <Text className="text-gray-600 ml-2">Verifying station code...</Text>
                </View>
              )}

              {/* Show fuel price and calculation after station is verified */}
              {isPriceFetched && fuelPrice > 0 && vehicleFuel && amount && (
                <View className="mt-4 mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <View className="flex-row justify-between items-center mb-2">
                    <Text className="text-gray-700 font-medium">
                      {vehicleFuel} Price:
                    </Text>
                    <Text className="text-lg font-bold text-green-600">
                      GHS {fuelPrice}/L
                    </Text>
                  </View>
                  <View className="bg-white p-3 rounded-lg">
                    <Text className="text-gray-700 text-sm">
                      GHS {amount} ÷ GHS {fuelPrice} = {fuelQuantity} L
                    </Text>
                  </View>
                </View>
              )}

              <View className="mt-4">
                <CustomButton
                  title="Next"
                  color="bg-green-100"
                  onPress={async () => {
                    if (await validateStep2()) setStep(3);
                  }}
                  disabled={isVerifying}
                />
                <CustomButton
                  title="Scan QR Code"
                  onPress={handleScanQR}
                  className="mt-2"
                />
              </View>

              {/* Optional: Show station suggestions */}
              {stationCode.length >= 2 && !isVerifying && (
                <View className="mt-4">
                  <Text className="text-gray-600 mb-2">Station Suggestions:</Text>
                  {searchStations(stationCode).slice(0, 3).map((station) => (
                    <TouchableOpacity
                      key={station.code}
                      onPress={() => {
                        setStationCode(station.code);
                        setStationError("");
                      }}
                      className="bg-gray-50 p-3 rounded-lg mb-2 border border-gray-200"
                    >
                      <Text className="font-semibold">{station.name}</Text>
                      <Text className="font-semibold">{station.location}</Text>
                      <Text className="text-gray-500 text-sm">Code: {station.code}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          )}

          {step === 3 && (
            <View className="p-6">
              {/* Header */}
              <View className="mb-6">
                <Text className="text-2xl font-bold text-gray-900 mb-1">
                  Review Transaction
                </Text>
                <Text className="text-sm text-gray-500">
                  Please verify all details before confirming
                </Text>
              </View>

              {/* Station Info Card */}
              {stationCode && (
                <View className="mb-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                  <View className="flex-row items-center">
                    <View className="w-10 h-10 bg-blue-600 rounded-full items-center justify-center mr-3">
                      <Text className="text-white font-bold text-lg">⛽</Text>
                    </View>
                    <View className="flex-1">
                      <Text className="text-xs text-blue-600 font-semibold uppercase tracking-wide">
                        Filling Station
                      </Text>
                      <Text className="text-base font-bold text-blue-900 mt-0.5">
                        {getStationDetails(stationCode, 'code')?.name || stationCode}
                      </Text>
                      <Text className="text-xs text-gray-600 mt-1">
                        Code: {stationCode}
                      </Text>
                    </View>
                  </View>
                </View>
              )}

              {/* Transaction Details Card */}
              <View className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden mb-6">
                <View className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                  <Text className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                    Transaction Summary
                  </Text>
                </View>
                
                <View className="p-4">
                  <View className="flex-row justify-between items-center py-3 border-b border-gray-100">
                    <Text className="text-sm text-gray-600">Fuel Type</Text>
                    <Text className="text-base font-bold text-gray-900">
                      {vehicleFuel || "N/A"}
                    </Text>
                  </View>
                  
                  <View className="flex-row justify-between items-center py-3 border-b border-gray-100">
                    <Text className="text-sm text-gray-600">Amount</Text>
                    <Text className="text-base font-bold text-gray-900">
                      GHS {amount}
                    </Text>
                  </View>
                  
                  <View className="flex-row justify-between items-center py-3 border-b border-gray-100">
                    <Text className="text-sm text-gray-600">Price per Litre</Text>
                    <View className="flex-row items-center">
                      <Text className="text-base font-semibold text-gray-900 mr-2">
                        GHS {fuelPrice}
                      </Text>
                      <Text className="text-xs text-gray-500">({stationCode})</Text>
                    </View>
                  </View>
                  
                  <View className="flex-row justify-between items-center py-3 border-b border-gray-100">
                    <Text className="text-sm text-gray-600">Fuel Quantity</Text>
                    <Text className="text-base font-bold text-gray-900">
                      {fuelQuantity} L
                    </Text>
                  </View>
                  
                  {category === "commercial" && (
                    <View className="flex-row justify-between items-center py-3 border-b border-gray-100">
                      <Text className="text-sm text-gray-600">Repayment Date</Text>
                      <Text className="text-base font-semibold text-gray-900">
                        {repaymentDate?.toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}
                      </Text>
                    </View>
                  )}
                  
                  <View className="flex-row justify-between items-center pt-4 mt-2">
                    <Text className="text-base font-semibold text-gray-900">Total Amount</Text>
                    <View className="bg-green-50 px-3 py-2 rounded-lg">
                      <Text className="text-xl font-bold text-green-700">
                        GHS {amount || "0.00"}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* Action Buttons */}
              <CustomButton
                color="bg-green-600"
                title="Confirm Transaction"
                onPress={handleSubmit}
                className="mb-3"
                disabled={!isPriceFetched}
              />
              
              {!isPriceFetched && (
                <Text className="text-yellow-600 text-sm text-center mb-3">
                  Please complete station verification first
                </Text>
              )}
              
              <CustomButton
                color="bg-gray-200"
                title="Back"
                onPress={() => setStep(2)}
                textColor="text-gray-700"
              />
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Refuel;