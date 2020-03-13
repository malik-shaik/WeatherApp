import React, { Component } from "react";

export class WeatherInfo extends Component {
  getTemperature = temperature => Math.round(temperature);

  render() {
    const {
      mainTemperature,
      summary,
      apparentTemperature,
      lowTemperature,
      highTemperature
    } = this.props;

    return (
      <div className="weather-info">
        <div className="temperature-info">
          <span className="temperature">
            {this.getTemperature(mainTemperature)}&deg;
          </span>
          <span className="summary">{summary}</span>
        </div>
        <div className="feelslike-info">
          <span className="feelslike">
            Feels like:{" "}
            <strong>{this.getTemperature(apparentTemperature)}&deg;</strong>
          </span>{" "}
          <span>
            Low: <strong>{this.getTemperature(lowTemperature)}&deg;</strong>{" "}
            High: <strong>{this.getTemperature(highTemperature)}&deg;</strong>
          </span>
        </div>
      </div>
    );
  }
}

export default WeatherInfo;
