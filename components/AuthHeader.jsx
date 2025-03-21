import { View, Text,Pressable,Image } from 'react-native'
import React from 'react'
import { icons,images } from '../constants'
import { useNavigation } from "@react-navigation/native";


const AuthHeader = ({header,description}) => {
  const navigation = useNavigation();

  return (
    <View className="relative bg-primary" >
    <Pressable
      className="w-6 h-6 justify-start items-start absolute"
      onPress={() => navigation.goBack()}
    >
      <Image source={icons.arrowleft} resizeMode="contain" />
    </Pressable>
    <View className="items-center justify-center">
      <Image
        source={images.logo}
        resizeMode="contain"
        className="max-w-[380px] w-80 h-16"
      />
      <Text className="text-center text-white text-3xl mt-2 font-psemibold capitalize">
       {header}
      </Text>
      <Text className="text-center text-white text-lg capitalize font-pregular mt-2 mb-6">
        {description}
      </Text>
    </View>
  </View>
  )
}

export default AuthHeader