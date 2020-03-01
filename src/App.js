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
    currentPage: "/",
    weatherData: {}
  };

  onLanguageChange = appLanguage => this.setState({ appLanguage });
  onCurrentPageChange = currentPage => this.setState({ currentPage });

  onAddressChange = async (address, coordinates) => {
    const { appLanguage } = this.state;
    this.setState({ loading: true });
    const weatherData = await fetchWeatherData(coordinates, appLanguage);
    weatherData &&
      this.setState({ address, coordinates, weatherData, loading: false });
  };

  getLocalWeather = () => {
    const { appLanguage } = this.state;
    navigator.geolocation.getCurrentPosition(async position => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      const coordinates = { lat, lng };
      this.setState({ coordinates });
      this.setState({ loading: true });
      const weatherData = await fetchWeatherData(coordinates, appLanguage);
      const timezone = await weatherData.timezone;
      timezone && this.setState({ loading: false });
      const address = timezone.split("/")[1];
      this.setState({ address, weatherData });
    });
  };

  componentDidMount() {
    this.getLocalWeather();
  }

  render() {
    const {
      appLanguage,
      address,
      coordinates,
      weatherData,
      loading,
      currentPage
    } = this.state;

    // const { currently } = weatherData;

    console.log(weatherData.currently);

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
            <div>
              <Switch>
                <Route
                  exact
                  path="/"
                  component={props => (
                    <CurrentWeather weatherData={weatherData} {...props} />
                  )}
                />
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
