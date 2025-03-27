import api from "../api"; // Import the configured API instance

const fetchStations = async () => {
  try {
    const response = await api.get("/stations");
    console.log("Stations:", response.data);
    return response.data; // Return the fetched stations
  } catch (error) {
    console.error("Error fetching stations:", error);
    return [];
  }
};

export default fetchStations;
