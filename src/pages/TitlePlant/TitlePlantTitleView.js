import * as React from "react"
import styled from "styled-components"
import * as Breadcrumbs from "../../components/Breadcrumbs"
import { TitleDetails } from "../../components/TitleDetails"

export const TitlePlantTitleView = (props) => {
  return (
    <>
      <Breadcrumbs.Crumb
        path={`/titlePlant/parcels/${props.params.parcelID}`}
        text="Parcel"
      />
      <Breadcrumbs.Crumb
        path={`/titlePlant/parcels/${props.params.parcelID}/titles/${props.params.titleID}`}
        text="Title"
      />
      <TitleDetails titleID={props.params.titleID} />
    </>
  )
}
