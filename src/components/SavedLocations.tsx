import React from "react";
import { Button } from "./Button";
import { Text } from "./Text";
import styles from "../styles/SavedLocations.module.css";

type Props = {
  locations: string[];
  onSelect: (city: string) => void;
  onDelete: (city: string) => void;
};

export const SavedLocations: React.FC<Props> = ({ locations, onSelect, onDelete }) => {
  if (locations.length === 0) return <Text variant="p">No saved locations yet.</Text>;

  return (
    <div className={styles.container}>
      {locations.map((city) => (
        <div key={city} className={styles.item}>
          <Button onClick={() => onSelect(city)} className={styles.locations}>{city}</Button>
          <Button onClick={() => onDelete(city)} className={styles.deleteBtn}>X</Button>
        </div>
      ))}
    </div>
  );
};
