import * as React from "react"
// import { useUser } from "../stores/userStore"

import * as apiV0 from "../services/api/v0"

export const useStatesWithParcels = () => {
  const [states, setStates] = React.useState([])

  React.useEffect(() => {
    apiV0.getStatesWithParcels().then((states) => {
      setStates(states)
    })
  }, [])

  return states
}
