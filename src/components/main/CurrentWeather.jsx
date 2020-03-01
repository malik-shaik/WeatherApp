import React, { Component } from "react";
import ReactAnimatedWeather from "react-animated-weather";

export class CurrentWeather extends Component {
  render() {
    const defaults = {
      icon: "CLEAR_NIGHT",
      color: "white",
      size: 51,
      animate: true
    };

    const { weatherData } = this.props;
    // console.log(weatherData.currently);
    // const icon = weatherData.currently.icon.replace(/-/g, "-");

    return (
      <div className="content">
        <ReactAnimatedWeather
          icon={defaults.icon}
          color={defaults.color}
          size={defaults.size}
          animate={defaults.animate}
        />
      </div>
    );
  }
}

export default CurrentWeather;
