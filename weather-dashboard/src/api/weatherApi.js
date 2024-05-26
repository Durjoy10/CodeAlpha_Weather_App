// src/api/weatherApi.js
const API_KEY = '7bb23a13c00c6b23c1b81b172b02e938';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchWeather = async (city) => {
  const response = await fetch(`${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`);
  const data = await response.json();
  return data;
};

export const fetchForecast = async (city) => {
  const response = await fetch(`${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`);
  const data = await response.json();
  return data;
};
