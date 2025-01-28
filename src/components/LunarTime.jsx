import React from "react";
import { formatTime, getMoonPhase } from "../utils/formatter";

const LunarTimes = ({ lunar }) => {
  return (
    <div>
      <h2>Next Lunar Times and Phases</h2>
      <p>Moonrise: {formatTime(lunar.moonrise.time)}</p>
      <p>Moonset: {lunar.moonset.time ? formatTime(lunar.moonset.time) : "No data"}</p>
      {lunar.moonphase !== undefined && (
        <div>
          <p>Moon Phase: {getMoonPhase(lunar.moonphase)}</p>
        </div>
      )}
    </div>
  );
};

export default LunarTimes;
