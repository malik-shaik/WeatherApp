import React, { Component } from "react";
import WeatherIcon from "../CommonComponents/WeatherIcon";
import moment from "moment";

export class WeeklyData extends Component {
  // convert unix timestamp into date & time
  getTime = unixTime => {
    let date = new Date(unixTime * 1000);
    let day = moment(date).format("dddd");
    return day;
  };

  render() {
    const { weeklyData } = this.props;
    const lowTemp = Math.floor(weeklyData[0].temperatureLow);
    const higTemp = Math.floor(weeklyData[0].temperatureHigh);
    return (
      <div className="weekly-data">
        {weeklyData.map((data, index) => (
          <div key={index} className="weekData">
            <div className="weekday">
              {index === 0 ? "Today" : this.getTime(data.time)}
            </div>
            <div id="weekly-icon">
              <WeatherIcon icon={data.icon} color={"white"} size={25} />
            </div>
            <div className="day-summary">{data.summary}</div>
            <div id="day-timperature">
              {higTemp}&deg; - {lowTemp}&deg;
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default WeeklyData;
