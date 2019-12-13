import * as React from "react";

import sampleData from "./sampleData.json";

const Context = React.createContext();

export const Provider = props => {
  const getProjectWithID = id => {
    return sampleData.projects.find(project => {
      return project.ProjectID === id;
    });
  };

  return (
    <Context.Provider
      value={{ projects: sampleData.projects, getProjectWithID }}
    >
      {props.children}
    </Context.Provider>
  );
};

export const useProjects = () => {
  return React.useContext(Context);
};
