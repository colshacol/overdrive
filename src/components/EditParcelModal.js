import * as React from "react"
import styled from "styled-components"
import { Grid, Cell } from "styled-css-grid"

import { Modal } from "./Modal"
import { Button } from "./Button"
import { Plus } from "react-feather"
import { TextInput, SelectInput } from "./TextInput"
import { useAllStates } from "../hooks/useAllStates"
import { useStateCounties } from "../hooks/usseStateCounties"
import { insertParcel, updateParcel } from "../services/api/v0"
import { useUser } from "../stores/userStore"
import { useEmployeesForProject } from "../hooks/useEmployeesForProject"
import { useEmployeesAssignedToParcel } from "../hooks/useEmployeesAssignedToParcel"
import { Dropdown } from "./Dropdown"
import { useParcelDetails } from "../hooks/useParcelDetails"

const StyledForm = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: 24px;
`

const getStateID = ({ selectedOption = {} }) => {
  return selectedOption.StateID
}

const useCounty = (props, parcel, state = {}) => {
  const stateID = getStateID(state)
  const options = useStateCounties(stateID)
  const [selectedOption, setSelectedOption] = React.useState()
  const [selectedIndex, setSelectedIndex] = React.useState()

  const setSelected = React.useCallback((option, index) => {
    setSelectedOption(option)
    setSelectedIndex(index)
  }, [])

  const clear = React.useCallback(() => {
    setSelectedOption()
    setSelectedIndex()
  }, [])

  React.useEffect(clear, [stateID])

  React.useEffect(() => {
    if (parcel.County && options.length) {
      const _county = options.find((county) => {
        return county.CountyName === parcel.County
      })

      const _index = options.indexOf(_county)
      setSelected(_county, _index)
    }
  }, [options.length, parcel.County])

  return {
    options,
    selectedOption,
    selectedIndex,
    setSelected,
    clear,
  }
}

const useEmployee = (props, parcel) => {
  // const assignedEmployees = useEmployeesAssignedToParcel(props.parcel.ParcelID)
  const options = useEmployeesForProject({ projectID: props.projectID })
  const [selectedOption, setSelectedOption] = React.useState()
  const [selectedIndex, setSelectedIndex] = React.useState()

  const setSelected = React.useCallback((option, index) => {
    setSelectedOption(option)
    setSelectedIndex(index)
  }, [])

  const clear = React.useCallback(() => {
    setSelectedOption()
    setSelectedIndex()
  }, [])

  React.useEffect(() => {
    if (parcel.AssignedTo && options.length) {
      const _state = options.find((state) => {
        return state.AssignedTo === parcel.AssignedTo
      })

      const _index = options.indexOf(_state)
      setSelected(_state, _index)
    }
  }, [options.length, parcel.AssignedTo])

  return {
    options,
    selectedOption,
    selectedIndex,
    setSelected,
    clear,
  }
}

const useState = (props, parcel) => {
  const options = useAllStates()
  const [selectedOption, setSelectedOption] = React.useState()
  const [selectedIndex, setSelectedIndex] = React.useState()

  const setSelected = React.useCallback((option, index) => {
    setSelectedOption(option)
    setSelectedIndex(index)
  }, [])

  React.useEffect(() => {
    if (parcel.StateCode && options.length) {
      const _state = options.find((state) => {
        return state.StateCode === parcel.StateCode
      })

      const _index = options.indexOf(_state)
      setSelected(_state, _index)
    }
  }, [options.length, parcel.StateCode])

  const clear = React.useCallback(() => {
    setSelectedOption()
    setSelectedIndex()
  }, [])

  return {
    options,
    selectedOption,
    selectedIndex,
    setSelected,
    clear,
  }
}

export const EditParcelModal = (props) => {
  const user = useUser()

  const parcel = useParcelDetails({
    parcelID: props.parcel.ParcelID,
    projectID: props.projectID,
  })

  const state = useState(props, parcel) || {}
  const employees = useEmployee(props, parcel)
  const county = useCounty(props, parcel, state)

  const [projectID, setProjectID] = React.useState(parcel.projectID)
  const [townshipName, setTownshipName] = React.useState(parcel.TownshipName)
  const [parcelNumber, setParcelNumber] = React.useState(parcel.ParcelNumber)
  const [acres, setAcres] = React.useState(parcel.Acres)
  const [apn, setApn] = React.useState(parcel.APN)

  React.useEffect(() => {
    setProjectID(parcel.ProjectID)
    setTownshipName(parcel.TownshipName)
    setParcelNumber(parcel.ParcelNumber)
    setAcres(parcel.Acres)
    setApn(parcel.APN)

    employees.setSelected(parcel.AssignedTo)
    console.log(parcel.Acres)
  }, [parcel])

  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const submit = () => {
    setIsSubmitting(true)

    const options = {
      stateCode: state.selectedOption.StateCode,
      county: county.selectedOption.CountyName,
      employeeID: employees.selectedOption.EmployeeID,
      townshipName,
      parcelNumber,
      projectID,
      acres,
      apn,
    }

    if (props.parcel.ParcelID) {
      options.parcelID = parcel.ParcelID

      return updateParcel(options).then((response) => {
        setIsSubmitting(false)
      })
    }

    options.projectID = Number(props.projectID)

    insertParcel(options).then((response) => {
      console.log({ response })
      setIsSubmitting(false)
    })
  }

  return (
    <Modal
      title="Add Parcel"
      description="Create a parcel."
      triggerElement={
        <Button small>
          <Plus size="18px" style={{ marginRight: 6 }} />
          Add Parcel
        </Button>
      }
      actions={(modalState) => (
        <Button
          onClick={() => {
            submit()
            modalState.close()
          }}
        >
          Submit
        </Button>
      )}
    >
      <StyledForm>
        <Grid columns={6} gap="24px" style={{ width: "100%" }}>
          <Cell width={2}>
            <Dropdown
              id="editParcelSstate"
              label={"Name of State"}
              width="100%"
              isRequired={true}
              selectedIndex={state.selectedIndex}
              options={state.options}
              onSelect={state.setSelected}
              defaultValue={""}
              onClear={state.clear}
              displayValueKey="StateName"
            />
          </Cell>
          <Cell width={4}>
            <Dropdown
              id="editParcelCounty"
              label={"County"}
              width="100%"
              value={county.inputValue}
              isRequired={true}
              selectedIndex={county.selectedIndex}
              options={county.options}
              onSelect={county.setSelected}
              defaultValue={""}
              onClear={county.clear}
              displayValueKey="CountyName"
            />
          </Cell>
          <Cell width={3}>
            <TextInput
              autoComplete={"please-no"}
              value={townshipName || ""}
              label={"Township Name"}
              width="100%"
              onChange={(e) => setTownshipName(e.target.value)}
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
              onChange={(e) => setAcres(e.target.value)}
              value={String(acres) || ""}
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
              onChange={(e) => setParcelNumber(e.target.value)}
              value={parcelNumber || ""}
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
              onChange={(e) => setApn(e.target.value)}
              value={apn || ""}
              type={"text"}
              isRequired={true}
              defaultValue={""}
            />
          </Cell>
          <Cell width={6}>
            <Dropdown
              id="editParcelEmployees"
              label={"Assigned To"}
              width="100%"
              isRequired={true}
              selectedIndex={employees.selectedIndex}
              options={employees.options}
              onSelect={employees.setSelected}
              defaultValue={""}
              onClear={employees.clear}
              displayValueKey="EmployeeName"
            />
          </Cell>
        </Grid>
      </StyledForm>
    </Modal>
  )
}

EditParcelModal.defaultProps = {
  parcel: {},
}
