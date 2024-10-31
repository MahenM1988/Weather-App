// src/Weather.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const Weather = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const ipResponse = await axios.get('https://api.ipify.org?format=json');
                const ipData = ipResponse.data;

                const locationResponse = await axios.get(`https://ipapi.co/${ipData.ip}/json/`);
                const locationData = locationResponse.data;
                const { city, country, country_code } = locationData;

                const weatherResponse = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
                );
                setWeatherData({ ...weatherResponse.data, country_code });
                setLoading(false);
            } catch (error) {
                setError('Error fetching weather data. Please try again later.');
                setLoading(false);
            }
        };

        fetchWeather();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    const { name, sys, weather, main, country_code } = weatherData;

    return (
        <div className="weather-info">
            <img 
                src={`https://flagcdn.com/w320/${country_code.toLowerCase()}.png`} 
                alt={`${name} flag`} 
                className="country-flag"
            />
            <h2>{`${name}, ${sys.country}`}</h2>
            <p>Temperature: {Math.round(main.temp)} °C</p>
            <p>Humidity: {main.humidity}%</p>
            <p>Pressure: {main.pressure} hPa</p>
            <p>Description: With {weather[0].description}...</p>
            <button onClick={() => window.location.reload()}>Refresh Weather</button>
        </div>
    );
};

export default Weather;
