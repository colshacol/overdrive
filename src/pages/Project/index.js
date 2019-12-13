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
import { useLocation, Route } from "wouter";
import { useBreadcrumb } from "../../hooks/useBreadcrumbs";
import { Crumb } from "../../components/Breadcrumbs";
import { useCurrentProject } from "../../hooks/useCurrentProject";

import { ProjectParcelsView } from "../Parcels";

export const ProjectView = (props) => {
  const [location, setLocation] = useLocation();
  const projectsStore = ProjectsStore.useProjects();
  const globalStore = useGlobalStore();
  const project = useCurrentProject();

  return (
    <>
      <Crumb path="/" text="Home" />
      <Crumb path={`/project/${project.ProjectID}`} text={`Project (${project.ProjectName})`} />

      <Route path={`/project/:projectID/parcels`} component={ProjectParcelsView} />
      <Route path={`/project/:projectID/reports`} component={ProjectParcelsView} />
    </>
  );
};
