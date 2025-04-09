const SearchHistory = ({ history, onSelect }) => {
    if (!history || history.length === 0) return null;
  
    return (
      <div className="mt-4">
        <h3 className="font-medium mb-2">Recent Searches:</h3>
        <div className="flex gap-2">
          {history.map((city, index) => (
            <button
              key={index}
              onClick={() => onSelect(city)}
              className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200"
            >
              {city}
            </button>
          ))}
        </div>
      </div>
    );
  };
  
  export default SearchHistory;