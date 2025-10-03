import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import CurrentWeather from "../components/CurrentWeather";
import DailyForecast from "../components/DailyForecast";
import HourlyForecast from "../components/HourlyForecast";
import UnitsToggle from "../components/UnitsToggle";
import getBackground from "../utils/getBackground";

const Weather = () => {
  const location = useLocation();
  const city = location.state?.city;
  const [weather, setWeather] = useState(null);
  const [background, setBackground] = useState(null);
  const [unit, setUnit] = useState("metric");

  useEffect(() => {
    if (!city) return;

    // 🔹 Step 1: Get coordinates of the city
    axios
      .get(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`)
      .then((geoRes) => {
        const { latitude, longitude } = geoRes.data.results[0];

        // 🔹 Step 2: Get weather for that city
        return axios.get(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m&daily=temperature_2m_max,temperature_2m_min&timezone=auto`
        );
      })
      .then((res) => {
        const data = res.data;

        const weatherData = {
          city,
          temperature: data.current_weather.temperature,
          feelsLike: data.current_weather.temperature,
          humidity: 60,
          wind: data.current_weather.windspeed,
          description: "Cloudy",
          daily: data.daily.time.map((d, i) => ({
            date: d,
            max: data.daily.temperature_2m_max[i],
            min: data.daily.temperature_2m_min[i],
          })),
          hourly: data.hourly.time.slice(0, 24).map((t, i) => ({
            time: t.split("T")[1],
            temp: data.hourly.temperature_2m[i],
          })),
        };

        setWeather(weatherData);
        setBackground(getBackground(weatherData.description.toLowerCase()));
      });
  }, [city, unit]);

  if (!weather) return <p className="text-white">Loading...</p>;

  return (
    <div className="relative min-h-screen text-white">
      {/* Motion Background */}
      {background && (
        <video autoPlay loop muted className="absolute inset-0 w-full h-full object-cover -z-10">
          <source src={background} type="video/mp4" />
        </video>
      )}

      <div className="p-6 pt-24">
        <UnitsToggle unit={unit} onChange={setUnit} />
        <CurrentWeather data={weather} />
        <DailyForecast forecast={weather.daily} />
        <HourlyForecast forecast={weather.hourly} />
      </div>
    </div>
  );
}


export default Weather;
