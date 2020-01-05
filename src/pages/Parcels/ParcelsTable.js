import * as React from "react"
import { Table } from "../../components/Table"
import { useLocation } from "wouter"
import { Box } from "../../components/Box"

import { EmptyNullCell } from "../../components/EmptyNullCell"
import { ShortDateCell } from "../../components/ShortDateCell"
import { EditParcelModal } from "../../components/EditParcelModal"

export const ParcelsTable = (props) => {
  const [location, setLocation] = useLocation()

  const columns = React.useRef([
    {
      Header: " ",
      accessor: "ParcelID",
      width: 24,
      Cell: EmptyNullCell,
      nullContent: "",
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
      Cell: EmptyNullCell,
      nullContent: "",
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
      width: 250,
      Cell: EmptyNullCell,
      nullContent: "",
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
      Cell: EmptyNullCell,
      nullContent: "",
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
      width: 178,
      Cell: EmptyNullCell,
      nullContent: "",
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
      width: 180,
      Cell: ShortDateCell,
      nullContent: "",
      onClick: (cell) => {
        const id = cell.row.values.ParcelID
        setLocation(`${location}/parcels/${id}`)
      },
    },
    {
      Header: "Date Completed",
      accessor: "DateCompleted",
      width: 180,
      Cell: ShortDateCell,
      nullContent: "",
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
        renderTopRow={(p, tableState) => (
          <Box
            inline
            width="100%"
            justifyContent="flex-end"
            alignItems="center"
          >
            <EditParcelModal projectID={props.projectID} />
          </Box>
        )}
      />
    </>
  )
}
