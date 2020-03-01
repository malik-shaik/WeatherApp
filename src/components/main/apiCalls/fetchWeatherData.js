import axios from "axios";
import { API_KEY } from "../../../config/api";

export const fetchWeatherData = async (coordinates, language) => {
  const { lat, lng } = coordinates;
  const api = "https://cors-anywhere.herokuapp.com/https://api.darksky.net";
  const url = `${api}/forecast/${API_KEY}/${lat},${lng}?lang=${language}&&units=auto`;
  const config = { headers: { "Access-Control-Allow-Origin": "*" } };
  const res = await axios.get(url, config);
  // console.log(res.data);
  console.log(res.data.currently.temperature);

  return res.data;
};
