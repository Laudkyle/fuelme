import {
  View,
  Text,
  Image,
  ScrollView,
  Platform,
  TouchableOpacity,
  Pressable,
  KeyboardAvoidingView,
  RefreshControl,
} from "react-native";
import { useState, useEffect, useCallback, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import api from "../../../api";
import { Ionicons } from "@expo/vector-icons";
import HeaderComponent from "../../../components/HeaderComponent";
import CustomButton from "../../../components/CustomButton";
import { images, icons } from "../../../constants";
import { router } from "expo-router";
import VisaCard from "../../../components/VisaCard";
import MomoCard from "../../../components/MomoCard";
import AuthContext from "../../../AuthContext";

const Payment = () => {
  const [cards, setCards] = useState([]);
  const [momo, setMomo] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const { profile } = useContext(AuthContext);
  // Function to fetch cards and momo data
  const fetchData = async () => {
    try {
      const [cardsResponse, momoResponse] = await Promise.all([
        api.get(`/cards/user/${profile.user_uuid}`).catch(() => null),
        api.get(`/momo/user/${profile.user_uuid}`).catch(() => null),
      ]);

      // Set cards only if the response is valid
      setCards(cardsResponse?.data || []);
      setMomo(momoResponse?.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Pull-to-refresh handler
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  }, []);

  return (
    <SafeAreaView className="flex-1">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <HeaderComponent text={"Profile"} />

        <View className="flex-row items-center px-4 my-2">
          <Pressable
            onPress={() => {
              router.back();
            }}
          >
            <Ionicons name="arrow-back" size={24} color="black" />
          </Pressable>
          <Text className="text-lg font-bold mx-auto">Payment Methods</Text>
        </View>
        <CustomButton
          title={"add new"}
          icon={icons.add}
          onPress={() => {
            router.push("Profile/AddCard");
          }}
        />
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {cards.length === 0 && momo.length === 0 ? (
            <Text className="text-center text-gray-500 mt-4">
              You can add a card to see them here.
            </Text>
          ) : (
            <>
              {cards.map((card) => (
                <VisaCard
                  key={card._id}
                  cardholder={card.name}
                  cardNumber={card.card_number}
                  expiry={card.expiry_date}
                />
              ))}
              {momo.map((momoItem) => (
                <MomoCard
                  key={momoItem._id}
                  name={momoItem.name}
                  phoneNumber={momoItem.phone}
                  vendor={momoItem.vendor}
                />
              ))}
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Payment;
