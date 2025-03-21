import { View, Image, Animated } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { Tabs } from 'expo-router'
import { icons } from '../../constants' 

// TabIcon Component with Smooth Transition
const TabIcon = ({ icon, focused, color }) => {
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: focused ? -30 : 0, 
      duration: 1000, 
      useNativeDriver: true,
    }).start();
  }, [focused]);

  return (
    <Animated.View style={{ transform: [{ translateY }] }} className="items-center justify-center">
      <View className={`p-3 rounded-full ${focused ? "bg-purple-100" : "bg-transparent"}`}>
        <Image 
          source={icon} 
          resizeMode="contain"
          tintColor={focused ? "#fff" : color}
          className="w-7 h-7 "
        />
      </View>
    </Animated.View>
  );
};

// TabsLayout Component
const TabsLayout = () => {
  return (
    <Tabs screenOptions={{
      tabBarShowLabel: false,
      tabBarInactiveTintColor: '#CDCDE0',
      tabBarStyle: {
        height: 65,
        backgroundColor: '#fff',
        borderTopWidth: 0,
        borderRadius:32,
        width:'80%',
        margin:"auto",
        marginBottom:10,
        elevation: 10
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
  );
};

export default TabsLayout;
