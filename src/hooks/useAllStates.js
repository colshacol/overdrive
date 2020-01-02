import * as React from "react"
import * as apiV0 from "../services/api/v0"

export const useAllStates = () => {
  const [states, setStates] = React.useState([])

  React.useEffect(() => {
    apiV0.getAllStates().then((states) => {
      setStates(states)
    })
  }, [])

  return states
}
