import React, { Component } from "react";
import { WiSunrise, WiSunset } from "react-icons/wi";
import { IoIosArrowRoundForward } from "react-icons/io";

export class DayInfo extends Component {
  // convert unix time
  getHours = unixTime => {
    let date = new Date(unixTime * 1000);
    let hours = date.getHours();
    let time = hours >= 12 ? `${hours - 12}pm` : `${hours}am`;
    return time;
  };
  getHoursMinutes = unixTime => {
    let date = new Date(unixTime * 1000);
    let hours = date.getHours();
    let mins = date.getMinutes();
    let time = hours >= 12 ? `${hours - 12}:${mins}pm` : `${hours}:${mins}am`;
    return time;
  };

  render() {
    const {
      windSpeed,
      uvIndex,
      visibility,
      sunriseTime,
      sunsetTime,
      temperatureHigh,
      temperatureHighTime,
      temperatureLow,
      temperatureLowTime,
      units
    } = this.props.dayInfo;

    const lowTemperature = Math.floor(temperatureLow);
    const highTemperature = Math.floor(temperatureHigh);
    const Visibility = Math.round(visibility);
    const wind = Math.round(windSpeed);
    const highTemperatureTime = this.getHours(temperatureHighTime);
    const lowTemperatureTime = this.getHours(temperatureLowTime);
    const sunrise = this.getHoursMinutes(sunriseTime);
    const sunset = this.getHoursMinutes(sunsetTime);
    const windSpeedUnits = units === "celsius" ? "kmph" : "mph";
    const visibilityUnits = units === "celsius" ? "km" : "miles";

    return (
      <div className="dayinfo">
        <div className="temperature-range">
          <span className="temp-range">{lowTemperature}&deg;</span>{" "}
          <span className="temp-time">{lowTemperatureTime}</span>{" "}
          <IoIosArrowRoundForward size={25} />
          <span className="temp-range"> {highTemperature}&deg;</span>{" "}
          <span className="temp-time">{highTemperatureTime}</span>
        </div>
        <div className="sun-rise-set">
          <WiSunrise size={"35"} /> <span className="temp-time">{sunrise}</span>{" "}
          <WiSunset size={"35"} /> <span className="temp-time">{sunset}</span>
        </div>
        <div className="uv-visibility-wind">
          <span className="uv-lable">UV Index:</span>
          <span className="uv-value">{uvIndex}</span>
          <span className="visibility-lable">Visibility:</span>
          <span className="visibiltiy-value">
            {Visibility}
            <span className="dayinfo-units">{visibilityUnits}</span>
          </span>
          <span className="wind-lable">Wind Speed: </span>
          <span className="wind-value">
            {wind}
            <span className="dayinfo-units">{windSpeedUnits}</span>
          </span>
        </div>
      </div>
    );
  }
}

export default DayInfo;
