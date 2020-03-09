import { API_KEY } from "../config/api";

export const fetchWeatherData = async (
  coordinates,
  appLanguage,
  temperatureUnits
) => {
  const units = temperatureUnits === "celsius" ? "ca" : "us";
  const { lat, lng } = coordinates;
  const apiUri = "https://api.darksky.net";
  const url = `${apiUri}/forecast/${API_KEY}/${lat},${lng}?lang=${appLanguage}&&units=${units}`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
};
