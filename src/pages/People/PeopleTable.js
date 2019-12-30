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

export const PeopleTable = (props) => {
  const [location, setLocation] = useLocation()
  const globalStore = useGlobalStore()
  const [isModalShown, setIsModalShown] = React.useState(false)

  const columns = React.useRef([
    {
      Header: "First Name",
      accessor: "FirstName",
      width: 150,
    },
    {
      Header: "Last Name",
      accessor: "LastName",
      width: 250,
    },
    {
      Header: "Email Address",
      accessor: "EmailAddress",
      width: 300,
    },
    {
      Header: "Location ID",
      accessor: "LocationID",
      width: 120,
    },
    {
      Header: "Experience",
      accessor: "YearsExperience",
      width: 120,
    },
    {
      Header: "Pay Rate",
      accessor: "PayRate",
      width: 100,
    },
    {
      Header: "Status",
      accessor: "StatusID",
      width: 100,
    },
    {
      Header: "Created Date",
      accessor: "CreateDate",
      width: 130,
      Cell: ({ cell: { value } }) => value.substring(0, 10),
    },
  ])

  return (
    <>
      <Table
        title="People"
        columns={columns.current}
        data={props.data}
        renderTopRow={(props, tableState) => (
          <Box
            inline
            width="100%"
            justifyContent="flex-end"
            alignItems="center"
          >
            {/* <Popup
              trigger={
                <Button small onClick={() => setIsModalShown(true)}>
                  <Plus size="18px" style={{ marginRight: 6 }} />
                  Add Parcel
                </Button>
              }
              modal
              closeOnDocumentClick
            >
              {close => <AddPersonModal close={close} />}
            </Popup> */}
          </Box>
        )}
      />
    </>
  )
}
