import { useState } from "react";
//import { useEffect } from "react";
import axios from "axios";


function Hero () {
    const [weather, setWeather] = useState(null);
    const [location, setLocation] = useState("");
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [current, setCurrent] = useState("null");
    const [hourly, setHourly] = useState("null");
    const [daily, setDaily] = useState("null");
   // const [units, setUnits] = useState("metric"); // "metric" for Celsius, "imperial" for Fahrenheit
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=${current}&hourly=${hourly}&daily=${daily}&timezone=auto`;

    const fetchWeather = async () => {
        axios.get(url).then((response) => {
            setWeather(response.weather);
            setCurrent(response.current);
            setLatitude(response.latitude);
            setLongitude(response.longitude);
            setHourly(response.hourly);
            setDaily(response.daily);
           // setUnits(response.units);
            console.log(response.weather);
        });
    }
 
    const handleSearch = () => {
        if (location.trim() !== "") {
            fetchWeather();
        }
    }

    return (
        <>
        <div className="flex flex-col items-center justify-center p-4 text-white h-screen bg-gradient-to-b from-[#535557] to-[#a5a9ad]">
            <h1>Weather App</h1>
            <div className="flex flex-col w-1/2 mt-8">
                <input
                    type="text"
                    placeholder="Enter city "
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    className="p-2 w-full rounded text-black mb-4"
                />
                <button
                    onClick={handleSearch}
                    className="p-2 w-full bg-gray-800 text-white rounded hover:bg-gray-600"
                >
                    Search
                </button>
            </div>
        </div>
        </>
    )
}


export default Hero