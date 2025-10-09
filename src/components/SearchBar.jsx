import React, { useState } from "react";
import axios from "axios";

function SearchBar({ onSelect }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = async (e) => {
    const v = e.target.value;
    setQuery(v);
    if (v.length < 2) {
      setResults([]);
      return;
    }
    setLoading(true);
    try {
      const res = await axios.get(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(v)}&count=6&language=en`
      );
      setResults(res.data.results || []);
    } catch (err) {
      console.error("geocode error", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (city) => {
    setQuery(`${city.name}, ${city.country}`);
    setResults([]);
    // pass helpful fields to parent
    onSelect({
      name: city.name,
      country: city.country,
      latitude: city.latitude,
      longitude: city.longitude,
      admin1: city.admin1,
    });
  };

  return (
    <div className="w-full max-w-lg relative">
      <input
        value={query}
        onChange={handleChange}
        placeholder="Search for a city (e.g. Lagos, London)..."
        className="w-full p-3 rounded-xl bg-white text-black shadow focus:outline-none"
      />
      {loading && <div className="absolute right-4 top-3 text-sm text-gray-600">...</div>}
      {results.length > 0 && (
        <ul className="absolute z-50 w-full bg-white mt-2 rounded-xl shadow max-h-64 overflow-auto">
          {results.map((c, i) => (
            <li
              key={`${c.latitude}-${c.longitude}-${i}`}
              className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(c)}
            >
              <div className="text-sm font-medium">{c.name}{c.admin1 ? `, ${c.admin1}` : ""}</div>
              <div className="text-xs text-gray-600">{c.country}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;