import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import Plot from "react-plotly.js";
import {
  changeLocation,
  setData,
  setDates,
  setTemps,
  setSelectedDate,
  setSelectedTemp
} from "./actions";
import "./App.css";

const API_KEY = process.env.REACT_APP_API_KEY;

class App extends React.Component {
  componentDidMount() {
    this.drawPlot();
  }

  componentDidUpdate() {
    this.drawPlot();
  }

  drawPlot = () => {
    if (document.getElementById("graph") === null) {
      return;
    }

    let data = [
        {
          x: this.props.dates,
          y: this.props.temps,
          type: "scatter",
          marker: { color: "red" }
        }
      ],
      layout = {
        margin: {
          t: 10,
          r: 50,
          l: 50
        }
      },
      config = { displayModeBar: false };

    ReactDOM.render(
      <Plot
        data={data}
        layout={layout}
        config={config}
        className="plo"
        useResizeHandler={true}
        onClick={this.onPlotClick}
      />,
      document.getElementById("graph")
    );
  };

  onPlotClick = data => {
    if (data.points) {
      var number = data.points[0].pointNumber;
      this.props.dispatch(setSelectedDate(this.props.dates[number]));
      this.props.dispatch(setSelectedTemp(this.props.temps[number]));
    }
  };

  fetchData = event => {
    event.preventDefault();
    let location = encodeURIComponent(this.props.location);
    let url = `http://api.openweathermap.org/data/2.5/forecast?q=${location}&APPID=${API_KEY}&units=metric`;

    fetch(url)
      .then(result => result.json())
      .then(data => {
        let list = data.list;
        let dates = [];
        let temps = [];

        list.forEach(element => {
          dates.push(element.dt_txt);
          temps.push(element.main.temp);
        });

        this.props.dispatch(setData(data));
        this.props.dispatch(setDates(dates));
        this.props.dispatch(setTemps(temps));
        this.props.dispatch(setSelectedDate(""));
        this.props.dispatch(setSelectedTemp(null));
      })
      .catch(error => console.log("error occurred"));
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
          {this.props.data.list ? <div id="graph" /> : null}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(App);
