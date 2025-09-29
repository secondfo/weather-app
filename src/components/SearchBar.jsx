import { useState } from "react";
import axios from "axios"

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = () => {
        if (query.trim() !== "") {
            console.log("Searching for:", query);
        }
    };

    const handleChange = async (e) => {
        const value = e.target.value;
        setQuery(value);

        if (value.length > 2) {
            setResults([]);
            return;
        }

        const res = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${value}&count=5`);
        const data = await res.json();

        if (data.results) {
            setResults(data.results);
        } else {
            setResults([]);
        }
    }


    const handleSelect = (city) => {
        setQuery(city.name + ", " + city.country);
        setResults([]);
        onselect(city);
    }



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
                <li key={city.id}
                onClick={() => handleSelect(city)}
                className="cursor pointer"
                >
                    {city.name}, {city.country}
                </li>
            </ul>
        )}
        <button onClick={handleSearch}
        className="p-2 bg-gray-800 text-white rounded hover:bg-gray-600">Search</button>
        </div>
    )
}
               

export default SearchBar;