import React from "react";
import { cToF, kmhToMph } from "../utils/weatherUtils";

function CurrentWeather({ current, cityName, units = "metric" }) {
  if (!current) return null;

  const temp = units === "metric" ? Math.round(current.temperature) : cToF(current.temperature);
  const feelsLike = units === "metric" ? Math.round(current.apparent_temperature ?? current.temperature) : cToF(current.apparent_temperature ?? current.temperature);
  const wind = units === "metric" ? `${current.windspeed} km/h` : `${kmhToMph(current.windspeed)} mph`;

  return (
    <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 shadow-md text-black max-w-3xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{cityName}</h2>
          <div className="text-5xl font-extrabold">{temp}°</div>
          <div className="mt-1 text-sm text-gray-700">Feels like: {feelsLike}°</div>
          <div className="mt-2 text-sm text-gray-700">Humidity: {current.relativehumidity_2m ?? "—"}%</div>
          <div className="mt-1 text-sm text-gray-700">Wind: {wind}</div>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-700 mb-2">Updated</div>
          <div className="text-xs text-gray-700">{new Date(current.time).toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
}

export default CurrentWeather;