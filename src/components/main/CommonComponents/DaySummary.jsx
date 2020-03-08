import React, { Component } from "react";

export class DaySummary extends Component {
  render() {
    const { daySummary } = this.props;
    return <div className="daysummary">{daySummary}</div>;
  }
}

export default DaySummary;
