import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import SearchBar from '../components/SearchBar';

const Home = () => {
    const navigate = useNavigate();
    const [selectedCity, setSelectedCity] = useState(null);
   
    const handleSearch = (city) => {
        setSelectedCity(city);
        navigate('/weather', { state: { city } });
    };

    return (
        <div className="flex flex-col items-center justify-center p-4 text-white h-screen bg-gradient-to-b from-[#535557] to-[#a5a9ad]">
            <h1>Weather App</h1>
            <SearchBar onSearch={handleSearch} />
        </div>
    );
};


export default Home;
