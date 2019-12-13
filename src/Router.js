import * as React from "react";
import { Switch, Route, Redirect } from "wouter";

import { Home } from "./pages/Home";
import { ProjectView } from "./pages/Parcels/ProjectView";
import { People } from "./pages/People";
import { Marketing } from "./pages/Marketing";
import { Accounting } from "./pages/Accounting";
import { LogIn } from "./pages/LogIn";

const getParcels = async () => {
  const response = await fetch("/api/v0/getParcels");
  const json = await response.json();
  console.log({ json });
};

const getTitles = async () => {
  const response = await fetch("/api/v0/getTitles");
  const json = await response.json();
  console.log({ json });
};

export const UnauthenticatedRouter = (props) => {
  return <LogIn {...props} />;
};

export const AuthenticatedRouter = (props) => {
  React.useEffect(() => {
    getParcels();
  }, []);
  React.useEffect(() => {
    getTitles();
  }, []);
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/project/:projectID/:rest*" component={ProjectView} />
      <Route path="/people/:rest*" component={People} />
      <Route path="/marketing/:rest*" component={Marketing} />
      <Route path="/accounting/:rest*" component={Accounting} />
      <Route path="/:rest*">404, not found!</Route>
    </Switch>
  );
};
