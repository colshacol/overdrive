import * as React from "react"

import * as apiV0 from "../services/api/v0"

export const useTitles = (parcelID) => {
  const [titles, setTitles] = React.useState([])

  React.useEffect(() => {
    apiV0.getTitlesForPacel(parcelID).then((titles) => {
      setTitles(titles)
    })
  }, [parcelID])

  console.log("returning titles", titles)
  return titles
}
