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
  const [titles, setTitles] = React.useState([])

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
      apiV0.getTitlesForCounty(selectedCounty).then((titles) => {
        setTitles(titles)
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
      <Spacer size="16px" />
      {selectedState && selectedCounty && titles.length && (
        <TitleTable data={titles} />
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
    return { ...county, text: county.CountyName }
  })

  return (
    <SelectInput
      {...props}
      selectOptions={applyInputFilter(countyOptions, props.value, "CountyName")}
    />
  )
}
