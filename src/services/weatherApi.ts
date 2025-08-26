const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";
console.log("API Key:", API_KEY);


export async function fetchCurrentWeather(lat: number, lon: number) {
  const res = await fetch(
    `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
  );

  if (!res.ok) throw new Error("Failed to fetch weather data");
  return res.json();
}

export async function fetchWeatherByCity(city: string) {
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  if (!API_KEY) throw new Error("API key missing");

  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
  );

  if (!res.ok) throw new Error("City not found or API error");
  return res.json();
}
