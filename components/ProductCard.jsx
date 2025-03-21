import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import React, { useState } from "react";

const ProductCard = ({
  image,
  product,
  size,
  price,
  number: initialNumber = 0,
  onUpdateNumber,
}) => {
  const [number, setNumber] = useState(initialNumber); // Current number of purchases
  const [modalVisible, setModalVisible] = useState(false); // Modal visibility
  const [inputValue, setInputValue] = useState(""); // Input field value
  const [error, setError] = useState(""); // Input error message

  // Validate input and update number
  const validateInput = (value) => {
    const parsedValue = parseInt(value, 10);
    if (isNaN(parsedValue) || parsedValue < 0) {
      setError("Please enter a valid number (0 or higher).");
      return false;
    }
    setError(""); // Clear any previous errors
    return parsedValue;
  };

  // Handle confirmation
  const handleConfirm = () => {
    const validatedValue = validateInput(inputValue);
    if (validatedValue === false) return;
    setNumber(validatedValue);
    setModalVisible(false);
    setInputValue(""); // Clear input field
    if (onUpdateNumber) onUpdateNumber(validatedValue);
  };

  return (
    <View
      className={`bg-gray-700 rounded-lg p-4 mt-2 ${
        number > 0 ? "border-r-8 bg-gray-900 border-green-500" : ""
      }`}
    >
      {/* Product Image and Details */}
      <View className="flex-row justify-between p-2 items-center">
        <Image
          source={image}
          className="w-20 h-20 rounded-lg mx-2"
          resizeMode="contain"
        />
        <View className="flex-col justify-start mx-2 flex-1">
          <Text className="text-gray-400 font-medium text-lg">{product}</Text>
          <View className="flex-row items-center mt-1">
            <Text className="text-gray-400 font-semibold text-lg capitalize">
              size:
            </Text>
            <Text className="text-white font-semibold text-lg ml-2">{size}</Text>
          </View>
        </View>
      </View>

      {/* Divider */}
      <View className="h-[1px] bg-white my-2" />

      {/* Price Details */}
      <View>
        <View className="flex-row items-center mb-2">
          <Text className="text-gray-400 font-semibold text-lg capitalize">
            price per unit:
          </Text>
          <Text className="text-white font-semibold text-lg ml-2">
            GH₵ {price}
          </Text>
        </View>

        {/* Tap-to-Edit Number */}
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <View className="flex-row items-center">
            <Text className="text-gray-400 font-semibold text-lg capitalize">
              number of units:
            </Text>
            <Text className="text-white font-semibold text-lg ml-2 underline">
              {number}
            </Text>
            <Text className="text-secondary-200 ml-2 italic">(Tap to Edit)</Text>
          </View>
        </TouchableOpacity>

        {/* Total Price */}
        <View className="flex-row items-center mt-2">
          <Text className="text-gray-400 font-semibold text-lg capitalize">
            total price:
          </Text>
          <Text className="text-white font-semibold text-lg ml-2">
            GH₵ {(price * number)}
          </Text>
        </View>
      </View>

      {/* Modal for Input */}
      <Modal
        transparent
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-1 justify-center items-center bg-black/50">
            <View className="bg-primary w-4/5 rounded-lg p-6">
              <Text className="text-center text-white font-psemibold text-lg mb-4">
                Enter Number of Units
              </Text>
              <TextInput
                value={inputValue}
                onChangeText={setInputValue}
                keyboardType="numeric"
                placeholder="Enter a number"
                placeholderTextColor="#CCCCCC"
                className="border border-gray-300 rounded-lg p-3 text-lg text-white mb-2"
              />
              {error ? (
                <Text className="text-red-500 text-center mb-2">{error}</Text>
              ) : null}
              <View className="flex-row justify-between space-x-4">
                <TouchableOpacity
                  className="flex-1 bg-gray-600 p-2 rounded-3xl"
                  onPress={() => {
                    setModalVisible(false);
                    setInputValue("");
                    setError(""); // Clear error on cancel
                  }}
                >
                  <Text className="text-center text-white font-semibold text-lg">
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="flex-1 bg-secondary-100 p-2 rounded-3xl"
                  onPress={handleConfirm}
                >
                  <Text className="text-center text-white font-semibold text-lg">
                    Confirm
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default ProductCard;
