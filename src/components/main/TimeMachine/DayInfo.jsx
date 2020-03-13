import React, { Component } from "react";
import { WiSunrise, WiSunset } from "react-icons/wi";
import { IoIosArrowRoundForward } from "react-icons/io";
import { getHours, getHoursMinutes } from "../../../utils/timeCoversions";

export class DayInfo extends Component {
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

    const lowTemperature = Math.round(temperatureLow);
    const highTemperature = Math.round(temperatureHigh);
    const Visibility = Math.round(visibility);
    const wind = Math.round(windSpeed);
    const highTemperatureTime = getHours(temperatureHighTime);
    const lowTemperatureTime = getHours(temperatureLowTime);
    const sunrise = getHoursMinutes(sunriseTime);
    const sunset = getHoursMinutes(sunsetTime);
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
