import * as React from "react"
import * as apiV0 from "../services/api/v0"

export const useStateCounties = (stateID) => {
  const [counties, setCounties] = React.useState([])

  React.useEffect(() => {
    if (stateID) {
      apiV0.getStateCounties(stateID).then((counties) => {
        setCounties(counties)
      })
    }
  }, [stateID])

  return counties
}
