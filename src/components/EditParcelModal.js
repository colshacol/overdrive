import * as React from "react"
import styled from "styled-components"
import { Grid, Cell } from "styled-css-grid"

import { Modal } from "./Modal"
import { Button } from "./Button"
import { Plus } from "react-feather"
import { TextInput, SelectInput } from "./TextInput"
import { useAllStates } from "../hooks/useAllStates"
import { useStateCounties } from "../hooks/usseStateCounties"

const StyledForm = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: 24px;
`

export const EditParcelModal = (props) => {
  const [state, setState] = React.useState({
    selectedState: undefined,
    selectedCounty: undefined,
    StateCode: "",
    County: "",
    TownshipName: "",
    Acres: "",
    ParcelNumber: "",
    APN: "",
    AssignedTo: "",
  })

  const states = useAllStates()
  const counties = useStateCounties(
    state.selectedState && state.selectedState.StateID
  )

  const stateOptions = React.useMemo(() => {
    return states.map((state) => {
      return { ...state, text: state.StateCode }
    })
  }, [states.length])

  const countyOptions = React.useMemo(() => {
    if (!counties.length) {
      return []
    }

    return counties.map((county) => {
      return { ...county, text: county.CountyName }
    })
  }, [counties.length])

  const onChange = React.useCallback(
    (key) => (event) => {
      const { value } = event.target
      console.warn({ key, value })
      setState((state) => {
        return { ...state, [key]: value }
      })
    },
    [state]
  )

  console.log("state", state)

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
        <input type="hidden" value="something" />
        <Grid columns={6} gap="24px" style={{ width: "100%" }}>
          <Cell width={2}>
            <SelectInput
              label={"Name of State"}
              width="100%"
              value={state.StateCode}
              onChange={onChange("StateCode")}
              type={"text"}
              isRequired={true}
              selectOptions={stateOptions}
              onSelection={(selectedState) =>
                setState((state) => ({ ...state, selectedState }))
              }
              defaultValue={""}
              autoComplete={"false"}
              onClear={() =>
                setState((state) => ({
                  ...state,
                  selectedState: undefined,
                  StateName: "",
                }))
              }
            />
          </Cell>
          <Cell width={2}>
            <SelectInput
              autoComplete={"please-no"}
              label={"County"}
              width="100%"
              value={state.County}
              onChange={onChange("County")}
              type={"text"}
              isRequired={true}
              selectOptions={countyOptions}
              onSelection={(selectedCounty) =>
                setState((state) => ({ ...state, selectedCounty }))
              }
              defaultValue={""}
              onClear={() =>
                setState((state) => ({
                  ...state,
                  selectedCounty: undefined,
                  County: "",
                }))
              }
            />
          </Cell>
          <Cell width={3}>
            <TextInput
              autoComplete={"please-no"}
              value={state.TownshipName}
              label={"Township Name"}
              width="100%"
              onChange={onChange("TownshipName")}
              type={"text"}
              isRequired={true}
              defaultValue={""}
            />
          </Cell>
          <Cell width={3}>
            <TextInput
              autoComplete={"please-no"}
              label={"Acres"}
              width="100%"
              onChange={onChange("Acres")}
              value={state.Acres}
              type={"number"}
              isRequired={true}
              defaultValue={""}
            />
          </Cell>
          <Cell width={6}>
            <TextInput
              autoComplete={"please-no"}
              label={"Parcel Number"}
              width="100%"
              onChange={onChange("ParcelNumber")}
              value={state.ParcelNumber}
              type={"number"}
              isRequired={true}
              defaultValue={""}
            />
          </Cell>
          <Cell width={6}>
            <TextInput
              autoComplete={"please-no"}
              label={"APN"}
              width="100%"
              onChange={onChange("APN")}
              value={state.APN}
              type={"text"}
              isRequired={true}
              defaultValue={""}
            />
          </Cell>
          <Cell width={6}>
            <TextInput
              autoComplete={"please-no"}
              label={"Assigned To"}
              width="100%"
              onChange={onChange("AssignedTo")}
              value={state.AssignedTo}
              type={"text"}
              isRequired={true}
              defaultValue={""}
            />
          </Cell>
        </Grid>
      </StyledForm>
    </Modal>
  )
}
