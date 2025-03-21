import { View, Text, Image, Dimensions } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { icons } from '../../constants'
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated'

const { width } = Dimensions.get('window') // Get screen width

const TabIcon = ({ icon, focused, color }) => {
  const translateY = useSharedValue(focused ? -10 : 0) // Move up smoothly

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: withSpring(focused ? -10 : 0, { damping: 8 }) }], // Smooth transition
    backgroundColor: focused ? "purple" : "transparent",
  }))

  return (
    <Animated.View className="items-center justify-center" style={animatedStyle}>
      <View className="p-3 rounded-full">
        <Image 
          source={icon} 
          resizeMode="contain"
          tintColor={focused ? "#fff" : color}
          className="w-6 h-6"
        />
      </View>
    </Animated.View>
  )
}

const TabsLayout = () => {
  return (
    <Tabs screenOptions={{
      tabBarShowLabel: false,
      tabBarInactiveTintColor: '#CDCDE0',
      tabBarStyle: {
        height: 60,
        backgroundColor: '#fff',
        borderTopWidth: 0,
        elevation: 5,
        width: width * 0.9, // 90% of viewport width
        alignSelf: "center", // Center the tab bar
        borderRadius: 20, // Rounded corners
      }
    }}>
      <Tabs.Screen 
        name='Wallet'
        options={{
          title: 'Wallet',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon 
              color={color}
              icon={icons.wallet} 
              focused={focused}
            />
          )
        }}
      />
      <Tabs.Screen 
        name='Cars'
        options={{
          title: 'Cars',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon 
              color={color}
              icon={icons.car}
              focused={focused}
            />
          )
        }}
      />
      <Tabs.Screen 
        name='Home'
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon 
              color={color}
              icon={icons.home} 
              focused={focused}
            />
          )
        }}
      />
      <Tabs.Screen 
        name='Maps'
        options={{
          title: 'Maps',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon 
              color={color}
              icon={icons.location} 
              focused={focused}
            />
          )
        }}
      />
      <Tabs.Screen 
        name='Profile'
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon 
              color={color}
              icon={icons.profile} 
              focused={focused}
            />
          )
        }}
      />
    </Tabs>
  )
}

export default TabsLayout
