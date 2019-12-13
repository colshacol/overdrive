import * as React from "react";
import { Box } from "../../components/Box";

import { useGlobalStore } from "../../global.store";
import * as ProjectsStore from "../../projects.store";

import { TextInput } from "../../components/TextInput";
import { Spacer } from "../../components/Spacer";
import { Logo } from "../../components/Logo";
import { Button } from "../../components/Button";
import { Page } from "../../components/Page";
import { Search } from "react-feather";
import { useLocation, Route, Switch } from "wouter";
import { useBreadcrumb } from "../../hooks/useBreadcrumbs";
import { Crumb } from "../../components/Breadcrumbs";
import { useCurrentProject } from "../../hooks/useCurrentProject";

import { ProjectParcelsView } from "./ProjectParcelsView";
import { ProjectParcelView } from "./ProjectParcelView";
import { ProjectReportsView } from "./ProjectRecordsView";
import { ProjectParcelTitleView } from "./ProjectParcelTitleView";

export const ProjectView = props => {
  const [location, setLocation] = useLocation();
  const projectsStore = ProjectsStore.useProjects();
  const globalStore = useGlobalStore();
  const project = useCurrentProject();

  return (
    <>
      <Crumb
        path={`/project/${project.ProjectID}/parcels`}
        text={`Project (${project.ProjectName})`}
      />
      <Switch>
        <Route
          path="/project/:projectID/parcels/:rest*"
          component={ProjectParcelsView}
        />
        <Route
          path="/project/:projectID/reports"
          component={ProjectReportsView}
        />
      </Switch>
    </>
  );
};
