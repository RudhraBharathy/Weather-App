import React, { useEffect, useState, useContext } from "react";
const apiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY;
import { LoadingContext } from "../App";
import WeatherSkeleton from "./WeatherSkeleton";

interface WeatherCardProps {
  city: string;
  onError: (errorMessage: string) => void;
}

interface WeatherData {
  name: string;
  main: { temp: number; humidity: number };
  wind: { speed: number };
  weather: { icon: string; main: string }[];
  clouds: { all: number };
}

const WeatherCard: React.FC<WeatherCardProps> = ({ city, onError }) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const { loading, setLoading } = useContext(LoadingContext) || {};

  const fetchWeatherData = async () => {
    if (!setLoading) return;

    setLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );
      const data = await response.json();

      if (response.ok) {
        setWeatherData(data);
      } else {
        onError(data.message || "City not found");
      }
    } catch {
      onError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (city) fetchWeatherData();
  }, [city]);

  if (loading) {
    return <WeatherSkeleton />;
  }

  if (weatherData === null) {
    return <p>No weather data available</p>;
  }

  if (weatherData) {
    const { name, main, wind, weather, clouds } = weatherData;

    return (
      <div className="weather-card">
        <h2 className="cityname">Weather for {name}</h2>
        <h3 className="temprature-value">{Math.round(main.temp)}°C</h3>
        <div className="humidity-speed-icon-desc">
          <div className="humidity-speed">
            <p className="humidity">{main.humidity}% humidity</p>
            <p className="speed">{wind.speed} m/sec</p>
          </div>
          <div>
            <div className="weather-icon-desc-container">
              <p className="weather-icon-desc">{weather[0]?.main}</p>
              <img
                className="weather-icon"
                src={`https://openweathermap.org/img/wn/${weather[0].icon}.png`}
                alt="weather-icon"
              />
            </div>
            <p className="cloudspercent">{clouds.all}% Clouds</p>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default WeatherCard;
