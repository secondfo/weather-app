
const CurrentWeather = ({ weather, city }) => {
  return (
    <div className="text-center p-6 bg-white/20 backdrop-blur-md rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold">{city}</h2>
      <p className="text-lg">{weather.temperature}°</p>
      <p className="text-sm">Feels like: {weather.apparent_temperature}°</p>
      <p className="text-sm">Humidity: {weather.humidity}%</p>
      <p className="text-sm">Wind: {weather.windspeed} km/h</p>
    </div>
  );
}

export default CurrentWeather; 