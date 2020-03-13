import React, { Component } from "react";
import WeatherIcon from "../CommonComponents/WeatherIcon";
import { getHours } from "../../../utils/timeCoversions";

export class HourlyData extends Component {
  render() {
    const { hourlyData } = this.props;
    return (
      <div className="hourly-data">
        {hourlyData.map(data => (
          <div key={data.time} className="hourData">
            <div className="hour">{getHours(data.time)}</div>
            <div id="hourly-icon">
              <WeatherIcon icon={data.icon} color={"white"} size={25} />
            </div>
            <div className="hour-summary">{data.summary}</div>
            <div id="hourly-timperature">
              {Math.round(data.temperature)}&deg;
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default HourlyData;
