import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import axios from 'axios';
import getBackground from "../utils/getBackground"
import CurrentWeather from '../components/CurrentWeather';
import DailyForecast from '../components/DailyForecast';
import HourlyForecast from '../components/HourlyForecast';


const Home = () => {
    const [weather, setWeather] = useState(null);
    const [background, setBackground] = useState(null);
    const navigate = useNavigate();

      // 🔹 Get current location
    useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;

      const res = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m&daily=temperature_2m_max,temperature_2m_min&timezone=auto`
      );

      const data = res.data;

      setWeather({
        city: "Your Location",
        temperature: data.current_weather.temperature,
        feelsLike: data.current_weather.temperature, // approx
        humidity: 60,
        wind: data.current_weather.windspeed,
        description: "Sunny", // map properly if you want
        daily: data.daily.time.map((d, i) => ({
          date: d,
          max: data.daily.temperature_2m_max[i],
          min: data.daily.temperature_2m_min[i],
        })),
        hourly: data.hourly.time.slice(0, 24).map((t, i) => ({
          time: t.split("T")[1],
          temp: data.hourly.temperature_2m[i],
        })),
      });

      setBackground(getBackground("sunny"));
    });
  }, []);

    // 🔹 Handle search from dropdown
  const handleSearch = (city) => {
    navigate("/weather", { state: { city } });
  };

  return (
    <div className="relative min-h-screen text-white">
      {/* Motion Background */}
      {background && (
        <video autoPlay loop muted className="absolute inset-0 w-full h-full object-cover -z-10">
          <source src={background} type="video/mp4" />
        </video>
      )}
      <div className="flex flex-col items-center pt-24 px-6">
        <SearchBar onSearch={handleSearch} />

        {weather && (
          <>
            <CurrentWeather data={weather} />
            <DailyForecast forecast={weather.daily} />
            <HourlyForecast forecast={weather.hourly} />
          </>
        )}
      </div>
    </div>
  );
}

export default Home;