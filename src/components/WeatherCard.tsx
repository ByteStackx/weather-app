import React from "react";
import styles from "../styles/WeatherCard.module.css"; // path updated
import { Text } from "./Text";

type WeatherCardProps = {
  city: string;
  temp: number;
  humidity: number;
  wind: number;
  description: string;
  icon: string;
};

export const WeatherCard: React.FC<WeatherCardProps> = ({
  city,
  temp,
  humidity,
  wind,
  description,
  icon,
}) => {
  return (
    <div className={styles.card}>
      <Text variant="h2" className={styles.city}>{city}</Text>
      <img
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        alt={description}
        className={styles.icon}
      />
      <Text variant="h3" className={styles.temp}>{Math.round(temp)}°C</Text>
      <Text variant="p" className={styles.desc}>{description}</Text>
      <div className={styles.details}>
        <span>Humidity: {humidity}%<br/></span>
        <span>Wind speed: {wind} m/s</span>
      </div>
    </div>
  );
};
