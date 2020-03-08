import React, { Component } from "react";
import WeatherIcon from "../CommonComponents/WeatherIcon";

export class HourlyData extends Component {
  // convert unix time
  getTime = unixTime => {
    let date = new Date(unixTime * 1000);
    let hours = date.getHours();
    let time = hours > 12 ? `${hours - 12}pm` : `${hours}am`;
    return time;
  };

  render() {
    const { hourlyData } = this.props;

    return (
      <div className="hourly-data">
        {hourlyData.map(data => (
          <div key={data.time} className="hourData">
            <div className="hour">{this.getTime(data.time)}</div>
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
