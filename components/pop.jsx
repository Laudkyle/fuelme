import { View, Text, Image } from 'react-native'
import React from 'react'
import CustomButtonSmall from './CustomButtonSmall'

const pop = ({icon, title, description, btnTitle, onPress}) => {
  return (
    <View className="w-80 h-[380px] bg-[#40444b] rounded-2xl px-4 flex justify-center items-center">
        <Image source={icon} className="w-[150px] h-[150px] rounded-full" />
        <Text className='my-2 text-xl font-psemibold text-center text-white'>{title}</Text>
        <Text className='text-lg font-pregular text-center text-white'>{description}</Text>
      <CustomButtonSmall title={btnTitle} onPress={onPress} />
    </View>
  )
}

export default pop