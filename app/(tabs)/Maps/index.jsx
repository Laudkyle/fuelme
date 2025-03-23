import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, StatusBar } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderComponent from "../../../components/HeaderComponent";
import FuelStationSlider from "../../../components/FuelStationSlider";

// Sample filling stations
const stations = [
  {
    id: "1",
    name: "Goiling Filling Station",
    location: "Darkuan Junction",
    latitude: 5.6037,
    longitude: -0.187,
  },
  {
    id: "2",
    name: "Shell Fuel Station",
    location: "Main Street",
    latitude: 5.56,
    longitude: -0.2057,
  },
  {
    id: "3",
    name: "Total Energies",
    location: "Market Road",
    latitude: 5.59,
    longitude: -0.22,
  },
  {
    id: "4",
    name: "Allied Oil",
    location: "East Legon",
    latitude: 5.65,
    longitude: -0.17,
  },
];

// Function to calculate distance between two points (Haversine formula)
const getDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371; // Earth's radius in km

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
};

const Maps = () => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [nearbyStations, setNearbyStations] = useState([]);
  const [region, setRegion] = useState(null); // Track the region dynamically

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission denied");
        return;
      }

      let userLocation = await Location.getCurrentPositionAsync({});
      setLocation(userLocation.coords);
      setLoading(false);

      const filteredStations = stations.filter((station) => {
        const distance = getDistance(
          userLocation.coords.latitude,
          userLocation.coords.longitude,
          station.latitude,
          station.longitude
        );
        return distance <= 5;
      });

      setNearbyStations(filteredStations);

      // Set initial map region based on user location
      setRegion({
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    })();
  }, []);

  // Function to zoom into selected station
  const handleStationPress = (station) => {
    setRegion({
      latitude: station.latitude,
      longitude: station.longitude,
      latitudeDelta: 0.01, // Zoom in closer
      longitudeDelta: 0.01,
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <HeaderComponent text="Filling Stations" />
      <StatusBar backgroundColor="#663AE8" style="light" />

      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#663AE8" />
        </View>
      ) : (
        <View className="flex-1 relative">
          <MapView className="flex-1" region={region} showsUserLocation>
            {stations.map((station) => (
              <Marker
                key={station.id}
                coordinate={{
                  latitude: station.latitude,
                  longitude: station.longitude,
                }}
                title={station.name}
                pinColor="red"
              />
            ))}
          </MapView>

          {/* Fuel Station Slider at Bottom */}
          <View className="absolute bottom-4 left-0 right-0 py-2">
            <FuelStationSlider
              data={stations}
              onStationPress={handleStationPress}
            />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Maps;
