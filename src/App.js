import React from "react";
import { connect } from "react-redux";
import Plotted from "./Plotted";
import {
  changeLocation,
  fetchData,
  setSelectedDate,
  setSelectedTemp
} from "./actions";
import "./App.css";

const API_KEY = process.env.REACT_APP_API_KEY;

class App extends React.Component {
  fetchData = event => {
    event.preventDefault();
    let location = encodeURIComponent(this.props.location);
    let url = `http://api.openweathermap.org/data/2.5/forecast?q=${location}&APPID=${API_KEY}&units=metric`;

    this.props.dispatch(fetchData(url));
  };

  onPlotClick = data => {
    if (data.points) {
      var number = data.points[0].pointNumber;
      this.props.dispatch(setSelectedDate(this.props.dates[number]));
      this.props.dispatch(setSelectedTemp(this.props.temps[number]));
    }
  };

  changeLocation = event => {
    //this.setState({ location: event.target.value });
    this.props.dispatch(changeLocation(event.target.value));
  };

  render() {
    let currentTemp = "Enter Location";
    if (this.props.data.list) {
      currentTemp = this.props.data.list[0].main.temp;
    }

    return (
      <div>
        <h1>RB Weather Report</h1>
        <form onSubmit={this.fetchData}>
          <label>
            I want to know the weather for:
            <input
              type="text"
              placeholder={"City, Country"}
              value={this.props.location}
              onChange={this.changeLocation}
            />
          </label>
        </form>
        <div className="wrapper">
          <p className="temp-wrapper">
            <span className="temp">
              {this.props.selected.temp
                ? this.props.selected.temp
                : currentTemp}
            </span>
            {currentTemp !== "Enter Location" ? (
              <span className="temp-symbol">&deg;C</span>
            ) : (
              ""
            )}
            <span className="temp-date">
              {this.props.selected.temp ? this.props.selected.date : ""}
            </span>
          </p>
          {this.props.data.list ? <h1>Forecast</h1> : null}
          {this.props.data.list ? (
            <Plotted
              onPlotClick={this.onPlotClick}
              xData={this.props.dates}
              yData={this.props.temps}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(App);
