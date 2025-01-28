export const formatTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString("sv-SE", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Stockholm" });
  };
  
  export const getMoonPhase = (degree) => {
    if (degree === 0) return "New Moon";
    if (degree > 0 && degree <= 90) return "Waxing Crescent";
    if (degree > 90 && degree < 180) return "Waxing Gibbous";
    if (degree === 180) return "Full Moon";
    if (degree > 180 && degree < 270) return "Waning Gibbous";
    if (degree >= 270 && degree < 360) return "Waning Crescent";
    return "Unknown Phase";
  };

  export const weatherDescriptions = (weather) =>{
    if (weather === "partlycloudy_day") return "Partly Cloudy Day";
    if (weather === "partlycloudy_night") return "Partly Cloudy Night";
    if (weather === "lightrain") return "Light Rain";
    if (weather === "moderaterain") return "Moderate Rain";
    if (weather === "heavyrain") return "Heavy Rain";
    if (weather === "clearsky_day") return "Clear Day";
    if (weather === "clearsky_night") return "Clear Night";
    if (weather === "heavysleet") return "Heavy Sleet";
    if (weather === "lightsleet") return "Light Sleet";
    else return  weather.charAt(0).toUpperCase() + weather.slice(1);
  };