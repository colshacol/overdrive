import * as React from "react"
import { Spacer } from "../../components/Spacer"
import { ParcelDataCards } from "./ParcelDataCards"
import { ParcelsTable } from "./ParcelsTable"
import { Box } from "../../components/Box"
import { useParcelsForProject } from "../../hooks/useParcelsForProject"

export const ProjectParcelsView = (props) => {
  const parcels = useParcelsForProject(props.params.projectID)

  return (
    <>
      <Box justifyContent="space-between">
        <h1>Parcels</h1>
        <ParcelDataCards parcels={parcels} />
      </Box>
      <Spacer size="32px" />
      <ParcelsTable
        data={parcels}
        isLoading={!parcels.length}
        projectID={props.params.projectID}
      />
    </>
  )
}
