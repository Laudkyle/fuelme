import React, { createContext, useContext, useEffect, useState } from "react";
import api from './api'
const StationContext = createContext();

export const StationProvider = ({ children }) => {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStations = async () => {
    try {
      const response = await api.get("/stations");
      const stationOptions = response.data.map((station) => ({
        label: station.station_name || station.code,
        value: station.code,
      }));
      setStations(stationOptions);
    } catch (error) {
      console.error("Error fetching stations:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStations();
  }, []);

  return (
    <StationContext.Provider value={{ stations, loading }}>
      {children}
    </StationContext.Provider>
  );
};

export const useStations = () => useContext(StationContext);
