import * as React from "react"
import styled from "styled-components"
import * as Breadcrumbs from "../../components/Breadcrumbs"

import { ParcelDetails } from "../../components/ParcelDetails"

export const TitlePlantParcelView = (props) => {
  return (
    <>
      <Breadcrumbs.Crumb
        path={`/titlePlant/parcels/${props.params.parcelID}`}
        text="Parcel"
      />
      <ParcelDetails parcelID={props.params.parcelID} />
    </>
  )
}
