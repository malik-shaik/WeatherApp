import { API_KEY } from "../config/api";

export const fetchTimeMachineData = async (
  coordinates,
  appLanguage,
  temperatureUnits,
  date
) => {
  console.log(date);
  // const unixTime = Math.round(date.getTime() / 1000);
  const units = temperatureUnits === "celsius" ? "ca" : "us";
  const { lat, lng } = coordinates;
  const apiEndPoint = "https://api.darksky.net/forecast";
  const url = `${apiEndPoint}/${API_KEY}/${lat},${lng},${date}?lang=${appLanguage}&&units=${units}&&exclude=currently,flags`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
};
