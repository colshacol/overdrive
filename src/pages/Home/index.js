import * as React from "react"
import { Box } from "../../components/Box"
import styled from "styled-components"
import { useGlobalStore } from "../../global.store"
import * as ProjectsStore from "../../projects.store"

import { TextInput } from "../../components/TextInput"
import { Spacer } from "../../components/Spacer"
import { Logo } from "../../components/Logo"
import { Button } from "../../components/Button"
import { Page } from "../../components/Page"
import { Search } from "react-feather"
import { useLocation, Route, Switch } from "wouter"
import { useBreadcrumb } from "../../hooks/useBreadcrumbs"
import { Parcels } from "../Parcels"

import { useUser } from "../../stores/userStore"

import {
  Home as HomeIcon,
  Users as UsersIcon,
  TrendingUp,
  DollarSign,
  File,
} from "react-feather"

import Card from "../../components/Card"
import { useProjectsForUser } from "../../hooks/useProjectsForUser"

export const Home = (props) => {
  const user = useUser()
  const projects = useProjectsForUser()

  return (
    <Page title="Dashboard">
      <div>
        <h2>Welcome back,</h2>
        <h1>{user.FullName}</h1>
      </div>
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
            href="/titlePlant"
            icon={File}
            title="Title Plant"
            description="Filter titles directly."
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
          {projects.map((project) => (
            <ProjectCard {...project} key={project.ProjectID} />
          ))}
        </Box>
      </Box>
    </Page>
  )
}

const ProjectCard = (props) => {
  const [location, setLocation] = useLocation()
  const globalStore = useGlobalStore()

  return (
    <Card
      onClick={() => {
        globalStore.setCurrentProjectID(props.ProjectID)
        setLocation(`/project/${props.ProjectID}/parcels`)
      }}
      key={props.ProjectID}
      style={{ minWidth: "30%", margin: "0 24px 24px 0" }}
    >
      <Box flexDirection="column">
        <h3>{props.ProjectName}</h3>
        {/* <small>O 150 / X 150 / T 500</small> */}
      </Box>
    </Card>
  )
}

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
  margin-bottom: 24px;

  h3 {
    display: inline;
    /* color: var(--brandLightPurple); */
  }

  :hover {
    /* box-shadow: 0px 2px 8px -2px var(--brandLightPurple); */
    box-shadow: 0px 8px 16px -6px var(--darkPurple2);
  }
`

const PortalCard = (props) => {
  const [, setLocation] = useLocation()

  return (
    <StyledPortalCard onClick={() => setLocation(props.href)}>
      <props.icon size={32} />
      <Spacer size="24px" />
      <div>
        <h3>{props.title}</h3>
        <p>{props.description}</p>
      </div>
    </StyledPortalCard>
  )
}
