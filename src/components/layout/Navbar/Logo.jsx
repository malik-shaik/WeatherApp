import React, { Component } from "react";
import weatherLogo from "../styles/logo.png";

export class Logo extends Component {
  render() {
    return (
      <div className="logo-container">
        <img className="logo" src={weatherLogo} alt="" />
      </div>
    );
  }
}

export default Logo;
