// src/components/DailyForecast.jsx
export default function DailyForecast({ forecast }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4 mt-6">
      {forecast.map((day, i) => (
        <div
          key={i}
          className="p-4 bg-white/20 backdrop-blur-md rounded-xl shadow-md text-center"
        >
          <p>{day.date}</p>
          <p className="font-bold">{day.temp_max}° / {day.temp_min}°</p>
        </div>
      ))}
    </div>
  );
}
