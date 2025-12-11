import React, { createContext, useContext, useEffect, useState } from "react";
import api from './api';

const StationContext = createContext();

export const StationProvider = ({ children }) => {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rawStations, setRawStations] = useState([]); // Store raw station data too

  const fetchStations = async () => {
    try {
      const response = await api.get("/stations");
      const stationData = response.data;
      
      // Store raw station data
      setRawStations(stationData);
      console.log("This is station datac",stationData)
      
      // Create options for dropdown
      const stationOptions = stationData.map((station) => ({
        label: station.name || station.code,
        value: station.code,
      }));
      setStations(stationOptions);
    } catch (error) {
      console.error("Error fetching stations:", error);
    } finally {
      setLoading(false);
    }
  };

  // Check if a station exists by various criteria
  const checkStationExist = (input, searchBy = 'code') => {
    if (!input || !rawStations.length) return false;
    
    const searchTerm = input.toString().toLowerCase().trim();
    
    switch(searchBy) {
      case 'code':
        return rawStations.some(station => 
          station.code?.toLowerCase() == searchTerm
        );
      
      case 'name':
        return rawStations.some(station => 
          station.name?.toLowerCase().includes(searchTerm)
        );
      
      case 'id':
        return rawStations.some(station => 
          station.id?.toString() === searchTerm
        );
      
      case 'any':
        // Check by code, name, or id
        return rawStations.some(station => 
          station.code?.toLowerCase() === searchTerm ||
          station.name?.toLowerCase().includes(searchTerm) ||
          station.id?.toString() === searchTerm
        );
      
      default:
        return false;
    }
  };

  // Get station details by code/name/id
  const getStationDetails = (identifier, searchBy = 'code') => {
    if (!identifier || !rawStations.length) return null;
    
    const searchTerm = identifier.toString().toLowerCase().trim();
    
    return rawStations.find(station => {
      switch(searchBy) {
        case 'code':
          return station.code?.toLowerCase() === searchTerm;
        case 'name':
          return station.name?.toLowerCase().includes(searchTerm);
        case 'id':
          return station.id?.toString() === searchTerm;
        case 'any':
          return (
            station.code?.toLowerCase() === searchTerm ||
            station.name?.toLowerCase().includes(searchTerm) ||
            station.id?.toString() === searchTerm
          );
        default:
          return false;
      }
    });
  };

  // Validate if a station is active (optional status field)
  const isStationActive = (stationCode) => {
    const station = getStationDetails(stationCode, 'code');
    return station ? (station.status !== 'inactive' && station.status !== 'closed') : false;
  };

  // Search stations with partial matching
  const searchStations = (query) => {
    if (!query || !rawStations.length) return [];
    
    const searchTerm = query.toLowerCase().trim();
    
    return rawStations.filter(station => 
      station.code?.toLowerCase().includes(searchTerm) ||
      station.name?.toLowerCase().includes(searchTerm)
    );
  };

  // Refresh stations data
  const refreshStations = async () => {
    setLoading(true);
    await fetchStations();
  };

  useEffect(() => {
    fetchStations();
  }, []);

  return (
    <StationContext.Provider value={{ 
      stations, 
      loading, 
      checkStationExist,
      getStationDetails,
      isStationActive,
      searchStations,
      refreshStations,
      rawStations 
    }}>
      {children}
    </StationContext.Provider>
  );
};

export const useStations = () => useContext(StationContext);