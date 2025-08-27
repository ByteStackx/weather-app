import React, { useEffect, useState, useContext } from "react";
import { Text } from "../components/Text";
import { Button } from "../components/Button";
import styles from "../styles/CurrentWeather.module.css";
import { fetchCurrentWeather, fetchForecast } from "../services/weatherApi";
import { useGeolocation } from "../hooks/useGeolocation";
import { PreferencesContext } from "../context/PreferenesContext";

export const CurrentWeather: React.FC = () => {
  const { position, error: geoError } = useGeolocation();
  const [current, setCurrent] = useState<any>(null);
  const [forecast, setForecast] = useState<any>(null);
  const [view, setView] = useState<"hourly" | "daily">("hourly");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { unit } = useContext(PreferencesContext);

  useEffect(() => {
    if (!position) return;

    const loadWeather = async () => {
      setLoading(true);
      try {
        const currentData = await fetchCurrentWeather(position.lat, position.lon);
        const forecastData = await fetchForecast(position.lat, position.lon, 7);

        setCurrent(currentData);
        setForecast(forecastData.forecast);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch weather data");
      } finally {
        setLoading(false);
      }
    };

    loadWeather();
  }, [position]);

  if (geoError) return <Text variant="p">Geolocation error: {geoError}</Text>;
  if (!position) return <Text variant="p">Waiting for location...</Text>;
  if (loading) return <Text variant="p">Loading current weather...</Text>;
  if (error) return <Text variant="p">{error}</Text>;
  if (!current || !forecast) return null;

  // Safe temperature calculations
  const temp = unit === "C" ? current.current.temp_c : current.current.temp_f;
  const feelsLike = unit === "C" ? current.current.feelslike_c : current.current.feelslike_f;

  return (
    <div className={styles.currentWeather}>
      <Text variant="h2">
        {current.location.name}, {current.location.country}
      </Text>

      <div className={styles.row}>
        <img
          src={current.current.condition.icon}
          alt={current.current.condition.text}
        />
        <Text variant="h3">{temp}°{unit}</Text>
      </div>

      <Text variant="p">{current.current.condition.text}</Text>
      <Text variant="p">Feels like: {feelsLike}°{unit}</Text>
      <Text variant="p">Humidity: {current.current.humidity}%</Text>
      <Text variant="p">Wind: {current.current.wind_kph} kph</Text>

      {/* Forecast toggle */}
      <div className={styles.forecast}>
        <div className={styles.toggle}>
          <Button onClick={() => setView("hourly")} disabled={view === "hourly"}>
            Hourly
          </Button>
          <Button onClick={() => setView("daily")} disabled={view === "daily"}>
            Daily
          </Button>
        </div>

        <div className={styles.list}>
          {view === "hourly" &&
            forecast.forecastday[0].hour.slice(0, 12).map((hour: any, i: number) => (
              <div key={i} className={styles.item}>
                <Text variant="p">{hour.time.split(" ")[1]}</Text>
                <Text variant="p">{unit === "C" ? hour.temp_c : hour.temp_f}°{unit}</Text>
              </div>
            ))}

          {view === "daily" &&
            forecast.forecastday.map((day: any, i: number) => (
              <div key={i} className={styles.item}>
                <Text variant="p">{day.date}</Text>
                <Text variant="p">{unit === "C" ? day.day.avgtemp_c : day.day.avgtemp_f}°{unit}</Text>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
