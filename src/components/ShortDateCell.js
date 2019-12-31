import * as React from "react"
import dayjs from "dayjs"

global.dayjs = dayjs

export const ShortDateCell = (props, columns) => {
  const date = dayjs(props.cell.value)
  return date.isValid() ? date.format("MM/DD/YYYY") : ""
}
