import * as React from "react"
import { Spacer } from "./Spacer"
import { Box } from "./Box"

import styled from "styled-components"
import { useParcel } from "../hooks/useParcel"
import { TitleTable } from "../pages/TitlePlant/TitleTable"
import { ParcelData } from "./ParcelData"

const MutedText = styled.span`
  color: var(--grayscale7);
  font-weight: 400;
`

export const ParcelDetails = (props) => {
  const parcel = useParcel(props.parcelID)
  const [isDataOpen, setIsDataOpen] = React.useState(false)

  return (
    <>
      <Box justifyContent="space-between" alignItems="center">
        <h1>
          Parcel <MutedText>ID: {props.params.parcelID}</MutedText>
        </h1>
        <a href="#" onClick={() => setIsDataOpen(!isDataOpen)}>
          Show Parcel Information
        </a>
      </Box>
      <Spacer size="32px" />
      {parcel.ParcelID && isDataOpen && <ParcelData parcel={parcel} />}
      <TitleTable parcelID={props.params.parcelID} />
    </>
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
