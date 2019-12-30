import * as React from "react"
import { useLocation, Route, Switch } from "wouter"
import { Crumb } from "../../components/Breadcrumbs"
import { Page } from "../../components/Page"
import { ProjectParcelsView } from "./ProjectParcelsView"
import { useProject } from "../../hooks/useProject"
import { ProjectParcelTitleView } from "./ProjectParcelTitleView"
import { ProjectParcelView } from "./ProjectParcelView"

const PROJECT_NAVIGATION = [["Parcels", "/parcels"]]

export const ProjectView = (props) => {
  const project = useProject(props.params.projectID)

  return !project.ProjectName ? null : (
    <>
      <Page
        title={`${project.ProjectName}`}
        baseRoute={`/project/${project.ProjectID}`}
        navigation={PROJECT_NAVIGATION}
      >
        <Crumb
          path={`/project/${project.ProjectID}`}
          text={`Project (${project.ProjectName})`}
        />
        <Switch>
          <Route path="/project/:projectID" component={ProjectParcelsView} />
          <Route
            path="/project/:projectID/parcels/:parcelID/titles/:titleID"
            component={ProjectParcelTitleView}
          />
          <Route
            path="/project/:projectID/parcels/:parcelID"
            component={ProjectParcelView}
          />
          {/* TODO: Reports view */}
          <Route
            path="/project/:projectID/reports"
            component={ProjectParcelsView}
          />
        </Switch>
      </Page>
    </>
  )
}
