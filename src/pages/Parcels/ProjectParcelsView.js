import * as React from "react"
import { Page } from "../../components/Page"
import { Spacer } from "../../components/Spacer"
import { ParcelDataCards } from "./ParcelDataCards"
import { useRoute, useLocation, Route, Switch, Link } from "wouter"
import * as ProjectsStore from "../../projects.store"
import { useGlobalStore } from "../../global.store"
import { ParcelsTable } from "./ParcelsTable"
import sampleData from "../../sampleData.json"
import * as Breadcrumbs from "../../components/Breadcrumbs"

import { ProjectParcelView } from "./ProjectParcelView"
import { Box } from "../../components/Box"
import { useParcelsForProject } from "../../hooks/useParcelsForProject"
import { useProject } from "../../hooks/useProject"

export const ProjectParcelsView = (props) => {
  const parcels = useParcelsForProject(props.params.projectID)

  return (
    <>
      <Box justifyContent="space-between">
        <h1>Parcels</h1>
        <ParcelDataCards parcels={parcels} />
      </Box>
      <Spacer size="32px" />
      <ParcelsTable data={parcels} isLoading={!parcels.length} />
    </>
  )
}
