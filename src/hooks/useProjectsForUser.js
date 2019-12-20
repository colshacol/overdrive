import * as React from "react"
import { useUser } from "../stores/userStore"

import * as apiV0 from "../services/api/v0"

export const useProjectsForUser = () => {
  const [projects, setProjects] = React.useState([])
  const user = useUser()

  React.useCallback(() => {
    apiV0.getEmployeeProjects(user).then((projects) => {
      setProjects(projects)
    })
  }, [user.EmployeeID])

  return projects
}
