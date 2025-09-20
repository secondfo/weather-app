import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import axios from 'axios';

const Home = () => {
    const [location, setLocation] = useState('');
    const [weatherData, setWeatherData] = useState(null);

    async function fetchWeather() {
        setLocation()

        const response = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&hourly=temperature_2m,weathercode&timezone=auto`
    );
        const data = response.data;
        setWeatherData(data);
    }

    
    return (
        <div className="flex flex-col items-center justify-center p-4 text-white h-screen bg-gradient-to-b from-[#535557] to-[#a5a9ad]">
            <h1>Weather App</h1>
           
            </div>
        </div>
    );
};

export default Home;
