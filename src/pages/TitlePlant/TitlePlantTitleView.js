import * as React from "react"
import styled from "styled-components"

import { TitleDetails } from "../../components/TitleDetails"

export const TitlePlantTitleView = (props) => {
  return (
    <>
      <TitleDetails titleID={props.params.titleID} />
    </>
  )
}
