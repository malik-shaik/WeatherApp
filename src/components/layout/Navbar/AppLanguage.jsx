import React, { Component } from "react";

export class AppLanguage extends Component {
  state = {
    languageCodes: ["ar", "bn", "da", "de", "en", "es", "hi", "ru", "zh"],
    displaylist: false
  };

  render() {
    const { onLanguageChange, appLanguage } = this.props;
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
                onClick={() => onLanguageChange(languageCode)}
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
