import React from "react";
import { connect } from "react-redux";
import Plotted from "./Plotted";
import Header from "./Header";
import {
  changeLocation,
  fetchData,
  setSelectedDate,
  setSelectedTemp
} from "./actions";
import "./App.css";

const API_KEY = process.env.REACT_APP_API_KEY;

export class App extends React.Component {
  fetchData = event => {
    event.preventDefault();
    let location = encodeURIComponent(this.props.redux.get("location"));
    let url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&APPID=${API_KEY}&units=metric`;

    this.props.dispatch(fetchData(url));
  };

  onPlotClick = data => {
    if (data.points) {
      var number = data.points[0].pointNumber;
      this.props.dispatch(
        setSelectedDate(this.props.redux.getIn(["dates", number]))
      );
      this.props.dispatch(
        setSelectedTemp(this.props.redux.getIn(["temps", number]))
      );
    }
  };

  changeLocation = event => {
    this.props.dispatch(changeLocation(event.target.value));
  };

  render() {
    let currentTemp = "Enter Location";
    if (this.props.redux.getIn(["data", "list"])) {
      currentTemp = this.props.redux.getIn([
        "data",
        "list",
        "0",
        "main",
        "temp"
      ]);
    }

    return (
      <div>
        <Header />
        <form onSubmit={this.fetchData}>
          <label>
            I want to know the weather for:
            <input
              type="text"
              placeholder={"City, Country"}
              value={this.props.redux.get("location")}
              onChange={this.changeLocation}
            />
          </label>
        </form>
        <div className="wrapper">
          <p className="temp-wrapper">
            <span className="temp">
              {this.props.redux.getIn(["selected", "temp"])
                ? this.props.redux.getIn(["selected", "temp"])
                : currentTemp}
            </span>
            {currentTemp !== "Enter Location" ? (
              <span className="temp-symbol">&deg;C</span>
            ) : (
              ""
            )}
            <span className="temp-date">
              {this.props.redux.getIn(["selected", "date"])
                ? this.props.redux.getIn(["selected", "date"])
                : ""}
            </span>
          </p>
          {this.props.redux.getIn(["data", "list"]) ? <h1>Forecast</h1> : null}
          {this.props.redux.getIn(["data", "list"]) ? (
            <Plotted
              xData={this.props.redux.get("dates")}
              yData={this.props.redux.get("temps")}
              onPlotClick={this.onPlotClick}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    redux: state
  };
}

export default connect(mapStateToProps)(App);
