import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const RequestLayout = () => {
  return (
   <Stack>
        <Stack.Screen name="Refuel" options={{ headerShown: false }} />
       
   </Stack>
  )
}

export default RequestLayout