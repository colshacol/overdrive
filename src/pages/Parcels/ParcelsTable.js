import * as React from "react"
import { Table } from "../../components/Table"
import { useLocation } from "wouter"
import { Box } from "../../components/Box"
import { Button } from "../../components/Button"
import { Plus } from "react-feather"
import { useGlobalStore } from "../../global.store"
import Popup from "reactjs-popup"
import styled from "styled-components"
import { TextInput } from "../../components/TextInput"
import { Spacer } from "../../components/Spacer"
import { Grid, Cell } from "styled-css-grid"

export const ParcelsTable = (props) => {
  const [location, setLocation] = useLocation()
  const globalStore = useGlobalStore()
  const [isModalShown, setIsModalShown] = React.useState(false)

  const columns = React.useRef([
    {
      Header: "ID",
      accessor: "ParcelID",
      width: 80,
      onClick: (cell) => {
        globalStore.setCurrentParcelID(cell.value)
      },
      // key: "id",
      // isSortable: true
    },
    {
      Header: "Parcel Number",
      accessor: "ParcelNumber",
      width: 320,
      // key: "parcelNumber",
      // isSortable: true
    },
    {
      Header: "APN",
      accessor: "APN",
      width: 200,
      // key: "apn",
      // isSortable: true
    },
    {
      Header: "Acres",
      accessor: "Acres",
      width: 100,
      // key: "age",
      // isSortable: true
    },
    {
      Header: "Assigned To",
      accessor: "AssignedTo",
      width: 180,
      // key: "age",
      // isSortable: true
    },
    {
      Header: "Date Assigned",
      accessor: "DateAssigned",
      // key: "dateAssigned",
      // isSortable: true,
      width: 160,
    },
    {
      Header: "Date Completed",
      accessor: "DateCompleted",
      width: 160,
      // key: "dateCompleted",
      // isSortable: true
    },
  ])

  return (
    <>
      <Table
        title="Parcels"
        columns={columns.current}
        data={props.data}
        height={500}
        renderTopRow={(props, tableState) => (
          <Box
            inline
            width="100%"
            justifyContent="flex-end"
            alignItems="center"
          >
            <Popup
              trigger={
                <Button small onClick={() => setIsModalShown(true)}>
                  <Plus size="18px" style={{ marginRight: 6 }} />
                  Add Parcel
                </Button>
              }
              modal
              closeOnDocumentClick
            >
              {(close) => <AddParcelModal close={close} />}
            </Popup>
          </Box>
        )}
      />
    </>
  )
}

const STATE_LABEL_MAP = {
  ParcelNumber: { label: "Parcel Number", width: 2 },
  ParcelID: { label: "Parcel ID", width: 1 },
  Acres: { label: "Acres", width: 1 },
  StateCode: { label: "State", width: 1 },
  County: { label: "County", width: 1 },
  TownshipName: { label: "Township Name", width: 2 },
  AssignedTo: { label: "Assigned To", width: 2 },
  DateAssigned: { label: "Date Assigned", width: 2 },
  DateCompleted: { label: "Date Completed", width: 2 },
  APN: { label: "APN", width: 2 },
}

const StyledModal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  max-width: 1100px;
  min-width: 900px;
  height: 100%;
  min-height: 700px;
  max-height: 800px;
  border-radius: 6px;
  padding: 48px;
  background: var(--grayscale0);
  overflow-y: scroll;
`

const StyledForm = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: 24px;
`

const AddParcelModal = (props) => {
  const [state, setState] = React.useState({
    ParcelNumber: "",
    ParcelID: "",
    Acres: "",
    StateCode: "",
    County: "",
    TownshipName: "",
    AssignedTo: "",
    DateAssigned: "",
    DateCompleted: "",
    APN: "",
  })

  const onChange = (key) => (event) => {
    const { value } = event.target
    setState((state) => ({
      ...state,
      [key]: value,
    }))
  }

  return (
    <StyledModal>
      <h2>Add Parcel</h2>
      <StyledForm>
        <Grid columns={2} gap="24px" style={{ width: "100%" }}>
          {Object.entries(state).map(([key, value]) => (
            <Cell width={STATE_LABEL_MAP[key].width}>
              <TextInput
                width="100%"
                label={STATE_LABEL_MAP[key].label}
                value={value}
                onChange={onChange(key)}
              />
            </Cell>
          ))}
        </Grid>
      </StyledForm>
      <StyledActionsRow>
        <Button.Ghost onClick={props.close}>Cancel</Button.Ghost>
        <Spacer size="24px" />
        <Button onClick={props.close}>Submit</Button>
      </StyledActionsRow>
    </StyledModal>
  )
}

const StyledActionsRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`
