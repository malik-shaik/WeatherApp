import React, { Component } from "react";
import ReactAnimatedWeather from "react-animated-weather";

export class CurrentWeather extends Component {
  state = {
    address: this.props.address,
    weatherData: this.props.weatherData,
    loading: this.props.loading
  };

  render() {
    const defaults = { icon: "CLEAR_DAY", color: "white", size: 75 };
    const { icon: i, temperature, summary } = this.state.weatherData.currently;
    const icon = i.replace(/-/g, "_").toUpperCase();
    return (
      <div className="content">
        <div className="weather-icon">
          <ReactAnimatedWeather
            icon={icon}
            // icon="RAIN"
            color={defaults.color}
            size={defaults.size}
          />
        </div>
        <div className="weather-info">
          <span className="temperature-info">
            {Math.floor(temperature)}&deg;
          </span>
          {summary}
          <span>
            <i>Feels like:</i> -1 Low:2 High:7
          </span>
        </div>
      </div>
    );
  }
}

export default CurrentWeather;
