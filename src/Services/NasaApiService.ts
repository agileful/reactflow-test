import axios from "axios";

const NASA_API_KEY =
  process.env.REACT_APP_NASA_API_KEY ||
  "LQIDgqQA9K7PqehYU3qFZBGiX4J5Fb6xOHHnA04A";

const NasaApiService = {
  getNearEarthObjects: async () => {
    try {
      const response = await axios.get(
        `https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=${NASA_API_KEY}`
      );
      return response.data.near_earth_objects;
    } catch (error) {
      throw new Error("Error fetching NEO data");
    }
  },
};

export default NasaApiService;
