import React, { Component } from "react";
import WeatherIcon from "../CommonComponents/WeatherIcon";
import { getDay } from "../../../utils/timeCoversions";

export class WeeklyData extends Component {
  getTemperature = temperature => Math.round(temperature);
  render() {
    const { weeklyData } = this.props;
    return (
      <div className="weekly-data">
        {weeklyData.map((day, index) => (
          <div key={index} className="weekData">
            <div className="weekday">
              {index === 0 ? "Today" : getDay(day.time)}
            </div>
            <div id="weekly-icon">
              <WeatherIcon icon={day.icon} color={"white"} size={25} />
            </div>
            <div className="day-summary">{day.summary}</div>
            <div id="day-timperature">
              {this.getTemperature(day.temperatureHigh)}&deg; -{" "}
              {this.getTemperature(day.temperatureLow)}&deg;
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default WeeklyData;
