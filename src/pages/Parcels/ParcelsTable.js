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
import { Modal } from "../../components/Modal"

export const ParcelsTable = (props) => {
  const [location, setLocation] = useLocation()
  const [isModalShown, setIsModalShown] = React.useState(false)

  const columns = React.useRef([
    {
      Header: " ",
      accessor: "ParcelID",
      width: 24,
      onClick: (cell) => {
        const id = cell.row.values.ParcelID
        setLocation(`${location}/parcels/${id}`)
      },
      // key: "id",
      // isSortable: true
    },
    {
      Header: "Parcel Number",
      accessor: "ParcelNumber",
      width: 320,
      onClick: (cell) => {
        const id = cell.row.values.ParcelID
        setLocation(`${location}/parcels/${id}`)
      },
      // key: "parcelNumber",
      // isSortable: true
    },
    {
      Header: "APN",
      accessor: "APN",
      width: 200,
      onClick: (cell) => {
        const id = cell.row.values.ParcelID
        setLocation(`${location}/parcels/${id}`)
      },
      // key: "apn",
      // isSortable: true
    },
    {
      Header: "Acres",
      accessor: "Acres",
      width: 100,
      onClick: (cell) => {
        const id = cell.row.values.ParcelID
        setLocation(`${location}/parcels/${id}`)
      },
      // key: "age",
      // isSortable: true
    },
    {
      Header: "Assigned To",
      accessor: "AssignedTo",
      width: 180,
      onClick: (cell) => {
        const id = cell.row.values.ParcelID
        setLocation(`${location}/parcels/${id}`)
      },
      // key: "age",
      // isSortable: true
    },
    {
      Header: "Date Assigned",
      accessor: "DateAssigned",
      // key: "dateAssigned",
      // isSortable: true,
      width: 160,
      onClick: (cell) => {
        const id = cell.row.values.ParcelID
        setLocation(`${location}/parcels/${id}`)
      },
    },
    {
      Header: "Date Completed",
      accessor: "DateCompleted",
      width: 160,
      onClick: (cell) => {
        const id = cell.row.values.ParcelID
        setLocation(`${location}/parcels/${id}`)
      },
      // key: "dateCompleted",
      // isSortable: true
    },
  ])

  return (
    <>
      <Table
        isLoading={props.isLoading}
        title="Parcels"
        columns={columns.current}
        data={props.data}
        height={400}
        renderTopRow={(props, tableState) => (
          <Box
            inline
            width="100%"
            justifyContent="flex-end"
            alignItems="center"
          >
            <AddParcelModal />
          </Box>
        )}
      />
    </>
  )
}

const STATE_LABEL_MAP = {
  StateCode: { label: "State", width: 2, type: "text", isRequired: true },
  County: { label: "County", width: 4, type: "text", isRequired: true },
  TownshipName: {
    label: "Township Name",
    width: 3,
    type: "text",
    isRequired: true,
  },
  Acres: { label: "Acres", width: 3, type: "number", isRequired: true },
  ParcelNumber: {
    label: "Parcel Number",
    width: 6,
    type: "number",
    isRequired: true,
  },
  APN: { label: "APN", width: 6, type: "text", isRequired: true },
  AssignedTo: {
    label: "Assigned To",
    width: 6,
    type: "text",
    isRequired: true,
  },
  DateAssigned: {
    label: "Date Assigned",
    width: 3,
    type: "date",
    isRequired: true,
  },
  DateCompleted: {
    label: "Date Completed",
    width: 3,
    type: "date",
    isRequired: true,
  },
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
    StateCode: "",
    County: "",
    TownshipName: "",
    Acres: "",
    ParcelNumber: "",
    APN: "",
    AssignedTo: "",
    DateAssigned: "",
    DateCompleted: "",
  })

  const onChange = (key) => (event) => {
    const { value } = event.target
    setState((state) => ({
      ...state,
      [key]: value,
    }))
  }

  return (
    <Modal
      title="Add Parcel"
      text="Create a parcel."
      triggerElement={
        <Button small>
          <Plus size="18px" style={{ marginRight: 6 }} />
          Add Parcel
        </Button>
      }
      actions={(modalState) => (
        <Button onClick={modalState.close}>Submit</Button>
      )}
    >
      <StyledForm>
        <Grid columns={6} gap="24px" style={{ width: "100%" }}>
          {Object.entries(state).map(([key, value]) => (
            <Cell width={STATE_LABEL_MAP[key].width}>
              <TextInput
                width="100%"
                label={STATE_LABEL_MAP[key].label}
                type={STATE_LABEL_MAP[key].type}
                isRequired={STATE_LABEL_MAP[key].isRequired}
                value={value}
                onChange={onChange(key)}
              />
            </Cell>
          ))}
        </Grid>
      </StyledForm>
    </Modal>
  )
}
