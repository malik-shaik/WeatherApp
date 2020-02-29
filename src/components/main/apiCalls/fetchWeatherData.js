import axios from "axios";
import { API_KEY } from "../../../config/api";

export const fetchWeatherData = async coordinates => {
  const { lat, lng } = coordinates;
  const apiUri = "https://cors-anywhere.herokuapp.com/https://api.darksky.net";
  const url = `${apiUri}/forecast/${API_KEY}/${lat},${lng}?lang=te&&units=si`;
  const config = { headers: { "Access-Control-Allow-Origin": "*" } };
  const res = await axios.get(url, config);
  console.log(res.data.timezone);
  return res.data.timezone;
};
