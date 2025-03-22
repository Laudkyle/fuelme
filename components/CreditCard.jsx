import { View, Text } from "react-native";
import React from "react";
import { router
} from "expo-router";
import CustomButton from "../components/CustomButton";
import { icons } from "../constants";

const CreditCard = ({ id, amount, date }) => {
  return (
    <View className="bg-white w-full my-2 rounded-2xl p-6">
      <Text className="text-black text-sm text-center capitalize">
        {id || "#009374"}
      </Text>
      <Text className="text-red-500 text-3xl mt-6 font-bold text-center">
        GHC
      </Text>
      <Text className="text-red-500 text-3xl font-bold text-center">
        {amount || "3000.00"}
      </Text>
      <Text className="text-secondary-100 text-sm mt-4 text-center font-pregular">
        Due date:
        <Text className="text-secondary-100 font-bold">
          {date|| "09/03/2025"}
        </Text>
      </Text>

      <CustomButton
        icon={icons.cash}
        onPress={() => {
            router.push({
              pathname: "Wallet/CreditDetail",
              params: { id, amount, date },
            });
          }}
        title={"Pay Back"}
        color="bg-blue"
      />
    </View>
  );
};

export default CreditCard;
