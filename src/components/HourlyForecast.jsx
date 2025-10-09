import React from "react";

export default function HourlyForecast({ hourly, units = "metric", timezone }) {
  if (!hourly) return null;

  // Show next 24 hours from current time index (we will slice in page)
  const times = hourly.time.slice(0, 24);
  const temps = hourly.temperature_2m.slice(0, 24);

  return (
    <div className="mt-6 max-w-6xl mx-auto">
      <h3 className="text-lg font-semibold mb-3">Hourly (next 24h)</h3>
      <div className="flex gap-3 overflow-x-auto pb-3">
        {times.map((t, i) => (
          <div key={t} className="min-w-[80px] bg-white/20 p-2 rounded-xl text-center text-black">
            <div className="text-sm">{new Date(t).toLocaleTimeString([], { hour: "numeric", hour12: true, timeZone: timezone })}</div>
            <div className="text-lg font-bold mt-1">{Math.round(temps[i])}°</div>
          </div>
        ))}
      </div>
    </div>
  );
}
