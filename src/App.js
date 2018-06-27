import React from "react";
import ReactDOM from "react-dom";
import Plot from "react-plotly.js";
import "./App.css";

const API_KEY = process.env.REACT_APP_API_KEY;

class App extends React.Component {
  state = {
    location: "",
    data: {},
    dates: [],
    temps: [],
    selected: {
      date: "",
      temp: null
    }
  };

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
          x: this.state.dates,
          y: this.state.temps,
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
      this.setState({
        selected: {
          date: data.points[0].x,
          temp: data.points[0].y
        }
      });
    }
  };

  fetchData = event => {
    event.preventDefault();
    let location = encodeURIComponent(this.state.location);
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

        this.setState({
          data,
          dates,
          temps
        });
      })
      .catch(error => console.log("error occurred"));
  };

  changeLocation = event => {
    this.setState({ location: event.target.value });
  };

  render() {
    let currentTemp = "Enter Location";
    if (this.state.data.list) {
      currentTemp = this.state.data.list[0].main.temp;
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
              value={this.state.location}
              onChange={this.changeLocation}
            />
          </label>
        </form>
        <div className="wrapper">
          <p className="temp-wrapper">
            <span className="temp">
              {this.state.selected.temp
                ? this.state.selected.temp
                : currentTemp}
            </span>
            {currentTemp !== "Enter Location" ? (
              <span className="temp-symbol">&deg;C</span>
            ) : (
              ""
            )}
            <span className="temp-date">
              {this.state.selected.temp ? this.state.selected.date : ""}
            </span>
          </p>
          {this.state.data.list ? <h1>Forecast</h1> : null}
          {this.state.data.list ? <div id="graph" /> : null}
        </div>
      </div>
    );
  }
}

export default App;
