import * as React from "react";
import { Page } from "../../components/Page";
import { Spacer } from "../../components/Spacer";
import { Route, Switch } from "wouter";
import * as Breadcrumbs from "../../components/Breadcrumbs";
import { PeopleTable } from "./PeopleTable";
import { Link } from "../../components/Link";
import { people } from "../../sampleData.json";

const PEOPLE_NAVIGATION = [
  ["People", "/people"]
  // ["Admin", [["Settings", "/admin/settings"], ["Security", "/admin/security"]]]
];

export const People = props => {
  return (
    <Page title="People" baseRoute="/people" navigation={PEOPLE_NAVIGATION}>
      <Breadcrumbs.Crumb path={`/people`} text="People" />

      <Switch>
        <Route path="/people" component={PeopleView} />
      </Switch>
    </Page>
  );
};

const PeopleView = props => {
  return (
    <>
      <h1>People</h1>
      <Spacer size="16px" />
      <PeopleTable data={people} />
    </>
  );
};
