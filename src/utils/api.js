import ky from "ky";

const BASE_URL = "https://nominatim.openstreetmap.org/search";
const WEATHER_URL = "https://www.finn.no/pf/wx/weather/compact";
const SOLAR_URL = "https://www.finn.no/pf/wx/sunmoon/sun";
const LUNAR_URL = "https://www.finn.no/pf/wx/sunmoon/moon";

export async function getLatLon(city, country) {
    const response = await ky.get(BASE_URL, {
      searchParams: { q: `${city}, ${country}`, format: "json" }
    });
    const data = await response.json();  
    return data[0] ? { lat: data[0].lat, lon: data[0].lon } : null;
  }

export async function getWeather(lat, lon) {
  return await ky.get(WEATHER_URL, { searchParams: { lat, lon } }).json();
}

export async function getSolar(lat, lon) {
  return await ky.get(SOLAR_URL, { searchParams: { lat, lon } }).json();
}

export async function getLunar(lat, lon) {
  return await ky.get(LUNAR_URL, { searchParams: { lat, lon } }).json();
}
