// src/hooks/useWeather.js
export const fetchWeatherData = async (city) => {
    const API_KEY = import.meta.env.VITE_API_KEY;
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=040b67a8187e56a1ba97c2194b95cfe4&units=metric`
      );
      if (!response.ok) throw new Error('City not found');
      return await response.json();
    } catch (error) {
      throw error;
    }
  };
  
  // If you're using a default export, it should be:
  // export default { fetchWeatherData };