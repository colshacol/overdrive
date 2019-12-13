import * as React from "react";
import { useGlobalStore } from "../global.store";
import { useProjects } from "../projects.store";

export const useCurrentProject = () => {
  const globalStore = useGlobalStore();
  const projectsStore = useProjects();
  const project = projectsStore.getProjectWithID(globalStore.currentProjectID);
  return project;
};
