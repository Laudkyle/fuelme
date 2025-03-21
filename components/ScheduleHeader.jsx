import { View, Text,Pressable,Image } from 'react-native'
import React from 'react'
import { icons,images } from '../constants'
import { useNavigation } from "@react-navigation/native";


const ScheduleHeader = ({header}) => {
  const navigation = useNavigation();

  return (
    <View className="relative bg-primary" >
    <Pressable
      className="w-6 h-6 mt-2 justify-start items-start absolute"
      onPress={() => navigation.goBack()}
    >
      <Image source={icons.arrowleft} resizeMode="contain" />
    </Pressable>
    <View className="items-center justify-center">
     
      <Text className="text-center text-white text-3xl mt-2 font-bold capitalize">
       {header}
      </Text>
     
    </View>
   
  </View>
  )
}

export default ScheduleHeader