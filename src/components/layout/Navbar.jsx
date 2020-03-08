import React, { Component } from "react";
import Logo from "./Navbar/Logo";
import Search from "./Navbar/Search";
import AppLanguage from "./Navbar/AppLanguage";
import "./styles/layout.css";

export class NavBar extends Component {
  render() {
    const {
      appLanguage,
      onAddressChange,
      onLanguageChange,
      onUnitsChange,
      loading,
      units
    } = this.props;

    return (
      <header className="navbar">
        <Logo />
        <div className="header-items">
          <Search onAddressChange={onAddressChange} loading={loading} />
          <AppLanguage
            appLanguage={appLanguage}
            onLanguageChange={onLanguageChange}
          />
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
        </div>
      </header>
    );
  }
}

export default NavBar;
