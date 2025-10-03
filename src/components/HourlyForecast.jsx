// src/components/HourlyForecast.jsx
export default function HourlyForecast({ hours }) {
  return (
    <div className="flex gap-4 overflow-x-auto mt-6 p-2">
      {hours.map((hour, i) => (
        <div
          key={i}
          className="p-4 min-w-[80px] bg-white/20 backdrop-blur-md rounded-xl shadow-md text-center"
        >
          <p>{hour.time}</p>
          <p>{hour.temp}°</p>
        </div>
      ))}
    </div>
  );
}
