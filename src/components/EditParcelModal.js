import store from "store"

import * as React from "react"
import styled from "styled-components"
import { Grid, Cell } from "styled-css-grid"

import { Modal } from "./Modal"
import { Button } from "./Button"
import { Plus } from "react-feather"
import { TextInput, SelectInput } from "./TextInput"
import { useAllStates } from "../hooks/useAllStates"
import { useStateCounties } from "../hooks/usseStateCounties"
import { insertParcel } from "../services/api/v0"
import { useUser } from "../stores/userStore"

const getProjectID = () => {
  const match = window.location.pathname.match(/project\/\d/)
  return Array.isArray(match) ? match[0].split("/")[1] : "0"
}

const getEmployeeID = () => {
  return store.get("user").EmployeeID
}

const StyledForm = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: 24px;
`

export const EditParcelModal = (props) => {
  const parcel = props.parcel || {}
  const user = useUser()

  const [state, setState] = React.useState({
    selectedState: undefined,
    selectedCounty: undefined,
    StateCode: parcel.StateCode || "",
    County: parcel.County || "",
    TownshipName: parcel.TownshipName || "",
    Acres: parcel.Acres || "",
    ParcelNumber: parcel.ParcelNumber || "",
    APN: parcel.APN || "",
    AssignedTo: parcel.AssignedTo || "",
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

  const setIsSubmitting = (bool) => {
    setState((state) => ({
      ...state,
      isSubmitting: bool,
    }))
  }

  const submit = () => {
    setIsSubmitting(true)
    const options = {
      stateCode: state.selectedState.StateCode,
      county: state.CountyName,
      acres: state.Acres,
      parcelNumber: state.ParcelNumber,
      apn: state.APN,
      statusID: 1,
      assignedTo: state.AssignedTo,
      projectID: getProjectID(),
      employeeID: user.EmployeeID,
    }

    insertParcel(options).then((response) => {
      console.log({ response })
      setIsSubmitting(false)
    })
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
      actions={(modalState) => <Button onClick={submit}>Submit</Button>}
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
          <Cell width={4}>
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
