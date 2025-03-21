import { View, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'

const CustomButtonSmall = ({title,onPress}) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress} className="w-3/5 h-14 rounded-xl  mx-auto mt-4 bg-secondary justify-center items-center ">
        <Text className="text-xl text-white capitalize">
        {title}

        </Text>
    </TouchableOpacity>
  )
}

export default CustomButtonSmall