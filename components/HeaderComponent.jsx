import { View, Text } from 'react-native'
import React from 'react'

const HeaderComponent = ({text}) => {
  return (
    <View className="bg-secondary-100 h-20">
    <Text className="font-bold text-xl text-white text-center mt-6">{text}</Text>
        </View>
  )
}

export default HeaderComponent