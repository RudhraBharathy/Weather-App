import React, { useEffect, useState } from "react";
import "../App.css";
const apiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY;
import LoadingGIF from "../assets/Spinner.svg";

interface WeatherCardProps {
  city: string;
  onError: (errorMessage: string) => void;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ city, onError }) => {
  const [weatherData, setWeatherData] = useState<any>(null);

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );
      const data = await response.json();

      if (response.ok) {
        setWeatherData(data);
      } else {
        onError(data.message || "City not found");
        setWeatherData(null);
      }
    } catch (error) {
      onError("An unexpected error occurred. Please try again.");
    }
  };

  useEffect(() => {
    if (city) {
      fetchWeatherData();
    }
  }, [city]);

  if (!weatherData) {
    return <img src={LoadingGIF} alt="Loading..." />;
  }

  return (
    <div className="weather-card">
      <h2 className="cityname">Weather for {weatherData.name}</h2>
      <h3 className="temprature-value">
        {Math.round(weatherData.main.temp)}°C
      </h3>
      <div className="weather-icon-desc-container">
        <p className="weather-icon-desc">{weatherData.weather[0].main}</p>
        <img
          className="weather-icon"
          src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
          alt="weather-icon"
        />
      </div>
      <p className="cloudspercent">{weatherData.clouds.all}% Clouds</p>
    </div>
  );
};

export default WeatherCard;
