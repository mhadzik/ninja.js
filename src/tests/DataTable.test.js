import React from "react";
import { mount, shallow } from "enzyme";
import DataTable from "../DataTable";

const data = [
  {
    name1: "Mads L. Klausen",
    email: "MadsLKlausen@jourrapide.com",
    edit_path: "http://google.com",
    lastname: "dada",
    per_id: 1,
  },
  {
    name1: "Alfred K. Krogh",
    email: "AlfredKKrogh@armyspy.com",
    edit_path: "http://google.com",
    lastname: "dodo",
    per_id: 2,
  },
  {
    name1: "Silas L. Bertelsen",
    email: "SilasLBertelsen@armyspy.com",
    edit_path: "http://google.com",
    lastname: "didi",
    per_id: 3,
  },
  {
    name1: "Mia A. Johnsen",
    email: "MiaAJohnsen@dayrep.com",
    edit_path: "http://google.com",
    lastname: "dada",
    per_id: 4,
  },
  {
    name1: "Alfred S. Schou",
    email: "AlfredSSchou@jourrapide.com",
    edit_path: "http://google.com",
    lastname: "dede",
    per_id: 5,
  },
];

it("searches for rows by lastname", () => {
  const wrapper = mount(
    <DataTable
      data={data}
      locale="da"
      searchKeys={["lastname"]}
      rowsAmount={5}
      rowRenderKeys={{ title: "name1", desc: "email", link: "edit_path" }}
    />
  );

  wrapper.find("input").simulate("change", { target: { value: "dada" } });

  expect(wrapper.find("tr").length).toBe(2);
});
