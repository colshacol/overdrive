import * as React from "react"
import { Page } from "../../components/Page"
import { Spacer } from "../../components/Spacer"
import { useRoute, useLocation, Route, Switch, Link } from "wouter"
import * as Breadcrumbs from "../../components/Breadcrumbs"
import { TitleTable } from "./TitleTable"
import { Box } from "../../components/Box"
import { TextInput } from "../../components/TextInput"
import { useStatesWithParcels } from "../../hooks/useStatesWithParcels"
import { useStateCountiesWithParcels } from "../../hooks/useStateCountiesWithParcels"

const NAVIGATION = [["Title Plant", "/accounting"]]

export const TitlePlant = (props) => {
  return (
    <Page title="Title Plant" baseRoute="/titlePlant" navigation={NAVIGATION}>
      <Breadcrumbs.Crumb path={`/titlePlant`} text="Title Plant" />

      <Switch>
        <Route path="/titlePlant" component={TitlePlantView} />
      </Switch>
    </Page>
  )
}

const TitlePlantView = (props) => {
  const [stateValue, setStateValue] = React.useState("")
  const [countyValue, setCountyValue] = React.useState("")
  const [selectedState, setSelectedState] = React.useState()
  const [selectedCounty, setSelectedCounty] = React.useState()

  return (
    <>
      <h1>Title Plant</h1>
      <Spacer size="16px" />
      <Box>
        <StateSelectInput
          value={stateValue}
          placeholder="Choose a State"
          onChange={(event) => setStateValue(event.target.value)}
          isSelectable
          onSelectiob={setSelectedState}
        />
        {selectedState && (
          <CountySelectInput
            state={selectedState}
            value={countyValue}
            placeholder="Choose a County"
            onChange={(event) => setCountyValue(event.target.value)}
            isSelectable
            onSelectiob={setSelectedCounty}
          />
        )}
      </Box>
      {/* <TitleTable /> */}
    </>
  )
}

const StateSelectInput = (props) => {
  const states = useStatesWithParcels()

  return <TextInput {...props} selectOptions={states} />
}

const CountySelectInput = (props) => {
  const counties = useStateCountiesWithParcels(props.state.StateCode)

  return <TextInput {...props} selectOptions={counties} />
}
