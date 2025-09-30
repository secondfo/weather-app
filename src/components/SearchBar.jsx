import { useState } from "react";
import axios from "axios"

const SearchBar = ({onSearch}) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleChange = async (e) => {
        const value = e.target.value;
        setQuery(value);

        if (value.length > 2) {
            try {
                const res = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${value}&count=5`);
                
                setResults(res.data.results || []);
            
            } catch (err) {
                console.error("Error fetching cities: ", err);
            }
        } else {
            setResults([]);
        }

              
    };

    const handleSelect = (city) => {
            setQuery(city.name + ", " + city.country);
            setResults([]);
            onSearch(city);
        };
 


    return (
        <div className="flex w-1/2 mt-8 flex-col">
            <input type="text"
            placeholder="Select Location"
            value={query}
            onChange={handleChange}
            className="p-2 w-full rounded text-black mb-4 bg-white"
        />

        {results.length > 0 && (
            <ul className="absolute top-full left-0 right-0 bg-white border rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
               {results.map((city) => (
                <li 
                    key={city.id || city.name}
                    onClick={() => handleSelect(city)}
                    className="cursor-pointer hover:bg-gray-200"
                >
                    {city.name}, {city.country}
                </li>
               ) )}
                
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