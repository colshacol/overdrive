import * as React from "react"
import { Table } from "../../components/Table"
import { useLocation } from "wouter"
import { Box } from "../../components/Box"
import { Button } from "../../components/Button"
import { Plus, X } from "react-feather"
import { useGlobalStore } from "../../global.store"
import Popup from "reactjs-popup"
import styled from "styled-components"
import { TextInput } from "../../components/TextInput"
import { Spacer } from "../../components/Spacer"
import { Grid, Cell } from "styled-css-grid"
import truncate from "truncate"
import { Modal } from "../../components/Modal"

// Use props.columnOverrides to use default columns
// with unique properties.

// Use props.columns to provide completely custom
// column selection / properties.

const useMergedColuns = (props, columns) => {
  const ref = React.useRef(columns)

  if (props.columnOverrides) {
    ref.current = columns.reduce((column, final) => {
      const override = props.columnOverrides[column.Header]

      if (override) {
        return [
          ...final,
          {
            ...column,
            ...override,
          },
        ]
      }

      return final
    }, [])
  }

  return ref.current
}

export const TitleTable = (props) => {
  const globalStore = useGlobalStore()
  const [location, setLocation] = useLocation()

  const columns = useMergedColuns(props, [
    {
      Header: "ID",
      accessor: "TitleID",
      width: 80,
      maxWidth: 200,
      collapse: true,
      onClick: (cell) => {
        globalStore.setCurrentTitleID(cell.value)
      },
    },
    {
      Header: "Status",
      accessor: "status",
      width: 120,
      maxWidth: 200,
      collapse: true,
      onClick: (cell) => {
        globalStore.setCurrentTitleID(cell.value)
      },
    },
    {
      Header: "Grantor",
      accessor: "Grantor",
      width: 230,
      maxWidth: 300,
      collapse: true,
      Cell: ({ cell: { value } }) => truncate(value, 23),
    },
    {
      Header: "Grantee",
      accessor: "Grantee",
      width: 150,
      maxWidth: 200,
      collapse: true,
      onClick: (cell) => {
        globalStore.setCurrentTitleID(cell.value)
      },
    },
    {
      Header: "Recorded Date",
      accessor: "RecordedDate",
      width: 200,
      maxWidth: 250,
      collapse: true,
      onClick: (cell) => {
        globalStore.setCurrentTitleID(cell.value)
      },
    },
    {
      Header: "Effective Date",
      accessor: "EffectiveDate",
      width: 200,
      maxWidth: 250,
      collapse: true,
      onClick: (cell) => {
        globalStore.setCurrentTitleID(cell.value)
      },
    },
    {
      Header: "Document Type",
      accessor: "DocumentType",
      width: 200,
      maxWidth: 250,
      collapse: true,
      onClick: (cell) => {
        globalStore.setCurrentTitleID(cell.value)
      },
    },
  ])

  return (
    <Table
      isLoading={props.isLoading}
      height={props.data.length * 45}
      title="Titles"
      columns={columns || []}
      data={props.data}
      renderTopRow={(props, tableState) => (
        <Box inline width="100%" justifyContent="flex-end" alignItems="center">
          <AddTitleModal />
        </Box>
      )}
    />
  )
}

const STATE_LABEL_MAP = {
  EmployeeID: {
    label: "Employee ID",
    width: 2,
    type: "text",
    isRequired: false,
  },
  RecordedDate: {
    label: "Recorded Date",
    width: 2,
    type: "date",
    isRequired: true,
  },
  CertificationDate: {
    label: "Certification Date",
    width: 2,
    type: "date",
    isRequired: true,
  },
  EffectiveDate: {
    label: "Effective Date",
    width: 2,
    type: "date",
    isRequired: true,
  },
  DocumentType: {
    label: "Document Type",
    width: 3,
    type: "text",
    isRequired: true,
  },
  DocumentName: {
    label: "Document Name",
    width: 3,
    type: "text",
    isRequired: true,
  },
  BookVolume: { label: "Volume", width: 2, type: "number", isRequired: true },
  Book: { label: "Book", width: 2, type: "text", isRequired: true },
  Page: { label: "Page", width: 2, type: "number", isRequired: true },
  Acreage: { label: "Acreage", width: 3, type: "number", isRequired: true },
  Grantor: { label: "Grantor", width: 6, type: "text", isRequired: true },
  Grantee: { label: "Grantee", width: 6, type: "text", isRequired: true },
  Conveyance: { label: "Conveyance", width: 6, type: "text", isRequired: true },
  Mapped: { label: "Mapped", width: 6, type: "text", isRequired: true },
  CreatedBy: { label: "Created By", width: 6, type: "text", isRequired: true },
}

const StyledForm = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: 24px;
`

// TODO: Create Form component.
const Form = (props) => {
  return <form />
}

const AddTitleModal = (props) => {
  const [state, setState] = React.useState({
    Grantor: "",
    Grantee: "",
    Book: "",
    BookVolume: "",
    Page: "",
    RecordedDate: "",
    CertificationDate: "",
    EffectiveDate: "",
    DocumentType: "",
    DocumentName: "",
    Acreage: "",
    Conveyance: "",
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
      title="Add Title"
      text="Create a new title."
      triggerElement={
        <Button small>
          <Plus size="18px" style={{ marginRight: 6 }} />
          Add Title
        </Button>
      }
      actions={(modalState) => (
        <>
          <Button onClick={modalState.close}>Submit</Button>
        </>
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
