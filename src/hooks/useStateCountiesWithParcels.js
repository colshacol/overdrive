import * as React from "react"

import * as apiV0 from "../services/api/v0"

export const useStateCountiesWithParcels = (stateCode) => {
  const [counties, setCounties] = React.useState([])

  React.useEffect(() => {
    apiV0.getStateCountiesWithParcels(stateCode).then((counties) => {
      setCounties(counties)
    })
  }, [stateCode])

  return counties
}
