import * as React from "react"
import { Page } from "../../components/Page"
import { Spacer } from "../../components/Spacer"
import { ParcelDataCards } from "./ParcelDataCards"
import { useRoute, useLocation, Route, Switch, Link } from "wouter"
import * as ProjectsStore from "../../projects.store"
import { useGlobalStore } from "../../global.store"
import { ParcelsTable } from "./ParcelsTable"
import sampleData from "../../sampleData.json"
import * as Breadcrumbs from "../../components/Breadcrumbs"

import { ProjectParcelView } from "./ProjectParcelView"
import { ProjectParcelTitleView } from "./ProjectParcelTitleView"
import { useCurrentProject } from "../../hooks/useCurrentProject"
import { Box } from "../../components/Box"
import { useParcelsForProject } from "../../hooks/useParcelsForProject"
import { useProject } from "../../hooks/useProject"

const projectParcels = sampleData.parcels

const Navigation = (props) => {
  const currentProject = useCurrentProject()

  return (
    <Page.Navigation>
      <Page.NavigationItem
        href={`/project/${currentProject.ProjectID}/parcels`}
      >
        Parcels
      </Page.NavigationItem>
      <Page.NavigationItem
        href={`/project/${currentProject.ProjectID}/reports`}
      >
        Reports
      </Page.NavigationItem>
      <Page.NavigationItem href={`/project/${currentProject.ProjectID}/stuff`}>
        Stuff
      </Page.NavigationItem>
    </Page.Navigation>
  )
}

const PROJECT_NAVIGATION = [
  ["Parcels", "/parcels"],
  // ["Admin", [["Settings", "/admin/settings"], ["Security", "/admin/security"]]]
]

export const ProjectParcelsView = (props) => {
  const project = useCurrentProject()

  return (
    <Page
      title={`${project.ProjectName}`}
      baseRoute={`/project/${project.ProjectID}`}
      navigation={PROJECT_NAVIGATION}
    >
      <Breadcrumbs.Crumb
        path={`/project/${project.ProjectID}/parcels`}
        text="Parcels"
      />

      <Switch>
        <Route path="/project/:projectID/parcels" component={ParcelsView} />

        <Route
          path="/project/:projectID/parcels/:parcelID"
          component={ProjectParcelView}
        />
        <Route
          path="/project/:projectID/parcels/:rest*"
          component={ProjectParcelView}
        />
      </Switch>
    </Page>
  )
}

const ParcelsView = (props) => {
  const parcels = useParcelsForProject()

  return (
    <>
      <Box justifyContent="space-between">
        <h1>Parcels</h1>
        <ParcelDataCards parcels={parcels} />
      </Box>
      <Spacer size="32px" />
      <ParcelsTable data={parcels} />
    </>
  )
}
