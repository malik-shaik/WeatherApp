import React, { Component } from "react";
import { Link } from "react-router-dom";
import { MdGpsFixed } from "react-icons/md";
import "./main.css";

export class LandingPage extends Component {
  render() {
    const { currentPage, onCurrentPageChange } = this.props;

    return (
      <div className="landing-page-items">
        <MdGpsFixed className="gps-icon" />
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

export default LandingPage;
