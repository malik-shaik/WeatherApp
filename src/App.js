import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { MoonLoader } from "react-spinners";
import { fetchWeatherData } from "./components/main/apiCalls/fetchWeatherData";
import NavBar from "./components/layout/Navbar";
import CurrentWeather from "./components/main/CurrentWeather";
import TimeMachine from "./components/main/TimeMachine";
import MainContentHeader from "./components/main/MainContentHeader";
import Footer from "./components/layout/Footer";
import "./App.css";

export class App extends Component {
  state = {
    appLanguage: "En",
    units: "celsius",
    address: "",
    date: new Date(),
    coordinates: { lat: null, lng: null },
    loading: true,
    currentPage: "/",
    weatherData: {}
  };

  getLocalWeather = () => {
    const { appLanguage, units } = this.state;
    this.setState({ loading: true });
    navigator.geolocation.getCurrentPosition(async position => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      const coordinates = { lat, lng };
      const weatherData = await fetchWeatherData(
        coordinates,
        appLanguage,
        units
      );
      this.setState({ coordinates, weatherData, loading: false });
      const timezone = weatherData.timezone;
      const address = timezone.split("/")[1];
      this.setState({ address });
    });
  };

  componentDidMount() {
    this.getLocalWeather();
  }

  getTodaysWeatherData = async (coordinates, appLanguage, units) => {
    this.setState({ loading: true });
    const weatherData = await fetchWeatherData(coordinates, appLanguage, units);
    this.setState({ appLanguage, weatherData, loading: false });
  };

  onCurrentPageChange = currentPage => this.setState({ currentPage });

  onLanguageChange = async appLanguage => {
    const { coordinates, units } = this.state;
    this.getTodaysWeatherData(coordinates, appLanguage, units);
  };

  onUnitsChange = async units => {
    const { coordinates, appLanguage } = this.state;
    this.setState({ units });
    this.getTodaysWeatherData(coordinates, appLanguage, units);
  };

  onAddressChange = async (address, coordinates) => {
    const { appLanguage, units } = this.state;
    this.setState({ address });
    this.getTodaysWeatherData(coordinates, appLanguage, units);
  };

  onDateChange = date => {
    // const unixTimeStamp = Math.round(date.getTime() / 1000);
    this.setState({ date });
    console.log(date);
  };

  render() {
    const {
      appLanguage,
      address,
      coordinates,
      loading,
      weatherData,
      currentPage,
      date,
      units
    } = this.state;

    return (
      <Router>
        <Fragment>
          <NavBar
            appLanguage={appLanguage}
            units={units}
            address={address}
            coordinates={coordinates}
            loading={loading}
            onLanguageChange={this.onLanguageChange}
            onAddressChange={this.onAddressChange}
            onUnitsChange={this.onUnitsChange}
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
                <Route
                  exact
                  path="/timemachine"
                  component={props => (
                    <TimeMachine
                      date={date}
                      onDateChange={this.onDateChange}
                      {...props}
                    />
                  )}
                />
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
