import React, { Component, Fragment } from "react";
import ReactAnimatedWeather from "react-animated-weather";

export class CurrentWeather extends Component {
  state = {
    weatherData: this.props.weatherData,
    hourlyData: []
  };

  componentDidMount() {
    const { data } = this.state.weatherData.hourly;
    const { hourlyData } = this.state;
    for (let i = 0; i < 24; i++) {
      i % 2 !== 0 && hourlyData.push(data[i]);
    }
    this.setState({ hourlyData });
  }

  // convert unix time
  getTime = unixTime => {
    let date = new Date(unixTime * 1000);
    let hours = date.getHours();
    let time = hours >= 12 ? `${hours - 12}pm` : `${hours}am`;
    return time;
  };

  getIcon = icon => icon.replace(/-/g, "_").toUpperCase();

  render() {
    const { weatherData, hourlyData } = this.state;
    const {
      icon,
      temperature,
      apparentTemperature,
      summary
    } = this.state.weatherData.currently;
    const mainTemperature = Math.floor(temperature);
    const lowTemp = Math.floor(weatherData.daily.data[0].temperatureLow);
    const higTemp = Math.floor(weatherData.daily.data[0].temperatureHigh);
    const apparentTemp = Math.floor(apparentTemperature);
    const daySummary = weatherData.hourly.summary;

    return (
      <Fragment>
        <div className="content">
          <div className="weather-icon">
            <ReactAnimatedWeather
              icon={this.getIcon(icon)}
              color={"white"}
              size={75}
            />
          </div>
          <div className="weather-info">
            <div className="temperature-info">
              <span className="temperature">{mainTemperature}&deg;</span>
              <span className="summary">{summary}</span>
            </div>
            <div className="feelslike-info">
              <span className="feelslike">
                Feels like: <strong>{apparentTemp}&deg;</strong>
              </span>{" "}
              <span>
                Low: <strong>{lowTemp}&deg;</strong> High:{" "}
                <strong>{higTemp}&deg;</strong>
              </span>
            </div>
          </div>
        </div>
        <div className="daysummary">{daySummary}</div>
        <div className="hourly-data">
          {hourlyData.map(data => (
            <div key={data.time} className="hourData">
              <div className="hour">{this.getTime(data.time)}</div>
              <div id="hourly-icon">
                <ReactAnimatedWeather
                  icon={this.getIcon(data.icon)}
                  color={"white"}
                  size={25}
                />
              </div>
              <div className="hour-summary">{data.summary}</div>
              <div id="hourly-timperature">
                {Math.floor(data.temperature)}&deg;
              </div>
            </div>
          ))}
        </div>
      </Fragment>
    );
  }
}

export default CurrentWeather;
