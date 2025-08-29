import React, { useState, useEffect, useContext } from "react";
import { Text } from "../components/Text";
import { Button } from "../components/Button";
import { SavedLocations } from "../components/SavedLocations";
import styles from "../styles/SearchWeather.module.css";
import { fetchWeatherByCity, fetchForecast } from "../services/weatherApi";
import { PreferencesContext } from "../context/PreferenesContext";
import { WeatherAlerts } from "../components/WeatherAlerts";
import { cacheWeather, getCachedWeather } from "../services/cacheService";

export const SearchWeather: React.FC = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState<any>(null);
  const [forecast, setForecast] = useState<any>(null);
  const [view, setView] = useState<"hourly" | "daily">("hourly");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedLocations, setSavedLocations] = useState<string[]>([]);

  const { unit } = useContext(PreferencesContext);
  useEffect(() => {
    if ("Notification" in window) {
      Notification.requestPermission();
    }
  }, []);


  useEffect(() => {
    const stored = localStorage.getItem("savedLocations");
    if (stored) setSavedLocations(JSON.parse(stored));
  }, []);

  const handleSearch = async (city?: string) => {
    const searchCity = city || query;
    if (!searchCity) return;

    setLoading(true);
    try {
      if(!navigator.onLine) {
        const cached = getCachedWeather(searchCity);
        if (cached) {
          setWeather(cached.weather);
          setForecast(cached.forecast);
          setError("Showing cached data (offline)");
          return;
        } else {
          setError("Offline and no cached data available");
          return;
        }
      }
      const data = await fetchWeatherByCity(searchCity);
      setWeather(data);

      if (data?.location) {
        const forecastData = await fetchForecast(
          data.location.lat,
          data.location.lon,
          7
        );
        setForecast(forecastData.forecast);

        cacheWeather(searchCity, data, forecastData.forecast);
      }

      if (!savedLocations.includes(searchCity)) {
        const updated = [searchCity, ...savedLocations];
        setSavedLocations(updated);
        localStorage.setItem("savedLocations", JSON.stringify(updated));
      }

      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch weather data");
     const cached = getCachedWeather(searchCity);
      if (cached) {
        setWeather(cached.weather);
        setForecast(cached.forecast);
        setError("Showing cached data (offline)");
      } else {
        setError("City not found.");
      }
    } 
    finally {
      setLoading(false);
    }
  };

  const handleSelect = (city: string) => {
    setQuery(city);
    handleSearch(city);
  };

  const handleDelete = (city: string) => {
    const updated = savedLocations.filter((c) => c !== city);
    setSavedLocations(updated);
    localStorage.setItem("savedLocations", JSON.stringify(updated));
  };

  const temp = weather
    ? unit === "C"
      ? weather.current.temp_c
      : weather.current.temp_f
    : null;
  const feelsLike = weather
    ? unit === "C"
      ? weather.current.feelslike_c
      : weather.current.feelslike_f
    : null;

  return (
    <div className={styles.weatherCard}>
      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Enter city"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={styles.input}
        />
        <Button onClick={() => handleSearch()}>Search</Button>
      </div>

      <SavedLocations
        locations={savedLocations}
        onSelect={handleSelect}
        onDelete={handleDelete}
      />

      {loading && <Text variant="p">Fetching weather...</Text>}
      {error && <Text variant="p">{error}</Text>}

      {weather && forecast && (
        <>
          <div className={styles.currentInfo}>
            <Text variant="h2">
              {weather.location.name}, {weather.location.country}
            </Text>
            <div className={styles.row}>
              <img
                src={weather.current.condition.icon}
                alt={weather.current.condition.text}
              />
              <Text variant="h3">{temp}°{unit}</Text>
            </div>
            <Text variant="p">{weather.current.condition.text}</Text>
            <Text variant="p">Feels like: {feelsLike}°{unit}</Text>
            <Text variant="p">Humidity: {weather.current.humidity}%</Text>
            <Text variant="p">Wind: {weather.current.wind_kph} kph</Text>
          </div>

          <WeatherAlerts
            lat={weather.location.lat}
            lon={weather.location.lon}
          />
          <div className={styles.forecast}>
            <div className={styles.toggle}>
              <Button
                onClick={() => setView("hourly")}
                disabled={view === "hourly"}
              >
                Hourly
              </Button>
              <Button
                onClick={() => setView("daily")}
                disabled={view === "daily"}
              >
                Daily
              </Button>
            </div>

            <div className={styles.list}>
              {view === "hourly" &&
                forecast.forecastday[0].hour.map((hour: any, i: number) => (
                  <div key={i} className={styles.item}>
                    <Text variant="p">{hour.time.split(" ")[1]}</Text>
                    <Text variant="p">
                      {unit === "C" ? hour.temp_c : hour.temp_f}°{unit}
                    </Text>
                  </div>
                ))}

              {view === "daily" &&
                forecast.forecastday.map((day: any, i: number) => (
                  <div key={i} className={styles.item}>
                    <Text variant="p">{day.date}</Text>
                    <Text variant="p">
                      {unit === "C"
                        ? day.day.avgtemp_c
                        : day.day.avgtemp_f}
                      °{unit}
                    </Text>
                  </div>
                ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
