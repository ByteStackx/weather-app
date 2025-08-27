import React, { useEffect, useState } from "react";
import { Text } from "./Text";
import { fetchWeatherAlerts } from "../services/weatherApi";
import styles from "../styles/WeatherAlerts.module.css";

type Props = {
  lat: number;
  lon: number;
};

export const WeatherAlerts: React.FC<Props> = ({ lat, lon }) => {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

    useEffect(() => {
    const loadAlerts = async () => {
    try {
    const data = await fetchWeatherAlerts(lat, lon);
        if (data?.alert?.length) {
        setAlerts(data.alert);

        data.alert.forEach((a: any) => {
          if ("Notification" in window && Notification.permission === "granted") {
            new Notification(`Weather Alert: ${a.headline}`, {
              body: a.desc,
              icon: "/weather-icon.png",
            });
          }
        });
      }
    } catch (err) {
      console.error("Failed to fetch weather alerts", err);
      setError("Failed to fetch weather alerts");
    }
  };

  loadAlerts();
}, [lat, lon]);


  if (error) return <Text variant="p">{error}</Text>;
  if (alerts.length === 0) return null;

  return (
    <div className={styles.weatherAlerts}>
        {alerts.map((a, i) => (
            <div key={i}>
            <Text variant="h4">{a.headline}</Text>
            <Text variant="p">{a.desc}</Text>
            </div>
        ))}
    </div>

  );
};
