import * as React from "react";
import { Page } from "../../components/Page";
import { Spacer } from "../../components/Spacer";
import { useRoute, useLocation, Route, Switch, Link } from "wouter";
import * as Breadcrumbs from "../../components/Breadcrumbs";

const ACCOUNTING_NAVIGATION = [["Accounting", "/accounting"]];

export const Accounting = props => {
  return (
    <Page
      title="Accounting"
      baseRoute="/accounting"
      navigation={ACCOUNTING_NAVIGATION}
    >
      <Breadcrumbs.Crumb path={`/accounting`} text="Accounting" />

      <Switch>
        <Route path="/accounting" component={AccountingView} />
      </Switch>
    </Page>
  );
};

const AccountingView = props => {
  return (
    <>
      <h1>Accounting</h1>
    </>
  );
};
