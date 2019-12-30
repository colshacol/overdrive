import * as React from "react"

import * as apiV0 from "../services/api/v0"
import { useUser } from "../stores/userStore"
import { useGlobalStore } from "../global.store"

export const useParcelsForProject = (projectID) => {
  const [parcels, setParcels] = React.useState([])
  const user = useUser()

  React.useEffect(() => {
    apiV0.getParcelsForProject(user.EmployeeID, projectID).then((data) => {
      setParcels(data)
    })
  }, [projectID])

  return parcels
}
