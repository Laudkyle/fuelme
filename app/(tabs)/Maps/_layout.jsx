import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from "expo-router";

const MapsLayout = () => {
  return (
   <Stack>
         <Stack.Screen name="index" options={{ title: "Maps", headerShown:false }} />
       </Stack>
  )
}

export default MapsLayout