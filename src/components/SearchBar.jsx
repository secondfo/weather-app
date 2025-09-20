import { useState } from "react";
import axios from "axios"

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = () => {
        if (location.trim() !== "") {
            console.log(`Searching weather for ${location}`);
        }
    };

    const handleChange = async (e) => {
        setQuery(e.target.value);
        // Implement search logic here (e.g., call an API to get location suggestions)
        if (e.target.value.length > 2) {
            setResults([]);
            return;
        }

        const res = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${e.target.value}&count=5`);
        const data = res.json();

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
        <div className="flex w-1/2">
            <input type="text"
            placeholder="Select Location"
            value={query}
            onChange={handleChange}
            className="p-2 w-full rounded text-black mb-4 bg-[#4f6382]"
        />

        {results.length > 0 && (
            <ul className="">
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