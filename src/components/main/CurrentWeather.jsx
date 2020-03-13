import React, { Component, Fragment } from "react";
import WeatherInfo from "./CurrentWeather/WeatherInfo";
import WeatherIcon from "./CommonComponents/WeatherIcon";
import DaySummary from "./CommonComponents/DaySummary";
import WeeklyData from "./CurrentWeather/WeeklyData";
import ContentHeader from "./CommonComponents/ContentHeader";

export class CurrentWeather extends Component {
  render() {
    const { address, weatherData, getLocalWeather } = this.props;
    const { data: weeklyData } = weatherData.daily;
    const {
      icon,
      temperature,
      apparentTemperature,
      summary
    } = weatherData.currently;

    const lowTemp = weeklyData[0].temperatureLow;
    const highTemp = weeklyData[0].temperatureHigh;
    const daySummary = weatherData.hourly.summary;

    return (
      <Fragment>
        <ContentHeader
          address={address}
          navLink="/timemachine"
          linkName="Time Machine"
          getLocalWeather={getLocalWeather}
        />
        <div className="content">
          <WeatherIcon icon={icon} color={"white"} size={75} />
          <WeatherInfo
            mainTemperature={temperature}
            summary={summary}
            apparentTemperature={apparentTemperature}
            lowTemperature={lowTemp}
            highTemperature={highTemp}
          />
        </div>
        <DaySummary daySummary={daySummary} />
        <WeeklyData weeklyData={weeklyData} />
      </Fragment>
    );
  }
}

export default CurrentWeather;
