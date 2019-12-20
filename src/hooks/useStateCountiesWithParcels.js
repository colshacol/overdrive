import * as React from "react"

import * as apiV0 from "../services/api/v0"

export const useStateCountiesWithParcels = () => {
  const [counties, setCounties] = React.useState([])

  React.useEffect(() => {
    apiV0.getStateCountiesWithParcels().then((counties) => {
      setCounties(counties)
    })
  }, [])

  return counties
}
