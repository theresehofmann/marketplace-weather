import React from "react";
import { formatTime } from "../utils/formatter";

const SolarTimes = ({ solar }) => {
  return (
    <div>
      <h2>Next Solar Times</h2>
      {solar.sunrise ? (
        <p>Sunrise: {formatTime(solar.sunrise.time)}</p>
      ) : (
        <p>Sunrise data missing</p>
      )}
      {solar.sunset ? (
        <p>Sunset: {formatTime(solar.sunset.time)}</p>
      ) : (
        <p>Sunset data missing</p>
      )}
    </div>
  );
};

export default SolarTimes;
