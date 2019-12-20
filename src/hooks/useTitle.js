import * as React from "react"

import * as apiV0 from "../services/api/v0"

export const useTitle = (titleID) => {
  const [title, setTitle] = React.useState({})

  React.useEffect(() => {
    apiV0.getTitle(titleID).then((title) => {
      setTitle(title)
    })
  }, [titleID])

  return title
}
