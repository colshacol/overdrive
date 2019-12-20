import * as React from "react"

import * as apiV0 from "../services/api/v0"

export const useProject = (projectID) => {
  const [project, setProject] = React.useState({})

  React.useEffect(() => {
    apiV0.getProject(projectID).then((project) => {
      setProject(project)
    })
  }, [projectID])

  return project
}
