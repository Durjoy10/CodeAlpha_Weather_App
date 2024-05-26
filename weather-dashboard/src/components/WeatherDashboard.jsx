/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { WiCloudy, WiDaySunny, WiFog, WiNightAltCloudy, WiRain, WiSnow, WiThunderstorm } from 'weather-icons-react';
import { fetchForecast, fetchWeather } from '../api/weatherApi';

const WeatherDashboard = () => {
    const [city, setCity] = useState('New York');
    const [searchCity, setSearchCity] = useState('New York');
    const [weather, setWeather] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getWeather = async () => {
            setLoading(true);
            setError('');
            try {
                const weatherData = await fetchWeather(searchCity);
                setWeather(weatherData);
                const forecastData = await fetchForecast(searchCity);
                setForecast(forecastData);
            } catch (error) {
                setError(error.message);
                setWeather(null);
                setForecast(null);
            } finally {
                setLoading(false);
            }
        };
        getWeather();
    }, [searchCity]);

    const handleCityChange = (e) => {
        setCity(e.target.value);
    };

    const handleSearch = () => {
        setSearchCity(city);
    };

    const getWeatherIcon = (weatherCondition) => {
        switch (weatherCondition) {
            case 'Clouds':
                return <WiCloudy size={50} color="#ffffff" />;
            case 'Clear':
                return <WiDaySunny size={50} color="#ffffff" />;
            case 'Rain':
                return <WiRain size={50} color="#ffffff" />;
            case 'Snow':
                return <WiSnow size={50} color="#ffffff" />;
            case 'Mist':
            case 'Fog':
                return <WiFog size={50} color="#ffffff" />;
            case 'Thunderstorm':
                return <WiThunderstorm size={50} color="#ffffff" />;
            default:
                return <WiNightAltCloudy size={50} color="#ffffff" />;
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <div className="mb-6">
                <input
                    type="text"
                    value={city}
                    onChange={handleCityChange}
                    className="p-2 border rounded shadow w-full"
                    placeholder="Enter city"
                />
                <button
                    onClick={handleSearch}
                    className="mt-2 p-2 bg-blue-600 text-white rounded shadow w-full"
                >
                    Search
                </button>
            </div>
            {loading && <div className="text-white">Loading...</div>}
            {error && <div className="text-red-500">{error}</div>}
            {weather && (
                <div className="bg-gray-800 p-4 rounded shadow-lg border border-gray-700 mb-6 text-white">
                    <h2 className="text-2xl font-bold mb-2">{weather.name}</h2>
                    <div className="flex items-center justify-center">
                        {getWeatherIcon(weather.weather[0].main)}
                        <p className="text-lg ml-2">{weather.weather[0].description}</p>
                    </div>
                    <p className="text-lg">Temperature: <span className="font-bold">{Math.round(weather.main.temp)}°C</span></p>
                </div>
            )}
            {forecast && (
                <div>
                    <h3 className="text-xl font-bold mb-4 text-white">3-Hour Forecast</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {forecast.list.slice(0, 9).map((item) => (
                            <div key={item.dt} className="bg-gray-800 p-4 rounded shadow-lg border border-gray-700 text-white">
                                <div className="flex items-center justify-center">
                                    {getWeatherIcon(item.weather[0].main)}
                                    <p className="text-sm ml-2">{item.weather[0].description}</p>
                                </div>
                                <p className="text-sm font-bold">{new Date(item.dt_txt).toLocaleString()}</p>
                                <p className="text-sm">Temp: <span className="font-bold">{Math.round(item.main.temp)}°C</span></p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default WeatherDashboard;
