import React from "react";
import { mount, shallow } from "enzyme";
import App from "./App";

const rows = [
  {
    name1: "Mads L. Klausen",
    email: "MadsLKlausen@jourrapide.com",
    edit_path: "http://google.com",
    per_id: 1,
  },
  {
    name1: "Alfred K. Krogh",
    email: "AlfredKKrogh@armyspy.com",
    edit_path: "http://google.com",
    per_id: 2,
  },
  {
    name1: "Silas L. Bertelsen",
    email: "SilasLBertelsen@armyspy.com",
    edit_path: "http://google.com",
    per_id: 3,
  },
  {
    name1: "Mia A. Johnsen",
    email: "MiaAJohnsen@dayrep.com",
    edit_path: "http://google.com",
    per_id: 4,
  },
  {
    name1: "Alfred S. Schou",
    email: "AlfredSSchou@jourrapide.com",
    edit_path: "http://google.com",
    per_id: 5,
  },
];

const customData = [
  {
    firstName: "Mads L. Klausen",
    lastName: "MadsLKlausen@jourrapide.com",
    link: "http://google.com",
    per_id: 1,
  },
  {
    firstName: "Alfred K. Krogh",
    lastName: "AlfredKKrogh@armyspy.com",
    link: "http://google.com",
    per_id: 2,
  },
  {
    firstName: "Silas L. Bertelsen",
    lastName: "SilasLBertelsen@armyspy.com",
    link: "http://google.com",
    per_id: 3,
  },
  {
    firstName: "Mia A. Johnsen",
    lastName: "MiaAJohnsen@dayrep.com",
    link: "http://google.com",
    per_id: 4,
  },
  {
    firstName: "Alfred S. Schou",
    lastName: "AlfredSSchou@jourrapide.com",
    link: "http://google.com",
    per_id: 5,
  },
];

it("renders without crashing", () => {
  shallow(<App data={[]} locale="da" rowsPerPage={5} />);
});

it("renders 5 rows", () => {
  const wrapper = mount(<App data={rows} locale="da" rowsPerPage={5} />);

  expect(wrapper.find("tr").length).toBe(5);
});

it("filters rows based on input", () => {
  const wrapper = mount(<App data={rows} locale="da" rowsPerPage={5} />);

  wrapper.find("input").simulate("change", { target: { value: "k" } });

  expect(wrapper.find("tr").length).toBe(2);
});

it("component renders 5 rows for different dataset", () => {
  const wrapper = mount(<App data={customData} locale="da" rowsPerPage={5} />);

  expect(wrapper.find("tr").length).toBe(5);
});

it("component doesnt render anything for empty dataset", () => {
  const wrapper = mount(<App data={[]} locale="da" rowsPerPage={5} />);

  expect(wrapper.find("tr").length).toBe(0);
});

it("component filters rows for different dataset", () => {
  const wrapper = mount(<App data={customData} locale="da" rowsPerPage={5} />);

  wrapper.find("input").simulate("change", { target: { value: "k" } });

  expect(wrapper.find("tr").length).toBe(2);
});