import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export class Calendar extends Component {
  render() {
    const { date, setDates, onDateChange } = this.props;
    return (
      <div className="calender">
        <DatePicker
          selected={date}
          onChange={selectedDate => {
            setDates(selectedDate);
            onDateChange(selectedDate);
          }}
          inline
        />
      </div>
    );
  }
}

export default Calendar;
