import React, { useEffect, useState } from "react";
const apiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY;
import { getCurrentDateDetails } from "../utils/dateUtils";

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

  const { days } = getCurrentDateDetails();

  const getDayName = (dateString: string) => {
    const date = new Date(dateString);
    return days[date.getDay()].slice(0, 3);
  };

  const fetchForecastData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`
      );
      const data = await response.json();

      if (response.ok) {
        const forecast: ForecastItem[] = [];
        for (let i = 5; i <= 40; i += 8) {
          const dayData = data.list[i];
          forecast.push({
            temp: Math.round(dayData.main.temp),
            icon: dayData.weather[0].icon,
            date: dayData.dt_txt,
          });
        }
        setForecastData(forecast);
      } else {
        onError(data.message || "Forecast not available");
        setForecastData([]);
      }
    } catch (error) {
      onError("An unexpected error occurred. Please try again.");
    }
  };

  useEffect(() => {
    if (city) {
      fetchForecastData();
    }
  }, [city]);

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
