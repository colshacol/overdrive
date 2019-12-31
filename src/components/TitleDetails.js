import * as React from "react"
import { UploadCloud, Link } from "react-feather"
import { Spacer } from "./Spacer"
import { Box } from "./Box"

import styled from "styled-components"
import { Button } from "./Button"
import { useTitle } from "../hooks/useTitle"

const StyledDataText = styled.span`
  margin-right: 64px;
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  width: ${(props) => (props.longText ? "100%" : "auto")};
  padding: ${(props) => (props.longText ? "16px 0" : "0")};
  /* background: ${(props) =>
    props.longText ? "var(--grayscale0)" : "none"}; */

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

export const TitleDetails = (props) => {
  const title = useTitle(props.titleID)

  return (
    <>
      <h1>Title</h1>
      <Spacer size="12px" />
      <Box width="100%" padding="24px" flexWrap="wrap">
        <DataText value={title.DocumentType || "N/A"} label="Document Type" />
        <DataText label="Document Type" value={title.DocumentType || "N/A"} />
        <DataText
          label="Instrument Number"
          value={title.InstrumentNumber || "N/A"}
        />
        <DataText label="Book Volume" value={title.BookVolume || "N/A"} />
        <DataText label="Page" value={title.Page || "N/A"} />
        <DataText label="Effective Date" value={title.EffectiveDate || "N/A"} />
        <DataText label="Recorded Date" value={title.RecordedDate || "N/A"} />
        <DataText
          label="Certification Date"
          value={title.CertificationDate || "N/A"}
        />
        <DataText label="Acreage" value={title.Acreage || "N/A"} />
        <Spacer size="16px" />
        <DataText
          longText
          label="Conveyance"
          value={title.Conveyance || "N/A"}
        />
        <DataText longText label="Grantee" value={title.Grantee || "N/A"} />
        <DataText longText label="Grantor" value={title.Grantor || "N/A"} />
        <DataText longText label="Comments" value={title.Comments || "N/A"} />
      </Box>
      <Box width="100%" padding="24px" justifyContent="flex-end">
        <Button>
          <Link size="21px" style={{ marginRight: 12 }} />
          Edit
        </Button>
        <Spacer size="24px" />
        <Button>
          <Link size="21px" style={{ marginRight: 12 }} />
          Link to GIS
        </Button>
        <Spacer size="24px" />
        <Button>
          <UploadCloud size="21px" style={{ marginRight: 12 }} />
          Upload Document
        </Button>
      </Box>
    </>
  )
}
