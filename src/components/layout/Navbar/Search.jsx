import React, { Component } from "react";
import { FaSearch } from "react-icons/fa";
import cityTimezones from "city-timezones";
import { MoonLoader } from "react-spinners";

export class Search extends Component {
  state = {
    address: "",
    coordinates: { lat: null, lng: null },
    displaylist: false,
    suggestions: []
  };

  handleInputChange = evt => {
    const address = evt.target.value;
    this.setState({ address });
    if (address.length > 2) {
      const cities = cityTimezones.cityMapping;
      const suggestions = cities.filter(data => {
        const regex = new RegExp(`^${address}`, "gi");
        return data.city.match(regex);
      });
      this.setState({ suggestions, displaylist: true });
    } else this.setState({ displaylist: false });
  };

  handleSelectCity = (city, country, lat, lng) => {
    const address = `${city}, ${country}`;
    const coordinates = { lat, lng };
    const { displaylist } = this.state;
    this.setState({
      address,
      coordinates,
      displaylist: !displaylist
    });
  };

  handleSearch = (onAddressChange, address, coordinates) => {
    if (address.length !== 0) {
      onAddressChange(address, coordinates);
      this.setState({ address: "" });
    }
  };

  render() {
    const { onAddressChange, loading } = this.props;
    const { address, coordinates, suggestions, displaylist } = this.state;

    return (
      <div className="search-box">
        <input
          className="search-text"
          placeholder="Search City"
          value={address}
          onChange={this.handleInputChange}
          disabled={loading}
        />
        {loading ? (
          <MoonLoader size={18} color={"#2f96a3"} loading={loading} />
        ) : (
          <FaSearch
            id="search-icon"
            onClick={() =>
              this.handleSearch(onAddressChange, address, coordinates)
            }
          />
        )}
        {displaylist && (
          <div className="suggestion-list">
            {suggestions.map(({ city, iso3, lat, lng }, index) => (
              <li
                key={index}
                className="city"
                onClick={() => {
                  this.handleSelectCity(city, iso3, lat, lng);
                }}
              >
                {city}, {iso3}
              </li>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default Search;
