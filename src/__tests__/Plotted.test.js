import React from "react";
import { shallow } from "enzyme";
import { fromJS } from "immutable";
import Plotted from "../Plotted";

describe("<Plotted />", function() {
  it("renders correctly", function() {
    const wrapper = shallow(
      <Plotted
        xData={fromJS({})}
        yData={fromJS({})}
        onClick={() => console.log("clicked on the plot")}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
