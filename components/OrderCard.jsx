import { View, Text, Image, TouchableOpacity, TextInput } from "react-native";
import React from "react";

const getReturnColor = (returnDispenser) => {
  if (returnDispenser === "accepted") {
    return "bg-green-100";
  } else if (returnDispenser === "requested") {
    return "bg-[#808080]";
  } else {
    return "bg-secondary";
  }
};

const OrderCard = ({
  image,
  product,
  size,
  number,
  price,
  returnDispenser,
  date,
  additionalInfo,
}) => {
  return (
    <View className="px-8 py-4 rounded-lg mt-2 bg-[#40444b]">
      <View className="flex-row justify-between p-2 items-center">
        <Image
          source={image}
          className="w-20 h-20 rounded-lg mx-2"
          resizeMode="contain"
        />
        <View className="flex-col justify-start mx-2 flex-1 items-start space-y-2">
          <Text className="text-[#808080] font-pmedium text-lg">{product}</Text>
          <View className="flex-row justify-start space-x-2">
            <Text className="text-[#808080] font-psemibold text-lg capitalize">
              size:
            </Text>
            <Text className="text-white font-psemibold text-lg">{size}</Text>
          </View>
        </View>
      </View>

      <View
        style={{ height: 1, backgroundColor: "white", marginVertical: 10 }}
      />
      <View>
        <View className="flex-row justify-start space-x-2">
          <Text className="text-[#808080] font-psemibold text-lg capitalize">
            price per unit:
          </Text>
          <Text className="text-white font-psemibold text-lg">GH₵ {price}</Text>
        </View>
        <View className="flex-row justify-start space-x-2">
          <Text className="text-[#808080] font-psemibold text-lg capitalize">
            number of purchases:
          </Text>
          <Text className="text-white font-psemibold text-lg">{number}</Text>
        </View>
        <View className="flex-row justify-start space-x-2">
          <Text className="text-[#808080] font-psemibold text-lg capitalize">
            total price:
          </Text>
          <Text className="text-white font-psemibold text-lg">
            GH₵ {price * number}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        className={`${getReturnColor(returnDispenser)} rounded-lg`}
      >
        <Text className="text-lg p-2 capitalize text-center text-white font-pregular">
          Return dispenser bottle
        </Text>
      </TouchableOpacity>

      {returnDispenser === "accepted" && (
        <View>
          <View className="flex-row justify-start mt-2 space-x-2">
            <Text className="text-green-100 font-psemibold text-sm capitalize">
              Delivery Status:
            </Text>
            <Text className="text-white font-psemibold text-sm">{date}</Text>
          </View>
          {/* Textarea for Additional Information */}
          <TextInput
            placeholder="Additional information..."
            placeholderTextColor="#808080"
            multiline
            numberOfLines={4}
            value={additionalInfo}
            style={{
              backgroundColor: "#2f3136",
              color: "white",
              borderRadius: 8,
              padding: 10,
              marginTop: 10,
              textAlignVertical: "top",
            }}
          />
        </View>
      )}
    </View>
  );
};

export default OrderCard;
