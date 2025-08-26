import { Text } from "./components/Text";
import { CurrentWeather } from "./containers/CurrentWeather";
import "./App.css";
import { SearchWeather } from "./containers/SearchWeather";

function App() {
  return (
    <div className="app">
      <Text variant="h1" className="title">🌤️ Weather App</Text>
      <CurrentWeather />
      <SearchWeather />
    </div>
  );
}

export default App;
