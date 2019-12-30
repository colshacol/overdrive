import * as React from "react"
import styled from "styled-components"

import { Spacer } from "../components/Spacer"
import { Box } from "../components/Box"

const StyledDataText = styled.span`
  margin-right: 64px;
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  width: ${(props) => (props.longText ? "100%" : "auto")};
  padding: ${(props) => (props.longText ? "16px 0" : "0")};

  span {
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 4px;
  }
`

const DataText = (props) => {
  return (
    <StyledDataText {...props}>
      <span>{props.label}</span>
      <p>{props.value}</p>
    </StyledDataText>
  )
}

export const ParcelData = ({ parcel }) => {
  return (
    <Box
      width="100%"
      padding="24px"
      flexWrap="wrap"
      justifyContent="space-between"
    >
      <DataText label="State" value={parcel.StateCode || "N/A"} />
      <DataText label="County" value={parcel.County || "N/A"} />
      <DataText label="Acres" value={parcel.Acres || "N/A"} />
      <DataText label="Parcel ID" value={parcel.ParcelID || "N/A"} />
      <DataText label="APN" value={parcel.APN || "N/A"} />
      <DataText label="Parcel Number" value={parcel.ParcelNumber || "N/A"} />
      <DataText label="Township Name" value={parcel.TownshipName || "N/A"} />
      <DataText label="Township" value={parcel.Township || "N/A"} />
      <DataText label="Range" value={parcel.Range || "N/A"} />
      <DataText label="Meridian" value={parcel.Meridian || "N/A"} />
      <DataText label="Address" value={parcel.Address || "N/A"} />
      <DataText label="City" value={parcel.City || "N/A"} />
      <DataText label="State" value={parcel.State || "N/A"} />
      <DataText label="Zip" value={parcel.Zip || "N/A"} />
      <Spacer size="16px" />
      <DataText label="Assigned To" value={parcel.AssignedTo || "N/A"} />
      <DataText
        style={{ width: "100%" }}
        label="Legal Description"
        value={parcel.LegalDescription || "N/A"}
      />
    </Box>
  )
}
