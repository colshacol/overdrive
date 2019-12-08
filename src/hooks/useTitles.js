import * as React from "react"

import * as apiV0 from "../services/api/v0"
import { useCurrentProject } from "./useCurrentProject"

export const useTitles = (parcelID) => {
  const [title, setTitles] = React.useState([])
  const project = useCurrentProject()

  React.useEffect(() => {
    apiV0.getTitlesForPacel(parcelID).then((titles) => {
      setTitles(titles)
    })
  }, [])

  return title
}
