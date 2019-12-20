import * as React from "react"

import * as apiV0 from "../services/api/v0"

export const useParcel = (parcelID) => {
  const [parcel, setParcel] = React.useState({})

  React.useEffect(() => {
    apiV0.getParcel(Number(parcelID)).then((parcel) => {
      setParcel(parcel)
    })
  }, [parcelID])

  return parcel
}
