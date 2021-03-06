import "./setup"
import React from "react"
import ReactDOM from "react-dom"

import "@servicetitan/anvil-fonts/dist/css/anvil-fonts.css"
import "@servicetitan/design-system/dist/system.min.css"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import "filepond/dist/filepond.min.css"

import "./styles/variables.css"
import "./styles/fonts.css"
import "./styles/styles.css"

import * as GlobalStore from "./global.store"
import * as ProjectsStore from "./projects.store"

import * as Breadcrumbs from "./components/Breadcrumbs"

import { useLocation } from "wouter"
import { BreadcrumbsProvider } from "./hooks/useBreadcrumbs"

import { Box } from "./components/Box"
import { SceneHeader } from "./SceneHeader"
import { AuthenticatedRouter, UnauthenticatedRouter } from "./Router"
import { UserProvider, useUser } from "./stores/userStore"
import wretch from "wretch"

const StoreWrapper = (props) => {
  return (
    <UserProvider>
      <GlobalStore.Provider>
        <BreadcrumbsProvider>
          <AuthWrapper />
        </BreadcrumbsProvider>
      </GlobalStore.Provider>
    </UserProvider>
  )
}

const AuthWrapper = (props) => {
  const user = useUser()

  return user.EmployeeID ? <App /> : <UnauthenticatedRouter />
}

const App = (props) => {
  const [ready, setReady] = React.useState(false)
  const [location, setLocation] = useLocation()

  React.useLayoutEffect(() => {
    setLocation("/")
    setReady(true)
  }, [])

  return ready ? (
    <Breadcrumbs.Provider>
      <ProjectsStore.Provider>
        <Box width="100%" height="100%" flexDirection="column">
          <SceneHeader />
          <AuthenticatedRouter />
        </Box>
      </ProjectsStore.Provider>
    </Breadcrumbs.Provider>
  ) : null
}

const rootElement = document.getElementById("root")
ReactDOM.render(<StoreWrapper />, rootElement)
