import React, { useEffect, useState, useContext } from "react";
const apiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY;
import { getCurrentDateDetails } from "../utils/dateUtils";
import { LoadingContext } from "../App";
import WeatherForecastSkeleton from "./WeatherForecastSkeleton";

interface ForecastItem {
  temp: number;
  icon: string;
  date: string;
}

interface WeeklyForecastProps {
  city: string;
  onError: (errorMessage: string) => void;
}

const WeeklyForecast: React.FC<WeeklyForecastProps> = ({ city, onError }) => {
  const [forecastData, setForecastData] = useState<ForecastItem[]>([]);
  const { loading, setLoading } = useContext(LoadingContext) || {};
  const { days } = getCurrentDateDetails();

  const getDayName = (dateString: string) => {
    const date = new Date(dateString);
    return days[date.getDay()]?.slice(0, 3) || "N/A";
  };

  const fetchForecastData = async () => {
    if (!setLoading) return;

    setLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`
      );
      const data = await response.json();

      if (response.ok && data.list?.length >= 40) {
        const forecast = data.list
          .filter((_: any, index: number) => index % 8 === 5)
          .map((day: any) => ({
            temp: Math.round(day.main.temp),
            icon: day.weather[0].icon,
            date: day.dt_txt,
          }));
        setForecastData(forecast);
      } else {
        onError(data.message || "Forecast not available");
      }
    } catch {
      onError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (city) fetchForecastData();
  }, [city]);

  if (loading) {
    return <WeatherForecastSkeleton />;
  }

  if (forecastData.length === 0) {
    return <p>No forecast data available</p>;
  }

  return (
    <div className="daywiseforecast">
      {forecastData.map((item, index) => (
        <div key={index} className="weekly-weather">
          <p>{getDayName(item.date)}</p>
          <img
            className="week-icon"
            src={`https://openweathermap.org/img/wn/${item.icon}.png`}
            alt="weather-icon"
          />
          <p>{item.temp}°C</p>
        </div>
      ))}
    </div>
  );
};

export default WeeklyForecast;
