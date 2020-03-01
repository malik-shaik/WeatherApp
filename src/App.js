import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./components/layout/Navbar/Navbar";
import LandingPage from "./components/main/LandingPage";
import CurrentWeather from "./components/main/CurrentWeather";
import TimeMachine from "./components/main/TimeMachine";
import { fetchWeatherData } from "./components/main/apiCalls/fetchWeatherData";
import "./App.css";

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
    navigator.geolocation.getCurrentPosition(async position => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      const coordinates = { lat, lng };
      const data = await fetchWeatherData(coordinates, appLanguage);
      this.setState({ weatherData: data, loading: false });
      const timezone = data.timezone;
      const address = timezone.split("/")[1];
      this.setState({ address });
    });
  };

  // getWeatherData = async (coordinates, appLanguage) => {
  //   const weatherData = await fetchWeatherData(coordinates, appLanguage);
  //   this.setState({ weatherData, loading: false });
  // };

  componentDidMount() {
    this.getLocalWeather();
  }

  // componentDidUpdate() {
  //   const { appLanguage, coordinates } = this.state;
  //   this.getWeatherData(coordinates, appLanguage);
  // }

  onLanguageChange = appLanguage => this.setState({ appLanguage });
  onCurrentPageChange = currentPage => this.setState({ currentPage });

  onAddressChange = async (address, coordinates) => {
    const { appLanguage } = this.state;
    // this.getWeatherData(coordinates, appLanguage);
    const weatherData = await fetchWeatherData(coordinates, appLanguage);
    this.setState({ address });
    this.setState({ weatherData, loading: false });
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
            <LandingPage
              appLanguage={appLanguage}
              address={address}
              currentPage={currentPage}
              getLocalWeather={this.getLocalWeather}
              onCurrentPageChange={this.onCurrentPageChange}
            />
            {loading ? (
              <div>Loading...</div>
            ) : (
              <div>
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
              </div>
            )}
          </div>
        </Fragment>
      </Router>
    );
  }
}

export default App;
