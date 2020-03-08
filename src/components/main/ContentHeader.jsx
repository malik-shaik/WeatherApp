import React, { Component } from "react";
import { Link } from "react-router-dom";
import { MdGpsFixed } from "react-icons/md";
import "./styles/main.css";

export class ContentHeader extends Component {
  render() {
    const { address, navLink, linkName, getLocalWeather } = this.props;

    return (
      <div className="landing-page-items">
        <MdGpsFixed className="gps-icon" onClick={getLocalWeather} />
        <div className="place">{address}</div>
        <Link className="nav-link" to={navLink}>
          {linkName}
        </Link>
      </div>
    );
  }
}

export default ContentHeader;
