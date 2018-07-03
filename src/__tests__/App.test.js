import React from "react";
import { shallow } from "enzyme";
import { fromJS } from "immutable";
import { App } from "../App";

var redux = fromJS({
  location: "",
  data: {},
  dates: [],
  temps: [],
  selected: {
    date: "",
    temp: null
  }
});

describe("<App />", function() {
  it("renders correctly", function() {
    const wrapper = shallow(<App redux={redux} />);
    expect(wrapper).toMatchSnapshot();
  });
});
