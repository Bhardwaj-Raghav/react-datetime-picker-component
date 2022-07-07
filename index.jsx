import React, { useEffect, useState } from "react";
import moment from "moment";
import propTypes from "prop-types";

import { getCalenderMonth, MINUTES, HOURS } from "./util";

// import "./style.min.css";
import "./Style.scss";

const DateTime = (props) => {
  const format = props.format ?? "YYYY-MM-DD HH:mm:ss";
  const [selected, updateSelected] = useState(props.onlyTime ? "time" : "date");
  const [selectedMonth, updateSelectedMonth] = useState(moment());
  const [calenderMonth, updateCalenderMonth] = useState(
    getCalenderMonth(selectedMonth)
  );
  const [showHours, updateShowHours] = useState(false);
  const [showMinutes, updateShowMinutes] = useState(false);
  const [showSeconds, updateShowSeconds] = useState(false);

  const [selectedDateTime, updateSelectedDateTime] = useState(
    moment().format(format)
  );
  const [selectedDateOfTheMonth, updateSelectedDateOfTheMonth] = useState(
    moment().format("D")
  );

  const updateSelectedDate = (functionName, date) => {
    updateSelectedDateTime(
      moment(new Date(selectedDateTime)[functionName](date)).format(format)
    );
  };

  const updateSelectedTime = (functionName, date) => {
    updateSelectedDateTime(
      moment(new Date(selectedDateTime)[functionName](date)).format(format)
    );
  };

  useEffect(() => {
    updateCalenderMonth(getCalenderMonth(selectedMonth));
    const currentMonth = new Date().getMonth() + 1;
    if (
      (props.disableFuturedate && selectedMonth.format("M") > currentMonth) ||
      (props.disablePastdate && selectedMonth.format("M") < currentMonth)
    ) {
      updateSelectedDateTime("");
    } else {
      updateSelectedDateTime(
        moment(
          new Date(
            new Date(selectedDateTime).setMonth(selectedMonth.format("M") - 1)
          ).setFullYear(selectedMonth.format("YYYY"))
        ).format(format)
      );
    }
  }, [
    format,
    selectedDateTime,
    selectedMonth,
    props.disableFuturedate,
    props.disablePastdate,
  ]);

  useEffect(() => {
    updateSelectedDateOfTheMonth(new Date(selectedDateTime).getDate());
  }, [selectedDateTime]);

  const mainContent = (
    <div className="calender-time-picker">
      <div className="ctp-header">
        <div className="ctp-button-container">
          {props.onlyTime ? null : (
            <span
              onClick={() => {
                updateSelected("date");
              }}
              className={`ctp-date ${"date" === selected ? "ctp-active" : ""}`}
            >
              Date
            </span>
          )}
          {props.onlyDate ? (
            <></>
          ) : (
            <span
              onClick={() => {
                updateSelected("time");
              }}
              className={`ctp-time ${"time" === selected ? "ctp-active" : ""}`}
            >
              Time
            </span>
          )}
        </div>
      </div>
      {"date" === selected ? (
        <div className="ctp-body ctp-body-calender-date">
          <div className="ctp-month-year">
            <span
              className="ctp-prev-month"
              onClick={() => {
                updateSelectedMonth(selectedMonth.clone().subtract(1, "month"));
              }}
            >
              &lt;
            </span>
            <span className="ctp-current-month">
              {selectedMonth.format("MMMM YYYY")}
            </span>
            <span
              className="ctp-next-month"
              onClick={() => {
                updateSelectedMonth(selectedMonth.clone().add(1, "month"));
              }}
            >
              &gt;
            </span>
          </div>
          <div className="ctp-main-calender">
            <div className="ctp-box ctp-box-days">Sun</div>
            <div className="ctp-box ctp-box-days">Mon</div>
            <div className="ctp-box ctp-box-days">Tue</div>
            <div className="ctp-box ctp-box-days">Wed</div>
            <div className="ctp-box ctp-box-days">Thur</div>
            <div className="ctp-box ctp-box-days">Fri</div>
            <div className="ctp-box ctp-box-days">Sat</div>
            {calenderMonth.map((week) =>
              week.map((dayData, index) => (
                <div
                  onClick={
                    !dayData.isCurrentMonth ||
                    (props.disableFuturedate && dayData.isFuture) ||
                    (props.disablePastdate && dayData.isPast)
                      ? null
                      : () => {
                          updateSelectedDate(
                            "setDate",
                            dayData.date.format("D")
                          );
                          console.log(selectedDateOfTheMonth);
                          console.log(dayData.date.format("D"));
                          console.log(
                            `${selectedDateOfTheMonth}` ===
                              dayData.date.format("D") &&
                              `${selectedMonth}` === dayData.date.format("M") // &&
                            // `${selectedDateTime.format("Y")}` ===
                            //   dayData.date.format("Y")
                          );
                          console.log({
                            date: `${selectedDateOfTheMonth}`,
                            date1: dayData.date.format("D"),
                            month: `${selectedMonth.format("M")}`,
                            month1: dayData.date.format("M"),
                            year: selectedDateTime,
                            // `${selectedDateTime.format("Y")}`,
                            // dayData.date.format("Y")
                          });
                        }
                  }
                  className={`ctp-box ctp-box-date ${
                    dayData.isCurrentMonth ? "" : "not-current-month"
                  } ${
                    `${selectedDateOfTheMonth}` === dayData.date.format("D")
                      ? "selected"
                      : ""
                  } ${
                    (props.disableFuturedate && dayData.isFuture) ||
                    (props.disablePastdate && dayData.isPast)
                      ? "disabled-date"
                      : ""
                  } ${dayData.isWeekend ? "weekend-day" : ""}`}
                  id="ctp-box-8"
                  key={`${week}-${dayData}-${index}`}
                >
                  {dayData.date.format("D")}
                </div>
              ))
            )}
          </div>
        </div>
      ) : (
        <div className="ctp-body ctp-body-calender-time">
          <div className="ctp-main-time">
            <div className="ctp-main-time-header">
              <div className="ctp-box">Hr</div>
              <div className="ctp-box">Min</div>
              <div className="ctp-box">Sec</div>
              <div className="ctp-box"></div>
            </div>
            <div className="ctp-main-time-body">
              <div
                className={`${
                  showHours ? "" : "not-opened"
                } ctp-box ctp-box-time`}
              >
                <span
                  className="ctp-hour ctp-initial-time"
                  onClick={() => {
                    updateShowHours(!showHours);
                  }}
                >
                  {`${"0" + new Date(selectedDateTime).getHours()}`.slice(-2)}
                </span>
                <div
                  className={`${
                    showHours ? "" : "not-visible"
                  } ctp-overflow-hours`}
                >
                  {HOURS.map((hour) => (
                    <span
                      key={hour}
                      className="ctp-hour"
                      onClick={() => {
                        updateSelectedTime("setHours", Number(hour));
                        updateShowHours(!showHours);
                      }}
                    >
                      {hour}
                    </span>
                  ))}
                </div>
              </div>
              <div
                className={`${
                  showMinutes ? "" : "not-opened"
                } ctp-box ctp-box-time`}
              >
                <span
                  className="ctp-minute ctp-initial-time"
                  onClick={() => {
                    updateShowMinutes(!showMinutes);
                  }}
                >
                  {`${"0" + new Date(selectedDateTime).getMinutes()}`.slice(-2)}
                </span>
                <div
                  className={`${
                    showMinutes ? "" : "not-visible"
                  } ctp-overflow-minutes`}
                >
                  {MINUTES.map((minute) => (
                    <span
                      key={minute}
                      className="ctp-minute"
                      onClick={() => {
                        updateSelectedTime("setMinutes", Number(minute));
                        updateShowMinutes(!showMinutes);
                      }}
                    >
                      {minute}
                    </span>
                  ))}
                </div>
              </div>
              <div
                className={`${
                  showSeconds ? "" : "not-opened"
                } ctp-box ctp-box-time`}
              >
                <span
                  className="ctp-second ctp-initial-time"
                  onClick={() => {
                    updateShowSeconds(!showSeconds);
                  }}
                >
                  {`${"0" + new Date(selectedDateTime).getSeconds()}`.slice(-2)}
                </span>
                <div
                  className={`${
                    showSeconds ? "" : "not-visible"
                  } ctp-overflow-seconds`}
                >
                  {MINUTES.map((second) => (
                    <span
                      key={second}
                      className="ctp-second"
                      onClick={() => {
                        updateSelectedTime("setSeconds", Number(second));
                        updateShowSeconds(!showSeconds);
                      }}
                    >
                      {second}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="ctp-footer">
        <button
          className="close-button"
          onClick={() => {
            props.onClick("");
          }}
        >
          CLOSE
        </button>
        <button
          onClick={() => {
            props.onClick(selectedDateTime);
          }}
        >
          OK
        </button>
      </div>
    </div>
  );

  return props.notFixedPosition ? (
    mainContent
  ) : (
    <div className="calender-time-picker-absolute-container">{mainContent}</div>
  );
};

const DateTimeInput = (props) => {
  const [pickerVisible, setPickerVisibility] = useState(false);
  const [dateTime, setDateTime] = useState("");
  return (
    <>
      <input
        value={dateTime}
        readOnly={true}
        onClick={() => {
          setPickerVisibility(true);
        }}
      />
      {pickerVisible && (
        <DateTime
          {...props}
          onClick={(value) => {
            props.onClick(value);
            setDateTime(value);
            setPickerVisibility(false);
          }}
        />
      )}
    </>
  );
};

DateTime.propTypes = {
  onClick: propTypes.func.isRequired,
  onlyDate: propTypes.bool,
  onlyTime: propTypes.bool,
  disableFuturedate: propTypes.bool,
  disablePastdate: propTypes.bool,
  notFixedPosition: propTypes.bool,
  format: propTypes.string,
};

DateTimeInput.propTypes = {
  onClick: propTypes.func.isRequired,
  onlyDate: propTypes.bool,
  onlyTime: propTypes.bool,
  disableFuturedate: propTypes.bool,
  disablePastdate: propTypes.bool,
  notFixedPosition: propTypes.bool,
  format: propTypes.string,
};

DateTime.Input = DateTimeInput;

export default DateTime;
export { DateTimeInput };
