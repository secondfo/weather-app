// src/utils/weatherUtils.js

// Map open-meteo weather codes into high-level conditions
export const weatherCodeToCondition = (code) => {
  // groups based on Open-Meteo weathercodes
  if ([0, 1].includes(code)) return "clear";
  if ([2, 3].includes(code)) return "partly-cloudy";
  if ([45, 48].includes(code)) return "fog"; // treat as cloudy
  if ([51, 53, 55, 56, 57].includes(code)) return "drizzle";
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return "rain";
  if ([71, 73, 75, 77, 85, 86].includes(code)) return "snow";
  if ([95, 96, 99].includes(code)) return "thunder";
  return "clear";
};

// Convert metric temperature to imperial (°C -> °F)
export const cToF = (c) => Math.round((c * 9) / 5 + 32);

// Convert km/h to mph
export const kmhToMph = (kph) => (kph * 0.621371).toFixed(1);

// Convert mm to inches
export const mmToIn = (mm) => (mm * 0.0393701).toFixed(2);

// Check if now is within +/- minutes of a reference time
export const isWithinMinutes = (nowISO, refISO, minutes = 60) => {
  const now = new Date(nowISO).getTime();
  const ref = new Date(refISO).getTime();
  const diff = Math.abs(now - ref);
  return diff <= minutes * 60 * 1000;
};

// Check if day (between sunrise and sunset)
export const isDaytime = (nowISO, sunriseISO, sunsetISO) => {
  const now = new Date(nowISO).getTime();
  const sunrise = new Date(sunriseISO).getTime();
  const sunset = new Date(sunsetISO).getTime();
  return now >= sunrise && now < sunset;
};
