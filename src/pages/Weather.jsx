import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Background from "../components/Background";
import CurrentWeather from "../components/CurrentWeather";
import DailyForecast from "../components/DailyForecast";
import HourlyForecast from "../components/HourlyForecast";
import UnitToggle from "../components/UnitToggle";

function Weather() {
  const location = useLocation();
  const navigate = useNavigate();
  const city = location.state?.city;
  const initialUnits = location.state?.units ?? "metric";
  const [units, setUnits] = useState(initialUnits);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!city) {
      // if user directly visited /weather, send them back home
      navigate("/", { replace: true });
      return;
    }

    const fetchWeather = async () => {
      try {
        const res = await axios.get(
          `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}` +
          `&current_weather=true` +
          `&hourly=temperature_2m,apparent_temperature,relativehumidity_2m,precipitation,weathercode,windspeed_10m` +
          `&daily=temperature_2m_max,temperature_2m_min,weathercode,sunrise,sunset` +
          `&timezone=auto`
        );
        setData(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchWeather();
  }, [city, navigate]);

  if (!city) return null;

  return (
    <div className="relative min-h-screen">
      {/* Background */}
      {data && data.current_weather && (
        <Background
          weatherCode={data.current_weather.weathercode}
          currentTime={data.current_weather.time}
          sunrise={data.daily.sunrise[0]}
          sunset={data.daily.sunset[0]}
        />
      )}

      <div className="relative z-10 pt-24 px-4 pb-12 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-white">
            {city.name}{city.admin1 ? `, ${city.admin1}` : ""} • {city.country}
          </h1>
          <UnitToggle units={units} setUnits={setUnits} />
        </div>

        {data ? (
          <>
            <CurrentWeather current={data.current_weather} cityName={`${city.name}, ${city.country}`} units={units} />
            <DailyForecast daily={data.daily} units={units} />
            <HourlyForecast hourly={data.hourly} units={units} timezone={data.timezone} />
          </>
        ) : (
          <p className="text-white">Loading weather for {city.name}…</p>
        )}
      </div>
    </div>
  );
}

export default Weather;