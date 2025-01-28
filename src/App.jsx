import React, { useState } from "react";
import { getLatLon, getWeather, getSolar, getLunar } from "./utils/api";
import WeatherForecast from "./components/WeatherForecast";
import SolarTimes from "./components/SolarTime";
import LunarTimes from "./components/LunarTime";
import './App.css';

function App() {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [forecast, setForecast] = useState(null);
  const [solar, setSolar] = useState(null);
  const [lunar, setLunar] = useState(null);
  const [error, setError] = useState(null);

  const handleCityChange = (e) => setCity(e.target.value);
  const handleCountryChange = (e) => setCountry(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const latLon = await getLatLon(city, country);
      if (!latLon || typeof latLon !== 'object' || !latLon.lat || !latLon.lon) {
        setError("City and/or country not found");
        return;
      }

      const { lat, lon } = latLon;
      const weatherData = await getWeather(lat, lon);
      if (!weatherData || !weatherData.properties || !weatherData.properties.timeseries) {
        setError("Weather data is missing");
        return;
      }

      const fiveDayForecast = extractFiveDayHourlyForecast(weatherData.properties.timeseries);
      setForecast(fiveDayForecast);

      const solarData = await getSolar(lat, lon);
      setSolar(solarData?.properties || null);

      const lunarData = await getLunar(lat, lon);
      setLunar(lunarData?.properties || null);

    } catch (err) {
      setError("There was a problem fetching the data");
    }
  };

  const extractFiveDayHourlyForecast = (timeseries) => {
    const currentDate = new Date();
    const endDate = new Date(currentDate);
    endDate.setDate(currentDate.getDate() + 4);

    const fiveDayData = timeseries.filter((entry) => {
      const entryTime = new Date(entry.time);
      return entryTime >= currentDate && entryTime <= endDate;
    });

    const hourlyForecast = fiveDayData.map((entry) => {
      const time = entry.time;
      const temp = entry.data.instant.details.air_temperature;
      const weather = entry.data.next_1_hours ? entry.data.next_1_hours.summary.symbol_code : "Unknown";
      return { time, temp, weather };
    });

    return groupForecastByDay(hourlyForecast);
  };

  const groupForecastByDay = (forecast) => {
    const grouped = {};
    forecast.forEach((entry) => {
      const date = formatDate(entry.time);
      if (!grouped[date]) grouped[date] = [];
      grouped[date].push(entry);
    });
    return grouped;
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("sv-SE", {
      weekday: "long", year: "numeric", month: "long", day: "numeric"
    });
  };

  return (
    <div className="app-container">
      <header>
        <h1>Weather, Solar and Lunar Information</h1>
      </header>
      
      <main role="main">
        <form onSubmit={handleSubmit} className="search-form" aria-labelledby="form-title">
          <h2 id="form-title">Search Weather Information</h2>

          <div className="input-group">
            <label htmlFor="city">City:</label>
            <input
              id="city"
              type="text"
              value={city}
              onChange={handleCityChange}
              placeholder="Enter city"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="country">Country:</label>
            <input
              id="country"
              type="text"
              value={country}
              onChange={handleCountryChange}
              placeholder="Enter country"
              required
            />
          </div>
          <button type="submit" className="submit-btn" aria-label="Search weather information">Search</button>
        </form>

        {error && (
          <p className="error-message" role="alert">
            {error}
          </p>
        )}

        <section className="data-sections" aria-live="polite">
          {forecast && (
            <section>
              <WeatherForecast forecast={forecast} />
            </section>
          )}
          {solar && (
            <section>
              <SolarTimes solar={solar} />
            </section>
          )}
          {lunar && (
            <section>
              <LunarTimes lunar={lunar} />
            </section>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
