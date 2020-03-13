import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { fetchWeatherData } from "./apiCalls/fetchWeatherData";
import { MoonLoader } from "react-spinners";
import NavBar from "./components/layout/Navbar";
import CurrentWeather from "./components/main/CurrentWeather";
import TimeMachine from "./components/main/TimeMachine";
import Footer from "./components/layout/Footer";
import "./App.css";

export class App extends Component {
  state = {
    appLanguage: "En",
    units: "celsius",
    address: "",
    date: new Date(),
    coordinates: { lat: null, lng: null },
    weatherData: {},
    timeMachineData: {},
    loading: true
  };
  // ################ Get Local Weather Data ############################
  getLocalWeather = () => {
    const { appLanguage, units, date } = this.state;
    this.setState({ loading: true });
    navigator.geolocation.getCurrentPosition(async position => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      const coordinates = { lat, lng };
      const weatherData = await fetchWeatherData(
        coordinates,
        appLanguage,
        units,
        null
      );
      const timeMachineData = await fetchWeatherData(
        coordinates,
        appLanguage,
        units,
        date
      );
      this.setState({
        coordinates,
        weatherData,
        timeMachineData,
        loading: false
      });
      const timezone = weatherData.timezone;
      const address = timezone.split("/")[1];
      this.setState({ address });
    });
  };

  componentDidMount() {
    this.getLocalWeather();
  }

  // ################ Get Weather Data   ############################
  getWeatherData = async (coordinates, appLanguage, units, date) => {
    this.setState({ loading: true });
    const weatherData = await fetchWeatherData(
      coordinates,
      appLanguage,
      units,
      null
    );
    const timeMachineData = await fetchWeatherData(
      coordinates,
      appLanguage,
      units,
      date
    );
    this.setState({
      appLanguage,
      weatherData,
      timeMachineData,
      loading: false
    });
  };

  // ################ on change Handlers ############################
  onLanguageChange = async appLanguage => {
    const { coordinates, units, date } = this.state;
    this.getWeatherData(coordinates, appLanguage, units, date);
  };

  onUnitsChange = async units => {
    const { coordinates, appLanguage, date } = this.state;
    this.setState({ units });
    this.getWeatherData(coordinates, appLanguage, units, date);
  };

  onAddressChange = async (address, coordinates) => {
    const { appLanguage, units, date } = this.state;
    this.setState({ address, coordinates });
    this.getWeatherData(coordinates, appLanguage, units, date);
  };

  onDateChange = date => {
    const { coordinates, appLanguage, units } = this.state;
    this.setState({ date });
    this.getWeatherData(coordinates, appLanguage, units, date);
  };

  render() {
    const {
      appLanguage,
      address,
      coordinates,
      loading,
      weatherData,
      timeMachineData,
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
                      address={address}
                      weatherData={weatherData}
                      getLocalWeather={this.getLocalWeather}
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
                      units={units}
                      address={address}
                      timeMachineData={timeMachineData}
                      onDateChange={this.onDateChange}
                      getLocalWeather={this.getLocalWeather}
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
