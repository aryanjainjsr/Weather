import { useState, useEffect } from 'react';
import CitySearch from './components/CitySearch';
import WeatherCard from './components/WeatherCard';
import SearchHistory from './components/SearchHistory';
import Loader from './components/Loader';
import ErrorDisplay from './components/ErrorDisplay';
import { fetchWeatherData } from '../src/useWeather';

function App() {
  const [weather, setWeather] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [recentSearches, setRecentSearches] = useState([]);
  const [tempUnit, setTempUnit] = useState('celsius');

  // Load search history from local storage on first render
  useEffect(() => {
    const historyFromStorage = localStorage.getItem('weatherSearches');
    if (historyFromStorage) {
      setRecentSearches(JSON.parse(historyFromStorage));
    }
  }, []);

  // Save updated search history to local storage
  useEffect(() => {
    localStorage.setItem('weatherSearches', JSON.stringify(recentSearches));
  }, [recentSearches]);

  // Fetch and display weather data
  const searchCityWeather = async (cityName) => {
    setIsFetching(true);
    setFetchError(null);

    try {
      const weatherInfo = await fetchWeatherData(cityName);
      setWeather(weatherInfo);

      // Update search history with uniqueness
      setRecentSearches(prev => {
        const uniqueHistory = [cityName, ...prev.filter(item => item.toLowerCase() !== cityName.toLowerCase())];
        return uniqueHistory.slice(0, 5);
      });

    } catch (err) {
      setFetchError(err.message || "Something went wrong");
    } finally {
      setIsFetching(false);
    }
  };

  // Refresh weather data for the current city
  const refreshCurrentCity = () => {
    if (weather?.name) {
      searchCityWeather(weather.name);
    }
  };

  // Toggle temperature units
  const handleUnitToggle = () => {
    setTempUnit(prev => (prev === 'celsius' ? 'fahrenheit' : 'celsius'));
  };

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-slate-900 mb-12">
          🌦️ Weather Dashboard
        </h1>

        <CitySearch onSearch={searchCityWeather} className="text-center justify-center" />

        <section className="mt-6">
          {isFetching && <Loader />}
          {fetchError && <ErrorDisplay message={fetchError} />}
          {weather && (
            <div className="space-y-6">
              <WeatherCard data={weather} unit={tempUnit} />

              <div className="flex gap-4 justify-center mt-4 flex-wrap">
                <button
                  onClick={refreshCurrentCity}
                  className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
                >
                  🔄 Refresh Weather
                </button>
                <button
                  onClick={handleUnitToggle}
                  className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700 transition"
                >
                  Convert to {tempUnit === 'celsius' ? '°F' : '°C'}
                </button>
              </div>
            </div>
          )}
        </section>

        <section className="mt-10">
          <SearchHistory
            history={recentSearches}
            onSelect={searchCityWeather}
          />
        </section>
      </div>
    </main>
  );
}

export default App;
