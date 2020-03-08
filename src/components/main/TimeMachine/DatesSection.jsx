import React, { Component } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import {
  IoMdClose,
  IoIosArrowRoundBack,
  IoIosArrowRoundForward
} from "react-icons/io";
import moment from "moment";
import Calendar from "./Calendar";

export class DatesSection extends Component {
  state = {
    nextDay: "",
    previousDay: "",
    displayCalander: false
  };

  componentDidMount() {
    const { date } = this.props;
    this.setDates(date);
  }

  setDates = date => {
    const nextdate = this.nextDate(date);
    const nextDay = moment(nextdate)
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
            <Calendar
              date={date}
              setDates={this.setDates}
              onDateChange={onDateChange}
            />
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
    );
  }
}

export default DatesSection;
