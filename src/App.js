import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { fetchWeatherData } from "./components/main/apiCalls/fetchWeatherData";
import NavBar from "./components/layout/Navbar/Navbar";
import LandingPage from "./components/main/LandingPage";
import CurrentWeather from "./components/main/CurrentWeather";
import TimeMachine from "./components/main/TimeMachine";
import "./App.css";

export class App extends Component {
  state = {
    appLanguage: "En",
    address: "",
    coordinates: { lat: null, lng: null },
    loading: false,
    currentPage: "/"
  };

  onChangeLanguage = appLanguage => this.setState({ appLanguage });
  onCurrentPageChange = currentPage => this.setState({ currentPage });

  onAddressChange = (address, coordinates) => {
    this.setState({ address, coordinates, loading: true });
    setTimeout(() => {
      this.setState({ loading: false });
    }, 7000);
  };

  componentDidMount() {
    const city = "";
    navigator.geolocation.getCurrentPosition((position, city) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      const coordinates = { lat, lng };
      this.setState({ coordinates });
      console.log(coordinates);
      city = fetchWeatherData(coordinates);
    });
    this.setState({ address: city });
  }

  render() {
    const {
      appLanguage,
      address,
      coordinates,
      loading,
      currentPage
    } = this.state;
    return (
      <Router>
        <Fragment>
          <NavBar
            appLanguage={appLanguage}
            address={address}
            coordinates={coordinates}
            loading={loading}
            onChangeLanguage={this.onChangeLanguage}
            onAddressChange={this.onAddressChange}
          />
          <div className="main-content">
            <LandingPage
              appLanguage={appLanguage}
              address={address}
              currentPage={currentPage}
              onCurrentPageChange={this.onCurrentPageChange}
            />
            <div>
              <Switch>
                <Route exact path="/" component={CurrentWeather} />
                <Route exact path="/timemachine" component={TimeMachine} />
              </Switch>
            </div>
          </div>
        </Fragment>
      </Router>
    );
  }
}

export default App;
