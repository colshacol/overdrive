import * as React from "react"
import { Grid, Cell } from "styled-css-grid"
import { User } from "react-feather"
import { SimpleDataCard } from "../../components/SimpleDataCard"
import { Page } from "../../components/Page"
import { Spacer } from "../../components/Spacer"
import { ParcelDataCards } from "./ParcelDataCards"
import { Box } from "../../components/Box"
import truncate from "truncate"
import Collapse, { Panel } from "rc-collapse"

import styled from "styled-components"
import theme from "../../theme"
import { SmallLabel } from "../../components/SmallLabel"
import { Breadcrumb } from "@servicetitan/design-system"
import { useBreadcrumb } from "../../hooks/useBreadcrumbs"
import { useRoute, useLocation, Route, Switch } from "wouter"

import { Plus } from "react-feather"
import Popup from "reactjs-popup"

import { Table } from "../../components/Table"
import { Button } from "../../components/Button"

import { useTitles } from "../../hooks/useTitles"
import { useParcel } from "../../hooks/useParcel"

import * as Breadcrumbs from "../../components/Breadcrumbs"
import { ProjectParcelTitleView } from "./ProjectParcelTitleView"
import { useGlobalStore } from "../../global.store"
import { TextInput } from "../../components/TextInput"
import { useProject } from "../../hooks/useProject"
// import { Grid, Cell } from "styled-css-grid";
import { TitleTable } from "../TitlePlant/TitleTable"

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

const MutedText = styled.span`
  /* opacity: 0.5; */
  color: var(--grayscale7);
  font-weight: 400;
`

export const ProjectParcelView = (props) => {
  const titles = useTitles(props.params.parcelID)
  const [isDataOpen, setIsDataOpen] = React.useState(false)
  const parcel = useParcel(Number(props.params.parcelID))

  console.log(parcel)
  return (
    <>
      <Breadcrumbs.Crumb
        path={`/project/${props.params.projectID}/parcels/${props.params.parcelID}`}
        text="Parcel"
      />
      <Box justifyContent="space-between" alignItems="center">
        <h1>
          Parcel <MutedText>ID: {props.params.parcelID}</MutedText>
        </h1>
        <Box marginLeft="auto">
          <Button onClick={() => setIsDataOpen(!isDataOpen)}>
            Edit Parcel
          </Button>
          <Spacer size="24px" />
          <Button onClick={() => setIsDataOpen(!isDataOpen)}>
            Show Parcel Information
          </Button>
        </Box>
      </Box>
      <Spacer size="32px" />
      {parcel.ParcelID && isDataOpen && <ParcelData parcel={parcel} />}
      <TitleTable parcelID={props.params.parcelID} />
    </>
  )
}

const ParcelData = ({ parcel }) => {
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

// const STATE_LABEL_MAP = {
//   TitleID: { label: "Title ID", width: 1 },
//   EmployeeID: { label: "Employee ID", width: 1 },
//   RecordedDate: { label: "Recorded Date", width: 1 },
//   CertificationDate: { label: "Certification Date", width: 1 },
//   EffectiveDate: { label: "Effective Date", width: 1 },
//   DocumentType: { label: "Document Type", width: 1 },
//   DocumentName: { label: "Document Name", width: 1 },
//   BookVolume: { label: "Book Volume", width: 1 },
//   Page: { label: "Page", width: 1 },
//   Acreage: { label: "Acreage", width: 1 },
//   Grantor: { label: "Grantor", width: 2 },
//   Grantee: { label: "Grantee", width: 2 },
//   Conveyance: { label: "Conveyance", width: 2 },
//   CreatedDate: { label: "Created Date", width: 2 },
//   Mapped: { label: "Mapped", width: 2 },
//   CreatedBy: { label: "Created By", width: 2 },
// }

// const StyledModal = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
//   width: 100%;
//   max-width: 1100px;
//   min-width: 900px;
//   height: 100%;
//   min-height: 700px;
//   max-height: 800px;
//   border-radius: 6px;
//   padding: 48px;
//   background: var(--grayscale0);
//   overflow-y: scroll;
// `

// const StyledForm = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   width: 100%;
//   padding: 24px;
// `

// const AddTitleModal = (props) => {
//   const [state, setState] = React.useState({
//     TitleID: "",
//     EmployeeID: "",
//     RecordedDate: "",
//     CertificationDate: "",
//     DocumentType: "",
//     DocumentName: "",
//     EffectiveDate: "",
//     BookVolume: "",
//     Page: "",
//     Acreage: "",
//     Grantor: "",
//     Grantee: "",
//     Conveyance: "",
//     CreatedDate: "",
//     CreatedBy: "",
//     Mapped: "",
//   })

//   const onChange = (key) => (event) => {
//     const { value } = event.target
//     setState((state) => ({
//       ...state,
//       [key]: value,
//     }))
//   }

//   return (
//     <StyledModal>
//       <h2>Add Title</h2>
//       <StyledForm>
//         <Grid columns={2} gap="24px" style={{ width: "100%" }}>
//           {Object.entries(state).map(([key, value]) => (
//             <Cell width={STATE_LABEL_MAP[key].width}>
//               <TextInput
//                 width="100%"
//                 label={STATE_LABEL_MAP[key].label}
//                 value={value}
//                 onChange={onChange(key)}
//               />
//             </Cell>
//           ))}
//         </Grid>
//       </StyledForm>
//       <StyledActionsRow>
//         <Button.Ghost onClick={props.close}>Cancel</Button.Ghost>
//         <Spacer size="24px" />
//         <Button onClick={props.close}>Submit</Button>
//       </StyledActionsRow>
//     </StyledModal>
//   )
// }

// const StyledActionsRow = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: flex-end;
// `
