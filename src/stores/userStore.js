import * as React from "react"
import wretch from "wretch"
import createContextStore from "../utilities/createContextStore"

import * as apiV0 from "../services/api/v0"

const INITIAL_USER_STATE = {
  isAuthenticated: false,
}

const [UserProvider, useUser] = createContextStore(() => {
  const [user, setUser] = React.useState(INITIAL_USER_STATE)

  const register = React.useCallback((userData) => {
    setUser((user) => {
      return {
        ...user,
        isAuthenticated: true,
        ...userData,
      }
    })
  }, [])

  const unregister = React.useCallback(() => {
    setUser(INITIAL_USER_STATE)
  }, [])

  const authenticate = React.useCallback((emailAddress, password) => {
    apiV0.authenticate(emailAddress, password).then((response) => {
      if (response.isSuccess) {
        register(response.user)
      }
    })
  }, [])

  const FullName = `${user.FirstName} ${user.LastName}`

  return {
    ...user,
    FullName,
    register,
    unregister,
    authenticate,
  }
})

export { UserProvider, useUser }
