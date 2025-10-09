
export default function DailyForecast({ daily, units = "metric" }) {
  if (!daily) return null;

  return (
    <div className="mt-6 max-w-6xl mx-auto">
      <h3 className="text-lg font-semibold mb-3">7-Day Forecast</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
        {daily.time.map((d, i) => (
          <div key={d} className="bg-white/20 p-3 rounded-xl text-center text-black">
            <div className="font-medium">{new Date(d).toLocaleDateString(undefined, { weekday: "short" })}</div>
            <div className="mt-2 text-lg font-bold">{Math.round(daily.temperature_2m_max[i])}°</div>
            <div className="text-sm text-gray-700">Low {Math.round(daily.temperature_2m_min[i])}°</div>
          </div>
        ))}
      </div>
    </div>
  );
}
