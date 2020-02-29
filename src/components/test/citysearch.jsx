import React, { Component } from "react";
import cityTimezones from "city-timezones";

export class Citysearch extends Component {
  state = {
    address: "",
    coordinates: { lat: null, lng: null },
    display: false,
    suggestions: []
  };

  handleChange = e => {
    const address = e.target.value;
    console.log(address);

    if (address !== "") {
      const cities = cityTimezones.cityMapping;
      const suggestions = cities.filter(data => {
        const regex = new RegExp(`^${address}`, "gi");
        return data.city.match(regex);
      });
      console.log(suggestions);
      this.setState({ address, suggestions, display: !this.state.dispaly });
    }
  };

  render() {
    const { address, suggestions } = this.state;
    return (
      <div>
        <h3>Search city</h3>
        <input value={address} onChange={this.handleChange} />
        <div>
          {suggestions.map(({ city, lat, lng }) => (
            <li
              onClick={() =>
                this.setState({ address: city, coordinates: { lat, lng } })
              }
            >
              {city}
            </li>
          ))}
        </div>
      </div>
    );
  }
}

export default Citysearch;
