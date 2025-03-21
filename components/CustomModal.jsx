import { View, Modal as RNModal,TouchableOpacity,Text } from "react-native";
import React from "react";
import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
  ScrollView as GHScrollView,
} from "react-native-gesture-handler";

const CustomModal = ({ orderModalVisible, setOrderModalVisible, content,handleConfirm ,title}) => {
  // Gesture handler specifically for the handle indicator
  const indicatorGesture = Gesture.Pan()
    .runOnJS(true)
    .onUpdate((event) => {
      if (event.translationY > 50) {
        setOrderModalVisible(false);
      }
    })
    .activeOffsetY([5, 5]);

  return (
    <RNModal
      transparent={true}
      visible={orderModalVisible}
      animationType="slide"
      onRequestClose={() => setOrderModalVisible(false)}
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View className="flex-1 justify-end ">
          <View className="bg-[#40444b] w-full rounded-t-2xl p-4">
            {/* Handle indicator with gesture */}
            <GestureDetector gesture={indicatorGesture}>
              <View className="w-48 h-2 bg-gray-300 rounded-full mx-auto mb-4" />
            </GestureDetector>

            {/* Use GHScrollView for the content */}
            <GHScrollView
              className="min-h-[20vh]"
              bounces={false}
              showsVerticalScrollIndicator={true}
            >
              <View className="items-center justify-center">{content}</View>
              {handleConfirm&&(<View className="flex-row justify-between mt-4  space-x-4">
                <TouchableOpacity
                  className="flex-1 bg-secondary-100 p-2 rounded-3xl"
                  onPress={() => {
                    setOrderModalVisible(false);
                  }}
                >
                  <Text className="text-center text-white font-semibold text-lg">
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="flex-1 bg-secondary-100 p-2 rounded-3xl"
                  onPress={handleConfirm}
                >
                  <Text className="text-center text-white font-semibold text-lg">
                   { title?? 'Confirm'}
                  </Text>
                </TouchableOpacity>
              </View>)}
            </GHScrollView>
          </View>
        </View>
      </GestureHandlerRootView>
    </RNModal>
  );
};

export default CustomModal;
