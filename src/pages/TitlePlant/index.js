import * as React from "react"
import { Page } from "../../components/Page"
import { Spacer } from "../../components/Spacer"
import { useRoute, useLocation, Route, Switch, Link } from "wouter"
import * as Breadcrumbs from "../../components/Breadcrumbs"
import { TitleTable } from "./TitleTable"
import { Box } from "../../components/Box"
import { TextInput, SelectInput } from "../../components/TextInput"
import { useStatesWithParcels } from "../../hooks/useStatesWithParcels"
import { useStateCountiesWithParcels } from "../../hooks/useStateCountiesWithParcels"
import * as apiV0 from "../../services/api/v0"
import { ParcelsTable } from "../Parcels/ParcelsTable"
import { TitlePlantTitleView } from "./TitlePlantTitleView"
import { TitlePlantParcelView } from "./TitlePlantParcelView"

const NAVIGATION = [["Title Plant", "/titlePlant"]]

export const TitlePlant = (props) => {
  return (
    <Page title="Title Plant" baseRoute="/titlePlant" navigation={NAVIGATION}>
      <Breadcrumbs.Crumb path={`/titlePlant`} text="Title Plant" />

      <Switch>
        <Route path="/titlePlant" component={TitlePlantHomeView} />
        <Route
          path="/titlePlant/parcel/:parcelID"
          component={TitlePlantParcelView}
        />
        <Route
          path="/titlePlant/parcel/:parcelID/titles/:titleID"
          component={TitlePlantTitleView}
        />
      </Switch>
    </Page>
  )
}

const TitlePlantHomeView = (props) => {
  const [stateValue, setStateValue] = React.useState("")
  const [countyValue, setCountyValue] = React.useState("")
  const [selectedState, setSelectedState] = React.useState()
  const [selectedCounty, setSelectedCounty] = React.useState()
  const [parcels, setParcels] = React.useState([])

  const setState = (state) => {
    setCountyValue("")
    setSelectedCounty()
    setSelectedState(state)
    setStateValue(state.text)
  }

  const setCounty = (county) => {
    setSelectedCounty(county)
    setCountyValue(county.text)
  }

  React.useEffect(() => {
    if (selectedCounty) {
      apiV0
        .getParcelsForCounty(selectedState.StateCode, selectedCounty.County)
        .then((parcels) => {
          setParcels(parcels)
        })
    }
  }, [selectedCounty])

  return (
    <>
      <h1>Title Plant</h1>
      <Spacer size="32px" />
      <Box>
        <StateSelectInput
          value={stateValue}
          label="State"
          placeholder="Choose a State"
          onChange={(event) => setStateValue(event.target.value)}
          isSelectable
          onSelection={setState}
        />
        {selectedState && (
          <>
            <Spacer size="16px" />
            <CountySelectInput
              label="County"
              state={selectedState}
              value={countyValue}
              placeholder="Choose a County"
              onChange={(event) => setCountyValue(event.target.value)}
              isSelectable
              onSelection={setCounty}
            />
          </>
        )}
      </Box>
      <Spacer size="24px" />
      {selectedState && selectedCounty && (
        <ParcelsTable data={parcels} isLoading={!parcels.length} />
      )}
    </>
  )
}

const applyInputFilter = (target, input, field) => {
  return target.filter((item) => {
    return (item[field] || "").toLowerCase().includes(input.toLowerCase())
  })
}

const StateSelectInput = (props) => {
  const states = useStatesWithParcels()

  const statesOptions = states.map((state) => {
    return { ...state, text: state.StateName }
  })

  return (
    <SelectInput
      {...props}
      selectOptions={applyInputFilter(statesOptions, props.value, "StateName")}
    />
  )
}

const CountySelectInput = (props) => {
  const counties = useStateCountiesWithParcels(props.state.StateCode)

  const countyOptions = counties.map((county) => {
    return { ...county, text: county.County }
  })

  return (
    <SelectInput
      {...props}
      selectOptions={applyInputFilter(countyOptions, props.value, "CountyName")}
    />
  )
}
