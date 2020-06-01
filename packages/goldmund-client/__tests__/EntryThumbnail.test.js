import { shallow } from "enzyme";
import React from 'react';
import EntryThumbnail from "../components/fragments/EntryThumbnail.jsx";

it("should render the EntryThumbnail component", () => {
    expect(shallow(<EntryThumbnail />).debug()).toMatchSnapshot();
});