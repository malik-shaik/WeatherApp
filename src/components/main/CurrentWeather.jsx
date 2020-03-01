import React, { Component } from "react";
import ReactAnimatedWeather from "react-animated-weather";

export class CurrentWeather extends Component {
  render() {
    const defaults = {
      icon: "CLEAR_DAY",
      color: "white",
      size: 65,
      animate: true
    };

    const { weatherData } = this.props;
    // console.log(weatherData.currently);
    // const icon = weatherData.currently.icon.replace(/-/g, "-");

    return (
      <div className="content">
        <div className="weather-icon">
          <ReactAnimatedWeather
            icon={defaults.icon}
            color={defaults.color}
            size={defaults.size}
            animate={defaults.animate}
          />
        </div>
        <div className="weather-info">
          <span className="temperature-info"> 6 &#8451; Clear</span>
          <span>
            <i>Feels like:</i> -1 Low:2 High:7
          </span>
        </div>
      </div>
    );
  }
}

export default CurrentWeather;
