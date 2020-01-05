import * as React from "react"

import * as apiV0 from "../services/api/v0"

export const useParcelDetails = (options) => {
  const [parcel, setParcel] = React.useState({})

  React.useEffect(() => {
    if (options.parcelID) {
      apiV0.getParcel({ parcelID: options.parcelID }).then((parcel) => {
        apiV0.getParcelDetails(options).then((_parcel) => {
          setParcel({ ..._parcel, ...parcel })
        })
      })
    }
  }, [options.parcelID])

  return parcel
}
