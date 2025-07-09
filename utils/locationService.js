// utils/locationService.js
import axios from 'axios';

export const getPlaceIdFromCoords = async (latitude, longitude) => {
  try {
    const apiKey = process.env.EXPO_PUBLIC_GOOGLE_MAPS_KEY;
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
    );
    if (response.data && response.data.results.length > 0) {
      return response.data.results[0].place_id;
    }
  } catch (error) {
    console.error('Error fetching Place ID: ', error);
    return null;
  }
};
