import * as React from "react"

import * as apiV0 from "../services/api/v0"
import { useUser } from "../stores/userStore"
import { useGlobalStore } from "../global.store"

export const useParcelsForProject = () => {
  const [parcels, setParcels] = React.useState([])
  const { currentProjectID } = useGlobalStore()
  const user = useUser()

  React.useEffect(() => {
    apiV0
      .getParcelsForProject(user.EmployeeID, currentProjectID)
      .then((data) => {
        setParcels(data)
      })
  }, [currentProjectID])

  return parcels
}
