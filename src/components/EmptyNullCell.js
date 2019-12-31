import * as React from "react"

export const EmptyNullCell = (props, columns) => {
  return props.cell.value || null
}
