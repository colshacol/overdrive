import "./setup"
import React from "react"
import ReactDOM from "react-dom"

import "@servicetitan/anvil-fonts/dist/css/anvil-fonts.css"
import "@servicetitan/design-system/dist/system.min.css"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

import "./styles/variables.css"
import "./styles/fonts.css"
import "./styles/styles.css"

import * as GlobalStore from "./global.store"
import * as ProjectsStore from "./projects.store"

import * as Breadcrumbs from "./components/Breadcrumbs"

import { Link, Route, useLocation, useRouter } from "wouter"
import { BreadcrumbsProvider } from "./hooks/useBreadcrumbs"

import { Box } from "./components/Box"
import { SceneHeader } from "./SceneHeader"
// import { Parcels } from "./pages/Parcels";
import { LogIn } from "./pages/LogIn"
import { Home } from "./pages/Home"

import sampleData from "./sampleData.json"
import { AuthenticatedRouter, UnauthenticatedRouter } from "./Router"
import { UserProvider, useUser } from "./stores/userStore"

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

  return user.isAuthenticated ? <App /> : <UnauthenticatedRouter />
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
