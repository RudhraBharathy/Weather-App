import React, { useState } from "react";
import SearchIcon from "../assets/search.svg";
import "../App.css";

interface SearchBarProps {
  onSearch: (cityName: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [city, setCity] = useState<string>("");

  const handleSearch = () => {
    if (city.trim() !== "") {
      onSearch(city);
      setCity("");
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyUp={(e) => e.key === "Enter" && handleSearch()}
      />
      <button className="search-btn" onClick={handleSearch}>
        <img src={SearchIcon}></img>
      </button>
    </div>
  );
};

export default SearchBar;
