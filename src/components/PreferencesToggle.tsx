import React, { useContext } from "react";
import { Button } from "./Button";
import { PreferencesContext } from "../context/PreferenesContext";
import styles from "../styles/PreferencesToggle.module.css";

export const PreferencesToggle: React.FC = () => {
  const { theme, toggleTheme, unit, toggleUnit } = useContext(PreferencesContext);

  return (
    <div className={styles.container}>
      <Button onClick={toggleTheme}>
        Theme: {theme === "light" ? "Light" : "Dark"}
      </Button>
      <Button onClick={toggleUnit}>
        Unit: °{unit}
      </Button>
    </div>
  );
};
