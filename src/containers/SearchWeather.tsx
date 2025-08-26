import { useState } from "react";
import { fetchWeatherByCity } from "../services/weatherApi";
import { WeatherCard } from "../components/WeatherCard";
import { SearchBar } from "../components/SearchBar";
import { Text } from "../components/Text";
import styles from "../styles/SearchWeather.module.css";

export const SearchWeather = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  return (
    <div className={styles.container}>
      <SearchBar onSearch={handleSearch} />

      {loading && <Text variant="p">Loading...</Text>}
      {error && <Text variant="p" className={styles.error}>{error}</Text>}
      {data && (
        <WeatherCard
          city={data.name}
          temp={data.main.temp}
          humidity={data.main.humidity}
          wind={data.wind.speed}
          description={data.weather[0].description}
          icon={data.weather[0].icon}
        />
      )}
    </div>
  );
};
