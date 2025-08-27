import React, { useContext, useEffect } from "react";
import { Text } from "./components/Text";
import { CurrentWeather } from "./containers/CurrentWeather";
import { SearchWeather } from "./containers/SearchWeather";
import { PreferencesContext } from "./context/PreferenesContext";
import { PreferencesToggle } from "./components/PreferencesToggle";
import "./App.css";

function App() {
  const { theme } = useContext(PreferencesContext);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className="app">
      <Text variant="h1" className="title">🌤️ Weather App</Text>
      <PreferencesToggle />
      <CurrentWeather />
      <SearchWeather />
    </div>
  );
}

export default App;
