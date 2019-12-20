import * as React from "react"
import { useUser } from "../stores/userStore"

import * as apiV0 from "../services/api/v0"

export const useProjectsForUser = () => {
  const [projects, setProjects] = React.useState([])
  const user = useUser()

  React.useEffect(() => {
    apiV0.getProjectsForEmployee(user.EmployeeID).then((projects) => {
      setProjects(projects)
    })
  }, [user.EmployeeID])

  return projects
}
