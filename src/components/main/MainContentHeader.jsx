import React, { Component } from "react";
import { Link } from "react-router-dom";
import { MdGpsFixed } from "react-icons/md";
import "./main.css";

export class MainContentHeader extends Component {
  render() {
    const {
      address,
      currentPage,
      onCurrentPageChange,
      getLocalWeather
    } = this.props;
    return (
      <div className="landing-page-items">
        <MdGpsFixed className="gps-icon" onClick={getLocalWeather} />
        <div className="place">{address}</div>
        {currentPage === "/" ? (
          <Link
            onClick={() => onCurrentPageChange("/timemachine")}
            className="nav-link"
            to="/timemachine"
          >
            Time Machine
          </Link>
        ) : (
          <Link
            onClick={() => onCurrentPageChange("/")}
            className="nav-link"
            to="/"
          >
            Today's Weather
          </Link>
        )}
      </div>
    );
  }
}

export default MainContentHeader;
