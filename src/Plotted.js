import React from "react";
import Plot from "react-plotly.js";
import { toJS } from "immutable";

class Plotted extends React.Component {
  shouldComponentUpdate(nextProps) {
    const xDataChanged = !this.props.xData.equals(nextProps.xData);
    const yDataChanged = !this.props.yData.equals(nextProps.yData);

    return xDataChanged || yDataChanged;
  }

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
          x: this.props.xData.toJS(),
          y: this.props.yData.toJS(),
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
