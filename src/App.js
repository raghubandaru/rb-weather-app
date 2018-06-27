import React from "react";
import "./App.css";

class App extends React.Component {
  state = {
    location: ""
  };

  fetchData = event => {
    event.preventDefault();
    console.log("fetch weather data for: ", this.state.location);
  };

  changeLocation = event => {
    this.setState({ location: event.target.value });
  };

  render() {
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
      </div>
    );
  }
}

export default App;
