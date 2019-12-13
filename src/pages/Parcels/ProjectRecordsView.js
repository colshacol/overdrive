import * as React from "react";
import { Page } from "../../components/Page";
import { Spacer } from "../../components/Spacer";
import { ParcelDataCards } from "./ParcelDataCards";
import { useRoute, useLocation, Route, Switch, Link } from "wouter";
import * as ProjectsStore from "../../projects.store";
import { useGlobalStore } from "../../global.store";
import { ParcelsTable } from "./ParcelsTable";
import sampleData from "../../sampleData.json";
import * as Breadcrumbs from "../../components/Breadcrumbs";

import { ProjectParcelView } from "./ProjectParcelView";
import { ProjectParcelTitleView } from "./ProjectParcelTitleView";
import { useCurrentProject } from "../../hooks/useCurrentProject";

const projectParcels = sampleData.parcels;

const Navigation = props => {
  const currentProject = useCurrentProject();

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
  );
};

export const ProjectReportsView = props => {
  const project = useCurrentProject();

  return (
    <Page title={`${project.ProjectName}`} navigation={<Navigation />}>
      <Breadcrumbs.Crumb
        path={`/project/${project.ProjectID}/reports`}
        text="Reports"
      />

      <Switch>
        <Route path="/project/:projectID/reports" component={ReportsView} />
      </Switch>
    </Page>
  );
};

const ReportsView = props => {
  return (
    <>
      <h1>Reports</h1>
      <Spacer size="16px" />
    </>
  );
};
