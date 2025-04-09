import { useState } from 'react';

const CitySearch = ({ onSearch }) => {
  const [cityName, setCityName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedCity = cityName.trim();
    if (trimmedCity) onSearch(trimmedCity);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <input
        type="text"
        value={cityName}
        onChange={(e) => setCityName(e.target.value)}
        placeholder="Enter city name"
        className="p-2 border mr-2"
      />
      <button type="submit" className="p-2 bg-blue-500 text-white">
        Search
      </button>
    </form>
  );
};

export default CitySearch;