import React from "react";
import "./App.css";

const API_KEY = process.env.REACT_APP_API_KEY;

class App extends React.Component {
  state = {
    location: "",
    data: {}
  };

  fetchData = event => {
    event.preventDefault();
    let location = encodeURIComponent(this.state.location);
    let url = `http://api.openweathermap.org/data/2.5/forecast?q=${location}&APPID=${API_KEY}&units=metric`;

    fetch(url)
      .then(result => result.json())
      .then(data => this.setState({ data: data }))
      .catch(error => console.log("error occurred"));
  };

  changeLocation = event => {
    this.setState({ location: event.target.value });
  };

  render() {
    let currentTemp = "Please specify a location";
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
          <p className="temp-wrapper">
            <span className="temp">{currentTemp}</span>
            <span className="temp-symbol">°C</span>
          </p>
        </form>
      </div>
    );
  }
}

export default App;
