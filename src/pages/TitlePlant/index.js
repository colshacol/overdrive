import * as React from "react"
import { Page } from "../../components/Page"
import { Spacer } from "../../components/Spacer"
import { useRoute, useLocation, Route, Switch, Link } from "wouter"
import * as Breadcrumbs from "../../components/Breadcrumbs"

const NAVIGATION = [["Title Plant", "/accounting"]]

export const TitlePlant = (props) => {
  return (
    <Page title="Title Plant" baseRoute="/titlePlant" navigation={NAVIGATION}>
      <Breadcrumbs.Crumb path={`/titlePlant`} text="Title Plant" />

      <Switch>
        <Route path="/titlePlant" component={TitlePlantView} />
      </Switch>
    </Page>
  )
}

const TitlePlantView = (props) => {
  return (
    <>
      <h1>TitlePlant</h1>
    </>
  )
}
