import { View, Text } from 'react-native'
import React from 'react'

const MapsLayout = () => {
  return (
   <Stack>
         <Stack.Screen name="index" options={{ title: "Maps" }} />
       </Stack>
  )
}

export default MapsLayout