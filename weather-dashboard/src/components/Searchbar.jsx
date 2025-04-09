import { useState } from 'react';

const CitySearch = ({ onCitySearch }) => {
  const [cityName, setCityName] = useState('');

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const trimmedCity = cityName.trim();
    
    if (trimmedCity) {
      onCitySearch(trimmedCity);
    }
  };

  return (
    <div className="max-w-md mx-auto p-5">
      <form onSubmit={handleSearchSubmit} className="flex gap-2">
        <input
          type="text"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
          placeholder="Enter city name"
          className="flex-1 px-4 py-2 text-gray-700 border-2 border-gray-200 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
          aria-label="Enter city name"
        />
        <button
          type="submit"
          className="px-10 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-colors shadow-sm"
          aria-label="Search weather"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default CitySearch;