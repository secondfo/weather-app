import { useState } from "react";
import axios from "axios";

const SearchBar = ({onSearch}) => {
    
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleChange = async (e) => {
        const value = e.target.value;
        setQuery(value);

        if (value.length < 2) {
            setResults([]);
            return;
        }

        setLoading(true);

        try {
            const res = await axios.get(
                `https://geocoding-api.open-meteo.com/v1/search?name=${value}&count=5&language=en&format=json`
            );

        setResults(res.data.results || []);
        } catch (err) {
        console.error("Error fetching cities:", err);
        }

        setLoading(false);
  };

    const handleSelect = (city) => {
        setQuery(city.name); // show selected city in input
        setResults([]);
        onSearch({
          name: city.name,
          country: city.country,
          lat: city.latitude,
          lon: city.longitude,
        }); // pass selected city up
  };



    return (
        <div className="flex w-1/2 mt-8 flex-col">
            <input type="text"
            placeholder="Select Location"
            value={query}
            onChange={handleChange}
            className="p-2 w-full rounded text-black mb-4 bg-white"
        />

        {loading && (
        <div className="absolute right-3 top-3 text-gray-500 text-sm">...</div>
      )}

      {results.length > 0 && (
        <ul className="absolute w-full bg-white rounded-xl mt-1 shadow-md z-50 max-h-60 overflow-y-auto">
          {results.map((city, i) => (
            <li
              key={i}
              className="p-3 hover:bg-gray-200 cursor-pointer"
              onClick={() => handleSelect(city)}
            >
             {city.name}, {city.country}{" "}
              {city.admin1 ? `(${city.admin1})` : ""}
            </li>
          ))}
        </ul>
      )}   
          
        <button 
            onClick={() => onSearch(query)}
            className="p-2 bg-gray-800 text-white rounded hover:bg-gray-600"
        > 
            Search
        </button>


        </div>
    );
}
               

export default SearchBar;