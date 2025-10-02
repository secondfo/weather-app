import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

import CurrentWeather from "../components/CurrentWeather";
// import Forecast from "../components/Forecast";

const Weather = () => {
    const { state } = useLocation();
    const { city } = state; // FIXED

    const [weather, setWeather] = useState(null); // FIXED
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [units, setUnits] = useState("metric");

    useEffect(() => {
        if (!city) return;

        const fetchWeather = async () => {
            try {
                const { latitude, longitude } = city;
                const res = await axios.get(
                    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,weathercode,windspeed_10m&daily=temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum,weathercode,sunrise,sunset,windspeed_10m_max&timezone=auto&temperature_unit=${units}&windspeed_unit=auto&precipitation_unit=auto`
                );
                setWeather(res.data); // FIXED
                setLoading(false);
            } catch (err) {
                setError(err.message || "Failed to fetch weather data.");
                setLoading(false);
            }
        };
        fetchWeather();
    }, [city, units]);

    if (!city) return <p className="text-center text-gray-400">No city selected. Please go back to the home page and select a city.</p>;
    if (loading) return <p className="text-center text-gray-400">Loading Weather Data...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;
    if (!weather) return null;

    const weatherCode = weather.current_weather.weathercode;
    let bgClass = "bg-sky-400"; // Default clear sky
    if (weatherCode >= 50 && weatherCode <= 69) bgClass = "bg-gray-600"; // Rain
    if (weatherCode >= 70 && weatherCode <= 79) bgClass = "bg-slate-400"; // Snow
    if (weatherCode >= 80) bgClass = "bg-indigo-700"; // Thunderstorm
    if (weatherCode >= 20 && weatherCode <= 29) bgClass = "bg-gray-400"; // Fog

    return (
        <div className={`container mx-auto p-4 ${bgClass}`}>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">
                    {city.name}, {city.country}
                </h1>
                <p className="text-xl font-semibold">
                    {weather.current_weather.temperature}° {units === "metric" ? "C" : "F"}
                </p>
                <p>
                    Feels like: {weather.hourly.temperature_2m[0]}°
                </p>
            </div>

            <h3 className="text-xl font-semibold mt-6">7-Day Forecast</h3>
            <div className="grid grid-cols-2 md:grid-cols-7 gap-4 mt-2">
                {weather.daily.time.map((day, idx) => (
                    <div key={day} className="bg-white/20 rounded-lg p-2">
                        <p>{day}</p>
                        <p>
                            {weather.daily.temperature_2m_min[idx]}° / {weather.daily.temperature_2m_max[idx]}°
                        </p>
                    </div>
                ))}
            </div>

            <h3 className="text-xl font-semibold mt-6">Hourly Forecast</h3>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mt-2">
                {weather.hourly.time.slice(0, 24).map((hour, idx) => (
                    <div key={hour} className="bg-white/20 rounded-lg p-2">
                        <p>{hour.split("T")[1].split(":")[0]}:00</p>
                        <p>{weather.hourly.temperature_2m[idx]}°</p>
                    </div>
                ))}
            </div>

            <button
                onClick={() => setUnits(units === "metric" ? "imperial" : "metric")}
                className="mt-6 bg-transparent border border-white text-black px-4 py-2 rounded hover:bg-white hover:text-gray-200 transition"
            >
                Switch to {units === "metric" ? "Imperial" : "Metric"}
            </button>
        </div>
    );
};

export default Weather;