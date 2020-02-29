import React, { Component } from "react";

export class AppLanguage extends Component {
  state = {
    languageCodes: ["ar", "az", "be", "bg", "bn", "bs", "ca", "cs", "da", "de"],
    displaylist: false
  };

  render() {
    const { onChangeLanguage, appLanguage } = this.props;
    const { languageCodes, displaylist } = this.state;

    return (
      <div
        className="app-language-div"
        onClick={() => this.setState({ displaylist: !displaylist })}
      >
        <span className="app-language-text">{appLanguage.toUpperCase()}</span>
        {displaylist && (
          <div className="language-list">
            {languageCodes.map(languageCode => (
              <li
                key={languageCode}
                className="language"
                onClick={() => onChangeLanguage(languageCode)}
              >
                {languageCode.toUpperCase()}
              </li>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default AppLanguage;
