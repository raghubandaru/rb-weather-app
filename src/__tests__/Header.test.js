import React from "react";
import { shallow } from "enzyme";
import Header from "../Header";

describe("<Header />", function() {
  it("renders correctly", function() {
    const wrapper = shallow(<Header />);
    expect(wrapper).toMatchSnapshot();
  });
});
