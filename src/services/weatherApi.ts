const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = "https://api.weatherapi.com/v1";

export async function fetchCurrentWeather(lat: number, lon: number) {
  const url = `${BASE_URL}/current.json?key=${API_KEY}&q=${lat},${lon}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch current weather");
  return res.json();
}

export async function fetchForecast(lat: number, lon: number, days = 7) {
  const url = `${BASE_URL}/forecast.json?key=${API_KEY}&q=${lat},${lon}&days=${days}&aqi=no&alerts=yes`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch forecast");
  return res.json();
}

export async function fetchWeatherByCity(city: string, days = 7) {
  const url = `${BASE_URL}/forecast.json?key=${API_KEY}&q=${encodeURIComponent(
    city
  )}&days=${days}&aqi=no&alerts=yes`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch weather by city");
  return res.json();
}

export async function fetchWeatherAlerts(lat: number, lon: number) {
  const url = `${BASE_URL}/forecast.json?key=${API_KEY}&q=${lat},${lon}&days=1&alerts=yes`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch weather alerts");
  const data = await res.json();
  return data.alerts || null;
}
