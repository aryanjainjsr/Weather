export default function WeatherDisplay({ data, unit }) {
    const temp = unit === 'celsius' 
      ? Math.round(data.main.temp) 
      : Math.round(data.main.temp * 9/5 + 32);
  
    return (
      <div className="weather-card bg-white p-6 rounded-lg shadow-md mt-4">
        <h2 className="text-2xl font-bold">
          {data.name}, {data.sys.country}
        </h2>
        <div className="flex items-center justify-between mt-4">
          <div>
            <p className="text-4xl font-bold">{temp}°{unit === 'celsius' ? 'C' : 'F'}</p>
            <p className="text-gray-600 capitalize">{data.weather[0].description}</p>
          </div>
          <img 
            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} 
            alt={data.weather[0].description}
            className="w-20 h-20"
          />
        </div>
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-gray-100 p-3 rounded">
            <p>Humidity</p>
            <p className="font-bold">{data.main.humidity}%</p>
          </div>
          <div className="bg-gray-100 p-3 rounded">
            <p>Wind Speed</p>
            <p className="font-bold">{data.wind.speed} km/h</p>
          </div>
        </div>
      </div>
    );
  }