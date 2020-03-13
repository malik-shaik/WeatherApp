import React, { Component, Fragment } from "react";
import WeatherInfo from "./CurrentWeather/WeatherInfo";
import WeatherIcon from "./CommonComponents/WeatherIcon";
import DaySummary from "./CommonComponents/DaySummary";
import WeeklyData from "./CurrentWeather/WeeklyData";
import ContentHeader from "./CommonComponents/ContentHeader";

export class CurrentWeather extends Component {
  state = {
    weatherData: this.props.weatherData,
    hourlyData: []
  };

  componentDidMount() {
    const { data } = this.state.weatherData.hourly;
    const { hourlyData } = this.state;
    for (let i = 0; i < 24; i += 2) {
      // i % 2 !== 0 && hourlyData.push(data[i]);
      hourlyData.push(data[i]);
    }
    this.setState({ hourlyData });
  }

  render() {
    const { address, getLocalWeather } = this.props;
    const { weatherData } = this.state;
    const { data: weeklyData } = this.state.weatherData.daily;
    const {
      icon,
      temperature,
      apparentTemperature,
      summary
    } = this.state.weatherData.currently;

    const mainTemperature = Math.floor(temperature);
    const lowTemp = weeklyData[0].temperatureLow;
    const higTemp = weeklyData[0].temperatureHigh;
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
            mainTemperature={mainTemperature}
            summary={summary}
            apparentTemperature={apparentTemperature}
            lowTemp={lowTemp}
            higTemp={higTemp}
          />
        </div>
        <DaySummary daySummary={daySummary} />
        <WeeklyData weeklyData={weeklyData} />
      </Fragment>
    );
  }
}

export default CurrentWeather;
