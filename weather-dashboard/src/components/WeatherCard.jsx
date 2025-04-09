// src/components/WeatherCard.jsx
import { WiHumidity, WiStrongWind, WiSunrise, WiSunset } from "react-icons/wi";
import { FaTemperatureHigh, FaTemperatureLow } from "react-icons/fa";

const WeatherCard = ({ data, unit }) => {
  if (!data) return null;

  // Convert temperature based on unit
  const convertTemp = (temp) => {
    return unit === 'celsius' 
      ? Math.round(temp)
      : Math.round((temp * 9/5) + 32);
  };

  // Format time from timestamp
  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      {/* Main Weather Section */}
      <div className="p-8">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {data.name}, {data.sys.country}
            </h2>
            <p className="text-gray-500">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Feels like {convertTemp(data.main.feels_like)}°</p>
            <p className="text-sm text-gray-500 capitalize">{data.weather[0].description}</p>
          </div>
        </div>

        {/* Current Weather */}
        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center">
            <img 
              src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`} 
              alt={data.weather[0].description}
              className="w-24 h-24"
            />
            <span className="text-5xl font-bold ml-2">
              {convertTemp(data.main.temp)}°{unit === 'celsius' ? 'C' : 'F'}
            </span>
          </div>
          <div className="text-right">
            <div className="flex items-center justify-end">
              <FaTemperatureHigh className="text-red-500 mr-1" />
              <span>High: {convertTemp(data.main.temp_max)}°</span>
            </div>
            <div className="flex items-center justify-end mt-1">
              <FaTemperatureLow className="text-blue-500 mr-1" />
              <span>Low: {convertTemp(data.main.temp_min)}°</span>
            </div>
          </div>
        </div>

        {/* Weather Details Grid */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center">
              <WiHumidity className="text-3xl text-blue-500" />
              <div className="ml-2">
                <p className="text-sm text-gray-500">Humidity</p>
                <p className="font-bold">{data.main.humidity}%</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center">
              <WiStrongWind className="text-3xl text-gray-500" />
              <div className="ml-2">
                <p className="text-sm text-gray-500">Wind Speed</p>
                <p className="font-bold">{data.wind.speed} km/h</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center">
              <WiSunrise className="text-3xl text-yellow-500" />
              <div className="ml-2">
                <p className="text-sm text-gray-500">Sunrise</p>
                <p className="font-bold">{formatTime(data.sys.sunrise)}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center">
              <WiSunset className="text-3xl text-orange-500" />
              <div className="ml-2">
                <p className="text-sm text-gray-500">Sunset</p>
                <p className="font-bold">{formatTime(data.sys.sunset)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer with pressure/visibility */}
      <div className="bg-gray-100 px-6 py-4">
        <div className="flex justify-between text-sm">
          <span>Pressure: {data.main.pressure} hPa</span>
          <span>Visibility: {data.visibility / 1000} km</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;