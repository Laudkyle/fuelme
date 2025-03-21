import { View, Text, Dimensions } from "react-native";
import React from "react";
import { LineChart } from "react-native-chart-kit";

const RefuelingHistoryChart = () => {
  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        data: [30, 50, 40, 80, 60, 100], // Fuel refilled in liters
        strokeWidth: 2, // Line thickness
      },
    ],
  };

  return (
    <View className="p-4 bg-white rounded-2xl shadow-md">
      <Text className="text-sm font-pregular text-left mb-2">Refueling History</Text>
      <LineChart
        data={chartData}
        width={Dimensions.get("window").width - 40} // Responsive width
        height={220}
        yAxisSuffix="L" // Label in Liters
        chartConfig={{
          backgroundColor: "#ffffff",
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          decimalPlaces: 0, // No decimal values
          color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`, // Line color
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          propsForDots: {
            r: "4",
            strokeWidth: "2",
            stroke: "#007AFF",
          },
        }}
        bezier // Smooth curve
        style={{
          borderRadius: 10,
          marginVertical: 10,
        }}
      />
    </View>
  );
};

export default RefuelingHistoryChart;
