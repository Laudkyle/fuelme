import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
const AuthLayout = () => {
  return (
   <Stack>
      <Stack.Screen name='onboarding' options={{headerShown:false}}/>
      <Stack.Screen name='sign-in' options={{headerShown:false}}/>
      <Stack.Screen name='sign-up' options={{headerShown:false}}/>
      <Stack.Screen name='complete' options={{headerShown:false}}/>
      <Stack.Screen name='forgotPin' options={{headerShown:false}}/>
      <Stack.Screen name='resetPin' options={{headerShown:false}}/>
   </Stack>
  )
}

export default AuthLayout