import * as React from "react";
import { Box } from "../../components/Box";
import styled from "styled-components";
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
import { Parcels } from "../Parcels";

import { Home as HomeIcon, Users as UsersIcon, TrendingUp, DollarSign } from "react-feather";
import { Project } from "../Project";
import * as Breadcrumbs from "../../components/Breadcrumbs";
import Card from "../../components/Card";

const ProjectBox = (props) => {
  const globalStore = useGlobalStore();
  const [location, setLocation] = useLocation();

  const onClick = () => {
    globalStore.setCurrentProjectID(props.ProjectID);
    setLocation(`/project/${props.ProjectID}/parcels`);
  };

  return (
    <Box
      inline
      cursor="pointer"
      margin="8px"
      marginRight="40px"
      marginBottom="16px"
      color="var(--brandLightPurple)"
      fontWeight="500"
      onClick={onClick}
    >
      <p>{props.ProjectName}</p>
    </Box>
  );
};

const WelcomeText = (props) => {
  return (
    <div>
      <h2>Welcome back,</h2>
      <h1>{props.userFullName}</h1>
    </div>
  );
};

export const Home = (props) => {
  const [location, setLocation] = useLocation();
  const globalStore = useGlobalStore();
  const projectsStore = ProjectsStore.useProjects();
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredProjects = projectsStore.projects.filter((project) => {
    return project.ProjectName.toLowerCase().includes(searchQuery);
  });

  return (
    <Page title="Dashboard">
      <WelcomeText userFullName="John May" />
      <Spacer size="32px" />
      <Box paddingX="24px" paddingY="16px" flexDirection="column">
        <h2>Apps</h2>

        <Box padding="32px" flexWrap="wrap">
          <PortalCard
            href="/people"
            icon={UsersIcon}
            title="People"
            description="Manage company employees."
          />
          <Spacer size="24px" />
          <PortalCard
            href="/marketing"
            icon={TrendingUp}
            title="Marketing"
            description="Coming soon."
          />
          <Spacer size="24px" />
          <PortalCard
            href="/accounting"
            icon={DollarSign}
            title="Accounting"
            description="Coming soon."
          />
        </Box>
      </Box>
      <Box paddingX="24px" paddingY="16px" flexDirection="column">
        <Box>
          <h2>Projects</h2>
        </Box>
        <Spacer size="16px" />
        <Box padding="16px" flexWrap="wrap">
          {filteredProjects.map(ProjectCard)}
        </Box>
      </Box>
    </Page>
  );
};

const ProjectCard = (props) => {
  const [location, setLocation] = useLocation();
  const globalStore = useGlobalStore();
  const projectsStore = ProjectsStore.useProjects();
  return (
    <Card
      onClick={() => {
        globalStore.setCurrentProjectID(props.ProjectID);
        setLocation(`/project/${props.ProjectID}/parcels`);
      }}
      key={props.ProjectID}
      style={{ minWidth: "30%", margin: "0 24px 24px 0" }}
    >
      <Box flexDirection="column">
        <h3>{props.ProjectName}</h3>
        <small>O 150 / X 150 / T 500</small>
      </Box>
    </Card>
  );
};

const StyledPortalCard = styled.div`
  position: relative;
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  border-radius: 6px;
  height: 100px;
  width: 30%;
  cursor: pointer;
  padding: 16px 32px;
  background: #fff;
  background-position: 20% 7%;
  box-shadow: 0px 2px 12px -4px var(--darkPurple2);
  transition: all 0.25s;
  border: 1px solid var(--darkPurple2);

  h3 {
    display: inline;
    /* color: var(--brandLightPurple); */
  }

  :hover {
    /* box-shadow: 0px 2px 8px -2px var(--brandLightPurple); */
    box-shadow: 0px 8px 16px -6px var(--darkPurple2);
  }
`;

const PortalCard = (props) => {
  const [, setLocation] = useLocation();

  return (
    <StyledPortalCard onClick={() => setLocation(props.href)}>
      <props.icon size={32} />
      <Spacer size="24px" />
      <div>
        <h3>{props.title}</h3>
        <p>{props.description}</p>
      </div>
    </StyledPortalCard>
  );
};
