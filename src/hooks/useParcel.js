import * as React from "react"

import * as apiV0 from "../services/api/v0"

export const useParcel = (parcelID) => {
  const [parcel, setParcel] = React.useState({})
  const id = Number(parcelID)

  React.useEffect(() => {
    apiV0.getParcel(id).then((parcel) => {
      setParcel(parcel)
    })
  }, [id])

  return parcel
}
