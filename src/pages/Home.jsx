import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import Background from "../components/Background";
import CurrentWeather from "../components/CurrentWeather";
import DailyForecast from "../components/DailyForecast";
import HourlyForecast from "../components/HourlyForecast";
import UnitToggle from "../components/UnitToggle";

export default function Home() {
  const [data, setData] = useState(null); // raw api response
  const [units, setUnits] = useState("metric");
  const navigate = useNavigate();

  useEffect(() => {
    // get current location weather
    if (!("geolocation" in navigator)) {
      console.warn("Geolocation not available");
      return;
    }

    navigator.geolocation.getCurrentPosition(async (pos) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;

      try {
        const res = await axios.get(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
          `&current_weather=true` +
          `&hourly=temperature_2m,apparent_temperature,relativehumidity_2m,precipitation,weathercode,windspeed_10m` +
          `&daily=temperature_2m_max,temperature_2m_min,weathercode,sunrise,sunset` +
          `&timezone=auto`
        );
        setData(res.data);
      } catch (err) {
        console.error(err);
      }
    }, (err) => {
      console.error("geolocation error", err);
    });
  }, []);

  const handleSearch = (cityObj) => {
    // cityObj contains name, latitude, longitude
    navigate("/weather", { state: { city: cityObj, units } });
  };

  return (
    <div className="relative min-h-screen">
      {/* Background based on API data */}
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
          <h1 className="text-3xl font-bold text-white">Weather App</h1>
          <UnitToggle units={units} setUnits={setUnits} />
        </div>

        <SearchBar onSelect={handleSearch} />

        {data ? (
          <>
            <div className="mt-6">
              <CurrentWeather current={data.current_weather} cityName={"Your location"} units={units} />
              <DailyForecast daily={data.daily} units={units} />
              <HourlyForecast hourly={data.hourly} units={units} timezone={data.timezone} />
            </div>
          </>
        ) : (
          <p className="mt-6 text-white">Loading local weather…</p>
        )}
      </div>
    </div>
  );
}
