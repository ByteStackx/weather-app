import React, { createContext, useState, useEffect } from "react";

type Preferences = {
  theme: "light" | "dark";
  unit: "C" | "F";
  toggleTheme: () => void;
  toggleUnit: () => void;
};

export const PreferencesContext = createContext<Preferences>({
  theme: "light",
  unit: "C",
  toggleTheme: () => {},
  toggleUnit: () => {},
});

export const PreferencesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [unit, setUnit] = useState<"C" | "F">("C");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark";
    const savedUnit = localStorage.getItem("unit") as "C" | "F";
    if (savedTheme) setTheme(savedTheme);
    if (savedUnit) setUnit(savedUnit);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const toggleUnit = () => {
    const newUnit = unit === "C" ? "F" : "C";
    setUnit(newUnit);
    localStorage.setItem("unit", newUnit);
  };

  return (
    <PreferencesContext.Provider value={{ theme, unit, toggleTheme, toggleUnit }}>
      {children}
    </PreferencesContext.Provider>
  );
};
