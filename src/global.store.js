import * as React from "react"
import { useLocation } from "wouter"

const Context = React.createContext()

export const Provider = (props) => {
  const [location, setLocation] = useLocation()

  const [isUserAuthenticated, setIsUserAuthenticated] = React.useState(false)
  const [user, setUser] = React.useState()

  const [routerState, setRouterState] = React.useState({
    currentProjectID: undefined,
    currentParcelID: undefined,
    currentTitleID: undefined,
  })

  const setCurrentParcelID = (id) => {
    setRouterState((state) => ({
      ...state,
      currentParcelID: id,
    }))

    if (!routerState.currentProjectID) {
      return setLocation(`/parcel/${id}`)
    }

    setLocation(`/project/${routerState.currentProjectID}/parcels/${id}`)
  }

  const setCurrentProjectID = (id) => {
    setRouterState((state) => ({
      ...state,
      currentProjectID: id,
    }))

    setLocation(`/project/${routerState.currentProjectID}/parcels`)
  }

  const setCurrentTitleID = (id) => {
    setRouterState((state) => ({
      ...state,
      currentTitleID: id,
    }))

    setLocation(
      `/project/${routerState.currentProjectID}/parcels/${routerState.currentParcelID}/titles/${id}`
    )
  }

  const store = {
    isUserAuthenticated,
    setIsUserAuthenticated,
    currentProjectID: routerState.currentProjectID,
    currentParcelID: routerState.currentParcelID,
    currentTitleID: routerState.currentTitleID,
    setCurrentProjectID,
    setCurrentParcelID,
    setCurrentTitleID,
    routerState,
    user,
    setUser,
  }

  return <Context.Provider value={store}>{props.children}</Context.Provider>
}

export const useGlobalStore = () => {
  return React.useContext(Context)
}
