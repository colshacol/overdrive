import * as React from "react"
import { Grid, Cell } from "styled-css-grid"
import { UploadCloud, Link } from "react-feather"
import { SimpleDataCard } from "../../components/SimpleDataCard"
import { Page } from "../../components/Page"
import { Spacer } from "../../components/Spacer"
import { ParcelDataCards } from "./ParcelDataCards"
import { Box } from "../../components/Box"
import truncate from "truncate"

import styled from "styled-components"
import theme from "../../theme"
import { SmallLabel } from "../../components/SmallLabel"
import { Breadcrumb } from "@servicetitan/design-system"
import { useBreadcrumb } from "../../hooks/useBreadcrumbs"
import { useRoute, useLocation, Route, Switch } from "wouter"

import { useCurrentProject } from "../../hooks/useCurrentProject"
import { Table } from "../../components/Table"
import { Button } from "../../components/Button"

import { useTitles } from "../../hooks/useTitles"
import { useParcel } from "../../hooks/useParcel"
import { TextInput } from "../../components/TextInput"
import * as Breadcrumbs from "../../components/Breadcrumbs"
import { useTitle } from "../../hooks/useTitle"

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

export const ProjectParcelTitleView = (props) => {
  const title = useTitle(props.params.titleID)

  return (
    <>
      <Breadcrumbs.Crumb
        path={`/project/${props.params.projectID}/parcels/${props.params.parcelID}/title/${props.params.titleID}`}
        text={`Title (${props.params.titleID})`}
      />
      <h1>Title</h1>
      <Spacer size="12px" />
      <Box
        width="100%"
        padding="24px"
        flexWrap="wrap"
        // justifyContent="space-between"
      >
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
