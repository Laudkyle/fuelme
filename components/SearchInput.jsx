import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";
import { usePathname, router } from "expo-router";

const SearchInput = ({ initialQuery }) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || "");

  return (
    <View className="bg-[#40444b] rounded-3xl mt-2 mx-4 px-4 items-center flex-row">
      <TextInput
        onChangeText={(e) => {
          setQuery(e);
        }}
        value={query}
        placeholder="Search"
        placeholderTextColor="#CDCDE0"
        className="text-white mt-0.5 font-pregular py-2 flex-1 text-base"
      />
      <TouchableOpacity
        onPress={() => {
          if (!query) {
            return Alert.alert(
              "Missing query",
              "Please ensure to enter a valid search"
            );
          }
          if (pathname.startsWith("/search")) {
            router.setParams({ query });
          } else {
            router.push(`/search/${query}`);
          }
        }}
      >
        <Image className="w-6 h-6" resizeMode="contain" source={icons.search} />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
