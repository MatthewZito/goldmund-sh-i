import { shallow } from "enzyme";
import React from 'react';
import SidebarFooter from "../components/fragments/SidebarFooter.jsx";

it("should render the SidebarFooter component", () => {
    expect(shallow(<SidebarFooter />).debug()).toMatchSnapshot();
});