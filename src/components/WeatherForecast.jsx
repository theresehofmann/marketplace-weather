import React from "react";
import { formatTime, weatherDescriptions } from "../utils/formatter";

const WeatherForecast = ({ forecast }) => {
  return (
    <div>
      <h2>5-Day Hourly Forecast</h2>
      {Object.keys(forecast).map((date) => (
        <div key={date}>
          <h3>{date}</h3>
          <ul>
            {forecast[date].map((entry, index) => (
              <div key={index} className="weather-entry">
              <p><strong>{formatTime(entry.time)}</strong></p>
              <p>Temperature: {entry.temp}°C</p>
              <p>Weather: {weatherDescriptions(entry.weather)}</p>
            </div>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default WeatherForecast;
