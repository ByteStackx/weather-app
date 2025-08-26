import { useEffect, useState } from "react";

type Position = {
  lat: number;
  lon: number;
} | null;

export function useGeolocation() {
  const [position, setPosition] = useState<Position>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
  if (!navigator.geolocation) {
    setError("Geolocation is not supported by your browser.");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      console.log("Geolocation success:", pos);
      setPosition({
        lat: pos.coords.latitude,
        lon: pos.coords.longitude,
      });
    },
    (err) => {
      console.error("Geolocation error:", err);
      setError(err.message);
    }
  );
}, []);


  return { position, error };
}
