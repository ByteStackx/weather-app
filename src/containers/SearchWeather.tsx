import React, { useState, useEffect, useContext } from "react";
import { Text } from "../components/Text";
import { Button } from "../components/Button";
import { SavedLocations } from "../components/SavedLocations";
import styles from "../styles/SearchWeather.module.css";
import { fetchWeatherByCity, fetchForecast } from "../services/weatherApi";
import { PreferencesContext } from "../context/PreferenesContext";
import { WeatherAlerts } from "../components/WeatherAlerts";
import { cacheWeather, getCachedWeather } from "../services/cacheService";

interface SearchWeatherProps {
  onSearched?: (weather: any, forecast: any) => void;
}

export const SearchWeather: React.FC<SearchWeatherProps> = ({ onSearched }) => {
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
          onSearched?.(cached.weather, cached.forecast);
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
      onSearched?.(data, forecast);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch weather data");
     const cached = getCachedWeather(searchCity);
      if (cached) {
        setWeather(cached.weather);
        setForecast(cached.forecast);
        setError("Showing cached data (offline)");
        onSearched?.(cached.weather, cached.forecast);
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
    </div>
  );
};
