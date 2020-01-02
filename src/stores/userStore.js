import store from "store"
import * as React from "react"
import wretch from "wretch"
import createContextStore from "../utilities/createContextStore"

import * as apiV0 from "../services/api/v0"

const INITIAL_USER_STATE = {
  isAuthenticated: false,
}

const [UserProvider, useUser] = createContextStore(() => {
  const initialState = store.get("user") || INITIAL_USER_STATE
  const [user, setUser] = React.useState(initialState)

  const deauthenticate = React.useCallback(() => {
    store.remove("user")
    setUser(INITIAL_USER_STATE)
  }, [])

  const authenticate = React.useCallback((emailAddress, password) => {
    apiV0.authenticate(emailAddress, password).then((response) => {
      if (response.isSuccess) {
        store.set("user", response.user)
        setUser((user) => {
          return {
            ...user,
            ...response.user,
            isAuthenticated: true,
          }
        })
      }
    })
  }, [])

  const FullName = `${user.FirstName} ${user.LastName}`

  return {
    ...user,
    FullName,
    deauthenticate,
    authenticate,
  }
})

export { UserProvider, useUser }
