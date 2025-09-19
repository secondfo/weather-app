import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import CurrentWeather from "../components/CurrentWeather";
// import Forecast from "../components/Forecast";

const Weather = () => {
    const { location } = useParams();
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [units, setUnits] = useState("metric"); // "metric" for Celsius, "imperial" for Fahrenheit

    useEffect(() => {
        async function fetchWeather() {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${location}&count=1`);
                if (!response.data.results || response.data.results.length === 0) return;

                const { latitude, longitude, name, country } = response.data.results[0];

                const weatherResponse = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,weathercode,windspeed_10m&daily=temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum,weathercode,sunrise,sunset,windspeed_10m_max&timezone=auto&temperature_unit=${units}&windspeed_unit=auto&precipitation_unit=auto`);

                setWeatherData({
                    location: `${name}, ${country}`,
                    current: weatherResponse.data.current_weather,
                    hourly: weatherResponse.data.hourly,
                    daily: weatherResponse.data.daily
                });
            } catch (err) {
                setError("Failed to fetch weather data. Please try again.", err);
            } finally {
                setLoading(false);
            }
        }

        fetchWeather();
    }, [location, units]);

    const toggleUnits = () => {
        setUnits(units === "metric" ? "imperial" : "metric");
    };

    if (loading) return <p className="text-center text-gray-400">Loading Weather Data...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;
    if (!weatherData) return null;

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">{weatherData.location}</h1>
                {/* <button onClick={toggleUnits}>Toggle Units</button> */}
            </div>
            <CurrentWeather data={weatherData.current} units={units} />
            {/* <Forecast daily={weatherData.daily} hourly={weatherData.hourly} units={units} /> */}
        </div>
    );
};

export default Weather;