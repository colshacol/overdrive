import * as React from "react";
import { Page } from "../../components/Page";
import { Spacer } from "../../components/Spacer";
import { useRoute, useLocation, Route, Switch, Link } from "wouter";
import * as Breadcrumbs from "../../components/Breadcrumbs";

const MARKETING_NAVIGATION = [["Marketing", "/marketing"]];

export const Marketing = props => {
  return (
    <Page
      title="Marketing"
      baseRoute="/marketing"
      navigation={MARKETING_NAVIGATION}
    >
      <Breadcrumbs.Crumb path={`/marketing`} text="Marketing" />

      <Switch>
        <Route path="/marketing" component={MarketinvView} />
      </Switch>
    </Page>
  );
};

const MarketinvView = props => {
  return (
    <>
      <h1>Marketing</h1>
    </>
  );
};
