import React, { useState } from "react";
import { Text } from "./Text";
import styles from "../styles/Forecast.module.css";

type Props = {
  forecast: any;
};

export const Forecast: React.FC<Props> = ({ forecast }) => {
  const [view, setView] = useState<"hourly" | "daily">("daily");

  if (!forecast) return null;

  return (
    <div className={styles.container}>
      <div className={styles.toggle}>
        <button
          className={view === "daily" ? styles.active : ""}
          onClick={() => setView("daily")}
        >
          Daily
        </button>
        <button
          className={view === "hourly" ? styles.active : ""}
          onClick={() => setView("hourly")}
        >
          Hourly
        </button>
      </div>

      {view === "daily" ? (
        <div className={styles.grid}>
          {forecast.forecastday.map((day: any) => (
            <div key={day.date} className={styles.card}>
              <Text variant="h3">{day.date}</Text>
              <img
                src={day.day.condition.icon}
                alt={day.day.condition.text}
              />
              <Text variant="p">
                {day.day.avgtemp_c}°C / {day.day.condition.text}
              </Text>
              <Text variant="p">Max: {day.day.maxtemp_c}°C</Text>
              <Text variant="p">Min: {day.day.mintemp_c}°C</Text>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.grid}>
          {forecast.forecastday[0].hour.map((hour: any) => (
            <div key={hour.time_epoch} className={styles.card}>
              <Text variant="h3">
                {hour.time.split(" ")[1]}
              </Text>
              <img
                src={hour.condition.icon}
                alt={hour.condition.text}
              />
              <Text variant="p">
                {hour.temp_c}°C / {hour.condition.text}
              </Text>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
