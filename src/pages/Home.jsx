import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [city, setCity] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        if (city.trim() !== "") {
            navigate(`/weather/${city.trim()}`);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center p-4 text-white h-screen bg-gradient-to-b from-[#535557] to-[#a5a9ad]">
            <h1>Weather App</h1>
            <div className="flex flex-col w-1/2 mt-8">
                <input
                    type="text"
                    placeholder="Enter city name"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    className="p-2 w-full rounded text-black mb-4"
                />
                <button
                    onClick={handleSearch}
                    className="p-2 w-full bg-gray-800 text-white rounded hover:bg-gray-600"
                >
                    Search
                </button>
            </div>
        </div>
    );
};

export default Home;
