import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { MoonLoader } from "react-spinners";
import { fetchWeatherData } from "./components/main/apiCalls/fetchWeatherData";
import NavBar from "./components/layout/Navbar";
import CurrentWeather from "./components/main/CurrentWeather";
import TimeMachine from "./components/main/TimeMachine";
import MainContentHeader from "./components/main/MainContentHeader";

import "./App.css";
import Footer from "./components/layout/Footer";

export class App extends Component {
  state = {
    appLanguage: "En",
    address: "",
    coordinates: { lat: null, lng: null },
    loading: true,
    currentPage: "/",
    weatherData: {}
  };

  getLocalWeather = () => {
    const { appLanguage } = this.state;
    this.setState({ loading: true });
    navigator.geolocation.getCurrentPosition(async position => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      const coordinates = { lat, lng };
      const weatherData = await fetchWeatherData(coordinates, appLanguage);
      this.setState({ coordinates, weatherData, loading: false });
      const timezone = weatherData.timezone;
      const address = timezone.split("/")[1];
      this.setState({ address });
    });
  };

  componentDidMount() {
    this.getLocalWeather();
  }

  onCurrentPageChange = currentPage => this.setState({ currentPage });

  onLanguageChange = async appLanguage => {
    const { coordinates } = this.state;
    this.setState({ loading: true });
    const weatherData = await fetchWeatherData(coordinates, appLanguage);
    this.setState({ appLanguage, weatherData, loading: false });
  };

  onAddressChange = async (address, coordinates) => {
    const { appLanguage } = this.state;
    const weatherData = await fetchWeatherData(coordinates, appLanguage);
    this.setState({ address, coordinates, weatherData, loading: false });
  };

  render() {
    const {
      appLanguage,
      address,
      coordinates,
      loading,
      weatherData,
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
            onLanguageChange={this.onLanguageChange}
            onAddressChange={this.onAddressChange}
          />
          <div className="main-content">
            <MainContentHeader
              appLanguage={appLanguage}
              address={address}
              currentPage={currentPage}
              getLocalWeather={this.getLocalWeather}
              onCurrentPageChange={this.onCurrentPageChange}
            />

            {loading ? (
              <div id="loading-spinner" className="content">
                <MoonLoader size={50} color={"#fff"} loading={loading} />
              </div>
            ) : (
              <Switch>
                <Route
                  exact
                  path="/"
                  component={props => (
                    <CurrentWeather
                      appLanguage={appLanguage}
                      coordinates={coordinates}
                      weatherData={weatherData}
                      onAddressChange={this.onAddressChange}
                      {...props}
                    />
                  )}
                />
                <Route exact path="/timemachine" component={TimeMachine} />
              </Switch>
            )}
          </div>
          <Footer />
        </Fragment>
      </Router>
    );
  }
}

export default App;
