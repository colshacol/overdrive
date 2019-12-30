import * as React from "react"
import { Switch, Route, Redirect } from "wouter"

import { Home } from "./pages/Home"
import { ProjectView } from "./pages/Parcels/ProjectView"
import { People } from "./pages/People"
import { Marketing } from "./pages/Marketing"
import { Accounting } from "./pages/Accounting"
import { TitlePlant } from "./pages/TitlePlant"
import { LogIn } from "./pages/LogIn"
import { ParcelView } from "./pages/ParcelView"
import { TitleView } from "./pages/TitleView"

export const UnauthenticatedRouter = (props) => {
  return <LogIn {...props} />
}

export const AuthenticatedRouter = (props) => {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/project/:projectID/:rest*" component={ProjectView} />
      <Route path="/people/:rest*" component={People} />
      <Route path="/marketing/:rest*" component={Marketing} />
      <Route path="/accounting/:rest*" component={Accounting} />
      <Route path="/titlePlant/:rest*" component={TitlePlant} />
      <Route path="/parcels/:parcelID" component={ParcelView} />
      <Route path="/titles/:titleID" component={TitleView} />
      <Route path="/:rest*">404, not found!</Route>
    </Switch>
  )
}
