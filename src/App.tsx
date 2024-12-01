import React, { useState, createContext } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import WeeklyForecast from "./components/WeeklyForecast";
import "./App.css";
import Header from "./components/Header";

interface LoadingContextType {
  loading: boolean;
  setLoading: (newValue: boolean) => void;
}

export const LoadingContext = createContext<LoadingContextType | undefined>(
  undefined
);

const App: React.FC = () => {
  const [city, setCity] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = (cityName: string) => {
    setCity(cityName);
    setError(null);
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
  };

  return (
    <div className="main-container">
      <div className="hero-container">
        <Header />
        <SearchBar onSearch={handleSearch} />
        {error && (
          <p className="error-message">
            {error} <br /> Please try again
          </p>
        )}
        <LoadingContext.Provider value={{ loading, setLoading }}>
          {!error && city && <WeatherCard city={city} onError={handleError} />}
          {!error && city && (
            <WeeklyForecast city={city} onError={handleError} />
          )}
        </LoadingContext.Provider>
      </div>
    </div>
  );
};

export default App;
