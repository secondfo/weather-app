import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import axios from 'axios';

const Home = () => {
    const navigate = useNavigate();
    const [selectedCity, setSelectedCity] = useState(null);
    const [weather, setWeather] = useState(null);

    // Handle search and navigate to Weather page
   
    const handleSearch = (city) => {
        setSelectedCity(city);
        navigate('/weather', { state: { city } });
    };

    useEffect(() => {
        if (selectedCity) {
            // Fetch weather data for the selected city
            const fetchWeather = async () => {
                try {
                    const { latitude, longitude } = selectedCity;
                    const res = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,weathercode,windspeed_10m&daily=temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum,weathercode,sunrise,sunset,windspeed_10m_max&timezone=auto`);
                    setWeather(res.data);
                } catch (err) {
                    console.error("Error fetching weather data: ", err);
                }
            };

            fetchWeather();
        }
    }, [selectedCity]);

    return (
        <div className="flex flex-col items-center justify-center p-4 text-white h-screen bg-gradient-to-b from-[#535557] to-[#a5a9ad]">
            <div>
            <h1>Weather App</h1>
            <SearchBar onSearch={handleSearch} />
            </div>

            <div>
                <h2>{weather.city}</h2>
                <p>{weather.description}</p>
                <p>{weather.temperature}°</p>
                <p>Windspeed: {weather.windspeed} km/h</p>
                <p>Humidity: {weather.humidity}%</p>
            </div>

            <div>
                <h2>Daily Forecast</h2>
                <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mt-2">
                    {weather && weather.daily && weather.daily.time.map((day, idx) => (
                        <div key={day} className="bg-white/20 rounded-lg p-2">
                            <p>{day}</p>
                            <p>Max: {weather.daily.temperature_2m_max[idx]}°</p>
                            <p>Min: {weather.daily.temperature_2m_min[idx]}°</p>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h2>Hourly Forecast</h2>
                <div>
                    {weather.hourly.time.slice(0,24).map((time, idx) =>(
                        <div>
                            <p>{time.split("T")[1]}</p>
                            <p>{weather.hourly.temperature_2m[idx]}°</p>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h2>Hourly Forecast</h2>
                <div>
                    {weather.hourly.time.slice(0,24).map((time, idx) =>(
                        <div>
                            <p>{time.split("T")[1]}</p>
                            <p>{weather.hourly.temperature_2m[idx]}°</p>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};


export default Home;
