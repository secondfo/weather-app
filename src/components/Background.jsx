import React, { useMemo } from "react";
import {
  weatherCodeToCondition,
  isWithinMinutes,
  isDaytime,
} from "../utils/weatherutils";

/**
 * props:
 * - weatherCode (number)
 * - currentTime ISO string (e.g. data.current_weather.time)
 * - sunrise ISO string (daily.sunrise[0])
 * - sunset ISO string (daily.sunset[0])
 */
export default function Background({ weatherCode, currentTime, sunrise, sunset }) {
  const src = useMemo(() => {
    if (!currentTime || !sunrise || !sunset) return "/videos/sunny-day.mp4";

    // determine if it's sunrise, sunset, day, or night
    if (isWithinMinutes(currentTime, sunrise, 60)) return "/videos/sunrise.mp4";
    if (isWithinMinutes(currentTime, sunset, 60)) return "/videos/sunset.mp4";

    const day = isDaytime(currentTime, sunrise, sunset);

    const cond = weatherCodeToCondition(weatherCode);

    // map cond+day to file
    if (cond === "clear") return day ? "/videos/sunny-day.mp4" : "/videos/clear-night.mp4";
    if (cond === "partly-cloudy" || cond === "fog") return day ? "/videos/cloudy-day.mp4" : "/videos/cloudy-night.mp4";
    if (cond === "drizzle" || cond === "rain" || cond === "thunder") return day ? "/videos/rainy-day.mp4" : "/videos/rainy-night.mp4";
    if (cond === "snow") return day ? "/videos/snowy-day.mp4" : "/videos/snowy-night.mp4";

    return day ? "/videos/sunny-day.mp4" : "/videos/clear-night.mp4";
  }, [weatherCode, currentTime, sunrise, sunset]);

  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      className="fixed inset-0 w-full h-full object-cover -z-20"
      src={src}
    />
  );
}
