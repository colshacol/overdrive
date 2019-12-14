import * as React from "react"
import wretch from "wretch"
import createContextStore from "../utilities/createContextStore"

const INITIAL_USER_STATE = {
  isAuthenticated: false,
}

const [UserProvider, useUser] = createContextStore(() => {
  const [user, setUser] = React.useState(INITIAL_USER_STATE)

  const register = React.useCallback((userData) => {
    setUser((user) => ({
      ...user,
      isAuthenticated: true,
      ...userData,
    }))
  }, [])

  const unregister = React.useCallback(() => {
    setUser(INITIAL_USER_STATE)
  }, [])

  const authenticate = React.useCallback((emailAddress, password) => {
    wretch(window.__env.serverUrl + "/api/v0/authenticateUser")
      .post({
        emailAddress,
        password,
      })
      .json((response) => {
        if (response.isSuccess) {
          register(response.user)
        }
      })
  }, [])

  const getProjects = React.useCallback(() => {
    return wretch(window.__env.serverUrl + "/api/v0/getEmployeeProjects")
      .post({
        employeeID: user.EmployeeID,
      })
      .json((response) => {
        if (response.isSuccess) {
          console.log("PROJECTS", response)
          return response.projects
        }
      })
  }, [user.EmployeeID])

  const FullName = `${user.FirstName} ${user.LastName}`

  return {
    ...user,
    FullName,
    register,
    unregister,
    authenticate,
    getProjects,
  }
})

export { UserProvider, useUser }
