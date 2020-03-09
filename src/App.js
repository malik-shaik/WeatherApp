import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { MoonLoader } from "react-spinners";
import moment from "moment";
import { fetchWeatherData } from "./apiCalls/fetchWeatherData";
import { fetchTimeMachineData } from "./apiCalls/fetchTimeMachineData";
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
    timezone: "",
    weatherData: {},
    timeMachineData: {},
    loading: true
  };

  getTimeZonesLocalTime = (date, timezone) => {
    console.log(date);
    return moment(date).format("YYYY-MM-DDTHH:mm:ss");
  };

  getLocalWeather = () => {
    const { appLanguage, units, date, timezone } = this.state;
    const localTime = this.getTimeZonesLocalTime(date, timezone);
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
      const timeMachineData = await fetchTimeMachineData(
        coordinates,
        appLanguage,
        units,
        localTime
      );
      this.setState({
        coordinates,
        weatherData,
        timeMachineData,
        loading: false
      });
      const timezone = weatherData.timezone;
      const address = timezone.split("/")[1];
      this.setState({ address, timezone });
    });
  };

  componentDidMount() {
    this.getLocalWeather();
  }

  getTimeMachineData = async (
    coordinates,
    appLanguage,
    units,
    date,
    timezone
  ) => {
    this.setState({ loading: true });
    console.log(timezone);
    const localTime = this.getTimeZonesLocalTime(date, timezone);
    const timeMachineData = await fetchTimeMachineData(
      coordinates,
      appLanguage,
      units,
      localTime
    );
    this.setState({ appLanguage, timeMachineData, loading: false });
  };

  getTodaysWeatherData = async (coordinates, appLanguage, units) => {
    this.setState({ loading: true });
    const weatherData = await fetchWeatherData(coordinates, appLanguage, units);
    this.setState({ appLanguage, weatherData, loading: false });
  };

  onLanguageChange = async appLanguage => {
    const { coordinates, units, date, timezone } = this.state;
    this.getTodaysWeatherData(coordinates, appLanguage, units);
    this.getTimeMachineData(coordinates, appLanguage, units, date, timezone);
  };

  onUnitsChange = async units => {
    const { coordinates, appLanguage, date, timezone } = this.state;
    this.setState({ units });
    this.getTodaysWeatherData(coordinates, appLanguage, units);
    this.getTimeMachineData(coordinates, appLanguage, units, date, timezone);
  };

  onAddressChange = async (address, coordinates, timezone) => {
    const { appLanguage, units, date } = this.state;
    this.setState({ address, coordinates, timezone });
    this.getTodaysWeatherData(coordinates, appLanguage, units);
    this.getTimeMachineData(coordinates, appLanguage, units, date, timezone);
  };

  onDateChange = date => {
    const { coordinates, appLanguage, units, timezone } = this.state;
    this.setState({ date });
    this.getTimeMachineData(coordinates, appLanguage, units, date, timezone);
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
                      coordinates={coordinates}
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
