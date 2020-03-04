import React, { Component } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import {
  IoMdClose,
  IoIosArrowRoundBack,
  IoIosArrowRoundForward
} from "react-icons/io";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

export class TimeMachine extends Component {
  state = {
    currentDay: "",
    nextDay: "",
    previousDay: "",
    displayCalander: false
  };

  componentDidMount() {
    const { date } = this.props;
    this.setDates(date);
  }

  setDates = date => {
    const nextDate = this.nextDate(date);
    const nextDay = moment(nextDate)
      .format("dddd Do MMMM")
      .toString();
    const previousDate = this.previousDate(date);
    const previousDay = moment(previousDate)
      .format("dddd Do MMMM")
      .toString();
    this.setState({ nextDay, previousDay });
  };

  nextDate = date => moment(date).add(1, "days")._d;
  previousDate = date => moment(date).subtract(1, "days")._d;

  render() {
    const { nextDay, previousDay, displayCalander } = this.state;
    const { date, onDateChange } = this.props;
    return (
      <div className="content">
        <div className="days-wrapper">
          <div
            onClick={() => onDateChange(this.previousDate(date))}
            className="previousday"
          >
            <IoIosArrowRoundBack size={30} /> {previousDay}{" "}
          </div>
          <div className="selectedday">
            <span>{date.toDateString()} </span>
            {displayCalander ? (
              <IoMdClose
                onClick={() =>
                  this.setState({ displayCalander: !displayCalander })
                }
              />
            ) : (
              <FaRegCalendarAlt
                onClick={() =>
                  this.setState({ displayCalander: !displayCalander })
                }
              />
            )}
            {displayCalander && (
              <div className="calender">
                <DatePicker
                  selected={date}
                  onChange={selectedDate => {
                    this.setDates(selectedDate);
                    onDateChange(selectedDate);
                  }}
                  inline
                />
              </div>
            )}
          </div>
          <div
            onClick={() => onDateChange(this.nextDate(date))}
            className="nextday"
          >
            {" "}
            {nextDay}
            <IoIosArrowRoundForward size={30} />
          </div>
        </div>
      </div>
    );
  }
}

export default TimeMachine;
