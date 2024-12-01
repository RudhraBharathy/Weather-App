import React from "react";
import { getCurrentDateDetails } from "../utils/dateUtils";

const Header: React.FC = () => {
  const { day, date, month, year } = getCurrentDateDetails();

  return (
    <header className="header">
      <h1 className="title">Weather Forecastify</h1>
      <p className="dmy">{`${day}, ${month} ${date}, ${year}`}</p>
    </header>
  );
};

export default Header;
