import { Text } from "./components/Text";
import { CurrentWeather } from "./containers/CurrentWeather";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Text variant="h1" className="title">🌤️ Weather App</Text>
      <CurrentWeather />
    </div>
  );
}

export default App;
