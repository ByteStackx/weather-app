import React, { useContext, useEffect, useState } from "react";
import { Text } from "./components/Text";
import { CurrentWeather } from "./containers/CurrentWeather";
import { SearchWeather } from "./containers/SearchWeather";
import { PreferencesContext } from "./context/PreferenesContext";
import { PreferencesToggle } from "./components/PreferencesToggle";
import "./App.css";

function App() {
  const { theme } = useContext(PreferencesContext);
  const [searchedWeather, setSearchedWeather] = useState<any>(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const handleSearched = (weather: any, forecast: any) => {
    setSearchedWeather({ weather, forecast });
  };

  return (
    <div className="app">
      <Text variant="h1" className="title">🌤️ Weather App</Text>
      <PreferencesToggle />
      <SearchWeather onSearched={handleSearched} />
      {searchedWeather ? (
        <CurrentWeather weather={searchedWeather.weather} forecast={searchedWeather.forecast} />
      ) : (
        <CurrentWeather />
      )}
    </div>
  );
}

export default App;
