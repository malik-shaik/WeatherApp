import React, { Component, Fragment } from "react";
import DatesSection from "./TimeMachine/DatesSection";
import DaySummary from "./CommonComponents/DaySummary";
import HourlyData from "./TimeMachine/HourlyData";
import DayInfo from "./TimeMachine/DayInfo";
import ContentHeader from "./CommonComponents/ContentHeader";

export class TimeMachine extends Component {
  state = {
    timeMachineData: this.props.timeMachineData,
    hourlyData: []
  };

  componentDidMount() {
    const { data } = this.state.timeMachineData.hourly;
    const { hourlyData } = this.state;
    for (let i = 0; i < 24; i += 2) {
      hourlyData.push(data[i]);
    }
    // for (let i = 0; i < 24; i++) {
    //   i % 2 === 0 && hourlyData.push(data[i]);
    // }
    this.setState({ hourlyData });
  }
  render() {
    const { date, onDateChange, address, getLocalWeather, units } = this.props;
    const { hourlyData } = this.state;
    const {
      summary: daySummary,
      windSpeed,
      uvIndex,
      visibility,
      sunriseTime,
      sunsetTime,
      temperatureHigh,
      temperatureHighTime,
      temperatureLow,
      temperatureLowTime
    } = this.state.timeMachineData.daily.data[0];

    return (
      <Fragment>
        <ContentHeader
          address={address}
          navLink="/"
          linkName="Today's Weather"
          getLocalWeather={getLocalWeather}
        />
        <DatesSection date={date} onDateChange={onDateChange} />
        <DaySummary daySummary={daySummary} />
        <DayInfo
          dayInfo={{
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
          }}
        />
        <HourlyData hourlyData={hourlyData} />
      </Fragment>
    );
  }
}

export default TimeMachine;
