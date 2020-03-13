import moment from "moment";

const getDate = unixTime => new Date(unixTime * 1000);

// convert unix timestamp into day, date & time
// get day
export const getDay = unixTime => {
  let date = getDate(unixTime);
  let day = moment(date).format("dddd");
  return day;
};

// get hours
export const getHours = unixTime => {
  let date = getDate(unixTime);
  let hours = date.getHours();
  let time = hours >= 12 ? `${hours - 12}pm` : `${hours}am`;
  return time;
};

// get hours and minutes
export const getHoursMinutes = unixTime => {
  let date = getDate(unixTime);
  let hours = date.getHours();
  let mins = date.getMinutes();
  let time = hours >= 12 ? `${hours - 12}:${mins}pm` : `${hours}:${mins}am`;
  return time;
};
