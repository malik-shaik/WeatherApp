import React, { Component } from "react";

export class Units extends Component {
  render() {
    const { units, onUnitsChange } = this.props;
    return (
      <div className="units">
        <span
          onClick={() => onUnitsChange("celsius")}
          className={units === "celsius" ? "active" : ""}
        >
          C&deg;
        </span>
        /
        <span
          onClick={() => onUnitsChange("fahrenheit")}
          className={units === "fahrenheit" ? "active" : ""}
        >
          F&deg;
        </span>
      </div>
    );
  }
}

export default Units;
