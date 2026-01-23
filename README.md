# 🌤️ Weather App

A modern weather application built with React, TypeScript, and Vite. Get real-time weather updates, view forecasts, and track saved locations with theme preferences.

## Features

- **Current Weather Display** - View real-time weather conditions for your location or any city
- **7-Day Forecast** - Plan ahead with extended weather forecasts
- **Weather Alerts** - Get notified about severe weather conditions
- **Location Search** - Search for weather by city name
- **Geolocation Support** - Automatically detect your current location
- **Saved Locations** - Bookmark frequently checked locations
- **Theme Toggle** - Switch between light and dark themes
- **Responsive Design** - Works seamlessly on desktop and mobile devices

## Tech Stack

- **React** - UI library
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **React Context API** - State management for preferences
- **OpenWeatherMap API** - Real-time weather data

## Getting Started

### Prerequisites

- Node.js 16+ 
- An [OpenWeatherMap](https://openweathermap.org/) API key

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory:
   ```
   VITE_WEATHER_API_KEY=your_api_key_here
   ```

### Development

Run the development server:
```bash
npm run dev
```

The app will open at `http://localhost:5173`

### Build

Build for production:
```bash
npm run build
```

### Linting

Check code quality:
```bash
npm lint
```

## Project Structure

```
src/
├── components/        # Reusable UI components
├── containers/        # Page-level containers
├── context/          # React Context providers
├── hooks/            # Custom React hooks
├── services/         # API and utility services
├── styles/           # CSS modules
├── types/            # TypeScript type definitions
└── utils/            # Helper utilities
```

## Key Components

- **CurrentWeather** - Displays current weather conditions and 7-day forecast
- **SearchWeather** - Search bar for looking up weather by city
- **WeatherCard** - Individual weather condition card
- **WeatherAlerts** - Weather alert notifications
- **SavedLocations** - Manage bookmarked locations
- **PreferencesToggle** - Theme switcher

## Environment Variables

- `VITE_WEATHER_API_KEY` - Your OpenWeatherMap API key
