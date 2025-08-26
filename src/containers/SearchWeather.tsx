import { useState, useEffect } from "react";
import { fetchWeatherByCity } from "../services/weatherApi";
import { WeatherCard } from "../components/WeatherCard";
import { SearchBar } from "../components/SearchBar";
import { SavedLocations } from "../components/SavedLocations";
import { Text } from "../components/Text";
import styles from "../styles/SearchWeather.module.css";
import { Button } from "../components/Button";

export const SearchWeather = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [savedLocations, setSavedLocations] = useState<string[]>([]);

  // Load saved locations from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("locations") || "[]");
    setSavedLocations(stored);
  }, []);

  const handleSearch = async (city: string) => {
    setLoading(true);
    setError("");
    setData(null);

    try {
      const res = await fetchWeatherByCity(city);
      setData(res);
    } catch (err: any) {
      setError(err.message || "Failed to fetch weather");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = (city: string) => {
    if (!savedLocations.includes(city)) {
      const updated = [...savedLocations, city];
      setSavedLocations(updated);
      localStorage.setItem("locations", JSON.stringify(updated));
    }
  };

  const handleSelect = (city: string) => {
    handleSearch(city);
  };

  const handleDelete = (city: string) => {
    const updated = savedLocations.filter((c) => c !== city);
    setSavedLocations(updated);
    localStorage.setItem("locations", JSON.stringify(updated));
  };

  return (
    <div className={styles.container}>
      <SearchBar onSearch={handleSearch} />

      {loading && <Text variant="p">Loading...</Text>}
      {error && <Text variant="p" className={styles.error}>{error}</Text>}

      {data && (
        <>
          <WeatherCard
            city={data.name}
            temp={data.main.temp}
            humidity={data.main.humidity}
            wind={data.wind.speed}
            description={data.weather[0].description}
            icon={data.weather[0].icon}
          />
          <Button onClick={() => handleSave(data.name)}>Save Location</Button>
        </>
      )}

      <SavedLocations
        locations={savedLocations}
        onSelect={handleSelect}
        onDelete={handleDelete}
      />
    </div>
  );
};
