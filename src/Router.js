import * as React from "react"
import { Switch, Route, Redirect } from "wouter"

import { Home } from "./pages/Home"
import { ProjectView } from "./pages/Parcels/ProjectView"
import { People } from "./pages/People"
import { Marketing } from "./pages/Marketing"
import { Accounting } from "./pages/Accounting"
import { TitlePlant } from "./pages/TitlePlant"
import { LogIn } from "./pages/LogIn"

// const getParcelsForProject = async () => {
//   const response = await fetch("http://localhost:8090/api/v0/getParcelsForProject")
//   const json = await response.json()
//   console.log({ json })
// }

// const getTitlesForParcel = async () => {
//   const response = await fetch("http://localhost:8090/api/v0/getTitlesForParcel")
//   const json = await response.json()
//   console.log({ json })
// }

export const UnauthenticatedRouter = (props) => {
  return <LogIn {...props} />
}

export const AuthenticatedRouter = (props) => {
  // React.useEffect(() => {
  //   getParcels()
  //   getTitles()
  //   authenticateUser()
  // }, [])

  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/project/:projectID/:rest*" component={ProjectView} />
      <Route path="/people/:rest*" component={People} />
      <Route path="/marketing/:rest*" component={Marketing} />
      <Route path="/accounting/:rest*" component={Accounting} />
      <Route path="/titlePlant/:rest*" component={TitlePlant} />
      <Route path="/:rest*">404, not found!</Route>
    </Switch>
  )
}
