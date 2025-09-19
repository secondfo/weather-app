const CurrentWeather = ({data, location}) => {

    return (
        <div>
           <h2>{location}</h2>
           <div>
            {/*Icons */}

            <img src="" alt="weather icons"
            className="w-20 h-20" />
            <div>
                {/*details */}
                <p>{data.temparature}</p>
                <p>Feels like: {data.apparent_temparature}</p>
                <p>Humidity: {data.humidity}</p>
                <p>wind speed: data.wind_speed</p>
            </div>
           </div>
        </div>
    );
}

export default CurrentWeather;