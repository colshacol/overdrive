import * as React from "react"
import nanoid from "nanoid"

export const useUID = () => {
  const uid = React.useRef(nanoid())
  return uid.current
}
