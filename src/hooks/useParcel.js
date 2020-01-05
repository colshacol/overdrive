import * as React from "react"

import * as apiV0 from "../services/api/v0"

export const useParcel = (parcelID) => {
  const [parcel, setParcel] = React.useState({})

  React.useEffect(() => {
    if (parcelID) {
      apiV0.getParcel({ parcelID }).then((parcel) => {
        setParcel(parcel)
      })
    }
  }, [parcelID])

  return parcel
}
