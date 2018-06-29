import React from "react";
import Plot from "react-plotly.js";

class Plotted extends React.Component {
  componentDidMount() {
    console.log("component mounted");
  }

  componentDidUpdate() {
    console.log("component updated");
  }

  render() {
    console.log("RENDER PLOT");
    let data = [
        {
          x: this.props.xData,
          y: this.props.yData,
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
    return (
      <Plot
        data={data}
        layout={layout}
        config={config}
        className="plo"
        useResizeHandler={true}
        onClick={this.props.onPlotClick}
      />
    );
  }
}

export default Plotted;
