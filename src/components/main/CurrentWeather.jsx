import React, { Component, Fragment } from "react";
import ReactAnimatedWeather from "react-animated-weather";

export class CurrentWeather extends Component {
  state = {
    address: this.props.address,
    weatherData: this.props.weatherData,
    hourlyData: [],
    loading: this.props.loading
  };

  componentDidMount() {
    const { data } = this.state.weatherData.hourly;
    const { hourlyData } = this.state;
    for (let i = 0; i < 23; i++) {
      i % 2 !== 0 && hourlyData.push(data[i]);
      // if (i % 2 !== 0) {
      //   let unix_timestamp = data[i].time;
      //   let date = new Date(unix_timestamp * 1000);
      //   var hours = date.getHours();
      //   console.log(hours);
      //   hourlyData.push(data[i]);
      // }
      this.setState({ hourlyData });
    }
  }

  render() {
    const { weatherData } = this.state;
    const {
      icon: i,
      temperature,
      apparentTemperature,
      summary
    } = this.state.weatherData.currently;
    const icon = i.replace(/-/g, "_").toUpperCase();
    const iconColor = "white";
    const iconSize = 75;
    const lowTemp = Math.floor(weatherData.daily.data[0].temperatureLow);
    const higTemp = Math.floor(weatherData.daily.data[0].temperatureHigh);
    const daySummary = weatherData.hourly.summary;

    return (
      <Fragment>
        <div className="content">
          <div className="weather-icon">
            <ReactAnimatedWeather
              icon={icon}
              color={iconColor}
              size={iconSize}
            />
          </div>
          <div className="weather-info">
            <div className="temperature-info">
              <span className="temperature">
                {Math.floor(temperature)}&deg;
              </span>
              <span className="summary">{summary}</span>
            </div>
            <div className="feelslike-info">
              <span className="feelslike">
                Feels like:{" "}
                <strong>{Math.floor(apparentTemperature)}&deg;</strong>
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
          <div className="hourData">
            {" "}
            <div className="hour">1</div> <div id="data">1</div>{" "}
          </div>
          <div className="hourData">
            {" "}
            <div className="hour">2</div> <div id="data">1</div>{" "}
          </div>
          <div className="hourData">
            {" "}
            <div className="hour">3</div> <div id="data">1</div>{" "}
          </div>
          <div className="hourData">
            {" "}
            <div className="hour">4</div> <div id="data">1</div>{" "}
          </div>
          <div className="hourData">
            {" "}
            <div className="hour">5</div> <div id="data">1</div>{" "}
          </div>
        </div>
      </Fragment>
    );
  }
}

export default CurrentWeather;
