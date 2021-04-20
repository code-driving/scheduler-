import React from "react";

import { render, cleanup } from "@testing-library/react";
import axios from "axios"

import Application from "components/Application";
import reducer from "reducers/reducer";

afterEach(cleanup);

xit("renders without crashing", () => {
  render(<Application />);
});
