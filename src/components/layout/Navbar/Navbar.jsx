import React, { Component } from "react";
import Logo from "./Logo";
import Search from "./Search";
import AppLanguage from "./AppLanguage";
import "../layout.css";

export class NavBar extends Component {
  render() {
    const {
      appLanguage,
      onAddressChange,
      onLanguageChange,
      loading
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
        </div>
      </header>
    );
  }
}

export default NavBar;
