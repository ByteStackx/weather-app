export type CachedWeather = {
  weather: any;
  forecast: any;
  timestamp: number;
};

const CACHE_KEY = "weatherCache";

function loadCache(): Record<string, CachedWeather> {
  const raw = localStorage.getItem(CACHE_KEY);
  return raw ? JSON.parse(raw) : {};
}

function saveCache(data: Record<string, CachedWeather>) {
  localStorage.setItem(CACHE_KEY, JSON.stringify(data));
}

export function cacheWeather(key: string, weather: any, forecast: any) {
  const cache = loadCache();
  cache[key.toLowerCase()] = {
    weather,
    forecast,
    timestamp: Date.now(),
  };
  saveCache(cache);
}

export function getCachedWeather(key: string): CachedWeather | null {
  const cache = loadCache();
  return cache[key.toLowerCase()] || null;
}

export function clearCachedWeather(key: string) {
  const cache = loadCache();
  delete cache[key.toLowerCase()];
  saveCache(cache);
}
