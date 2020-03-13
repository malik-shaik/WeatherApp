import { API_KEY } from "../config/api";
import moment from "moment";

export const fetchWeatherData = async (
  coordinates,
  appLanguage,
  temperatureUnits,
  date
) => {
  const units = temperatureUnits === "celsius" ? "ca" : "us";
  const { lat, lng } = coordinates;
  let apiUri = `https://api.darksky.net/forecast/${API_KEY}/${lat},${lng}`;
  if (date !== null) {
    const dateTime = moment(date).format("YYYY-MM-DDTHH:mm:ss");
    apiUri = `${apiUri},${dateTime}`;
  }
  const url = `${apiUri}?lang=${appLanguage}&&units=${units}`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
};
