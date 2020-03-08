import React, { Component } from "react";

export class WeatherInfo extends Component {
  render() {
    const {
      mainTemperature,
      summary,
      apparentTemperature,
      lowTemp,
      higTemp
    } = this.props;

    const mainTemp = Math.floor(mainTemperature);
    const lowTemperature = Math.floor(lowTemp);
    const higTemperature = Math.floor(higTemp);
    const apparentTemp = Math.floor(apparentTemperature);

    return (
      <div className="weather-info">
        <div className="temperature-info">
          <span className="temperature">{mainTemp}&deg;</span>
          <span className="summary">{summary}</span>
        </div>
        <div className="feelslike-info">
          <span className="feelslike">
            Feels like: <strong>{apparentTemp}&deg;</strong>
          </span>{" "}
          <span>
            Low: <strong>{lowTemperature}&deg;</strong> High:{" "}
            <strong>{higTemperature}&deg;</strong>
          </span>
        </div>
      </div>
    );
  }
}

export default WeatherInfo;
