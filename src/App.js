// src/App.js
import React from 'react';
import Weather from './Weather';
import './App.css';

function App() {
    return (
        <div className="container">
            <h1>Current Weather Update</h1>
            <p>
                This app uses your public IP address to fetch a current weather update based on your public location, 
                provided you are not using a VPN.
            </p>
            <p>
                It uses an API call to <a href="https://openweathermap.org/" target="_blank" rel="noopener noreferrer">OpenWeatherMap</a>.
            </p>
            <Weather />
            <footer className="footer">
                <p>&copy; {new Date().getFullYear()} Mahen Mahindaratne.</p>
            </footer>
        </div>
    );
}

export default App;
