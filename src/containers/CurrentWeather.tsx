import { useEffect, useState } from "react";
import { useGeolocation } from "../hooks/useGeolocation";
import { fetchCurrentWeather } from "../services/weatherApi";
import { WeatherCard } from "../components/WeatherCard";
import { Text } from "../components/Text";
import styles from "../styles/CurrentWeather.module.css"; 

export const CurrentWeather = () => {
  const { position, error } = useGeolocation();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (position) {
      setLoading(true);
      fetchCurrentWeather(position.lat, position.lon)
        .then((res) => setData(res))
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [position]);

  if (error) return <Text variant="p" className={styles.error}>{error}</Text>;
  if (loading) return <Text variant="p">Loading current weather...</Text>;
  if (!data) return <Text variant="p">Waiting for location...</Text>;

  return (
    <WeatherCard
      city={data.name}
      temp={data.main.temp}
      humidity={data.main.humidity}
      wind={data.wind.speed}
      description={data.weather[0].description}
      icon={data.weather[0].icon}
    />
  );
};
