import React, { Component } from "react";
import ReactAnimatedWeather from "react-animated-weather";

export class WeatherIcon extends Component {
  getIcon = icon => icon.replace(/-/g, "_").toUpperCase();
  render() {
    const { icon, color, size } = this.props;
    return (
      <div className="weather-icon">
        <ReactAnimatedWeather
          icon={this.getIcon(icon)}
          color={color}
          size={size}
        />
      </div>
    );
  }
}

export default WeatherIcon;
