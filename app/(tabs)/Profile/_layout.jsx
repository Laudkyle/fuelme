import { View, Text } from 'react-native'
import React from 'react'

const ProfileLayout = () => {
  return (
    <Stack>
         <Stack.Screen name="index" options={{ title: "Profile" }} />
       </Stack>
  )
}

export default ProfileLayout