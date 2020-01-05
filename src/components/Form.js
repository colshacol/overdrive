import * as React from "react"
import styled from "styled-components"
import { Grid, Cell } from "styled-css-grid"

import { TextInput } from "./TextInput"
import { Dropdown } from "./Dropdown"

const StyledForm = styled.form`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: 24px;
`

const StyledGrid = styled(Grid)`
  width: 100%;
`

const useFormState = (options) => {
    const [values, setValue] = React.useState(options.configuration)

    const setKeyValue = React.useCallback((key, value) => {
        setValue(values => ({
            ...values,
            [key]: {
              ...[values[key]],
              value
            }
        }))
    }, [])

    const handleSubmit = React.useCallback((event) => {
        options.handleSubmit(values)
    }, [values])

    const handleChange = React.useCallback((event) => {
        const key = event.target.getAttribute('data-value-key')
        const value = event.target.value
        setKeyValue(key, value)
    }), []

    return {
        values,
        handleSubmit,
        handleChange
    }
}

export const Form = (props) => {
  const state = useFormState(props.configuration)

  return (
    <StyledForm onSubmit={state.handleSubmit}>
      <StyledGrid columns={6} gap="24px">
        {Object.entries(state.values).map(([key, value]) => {
          if ()
        })}
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
            data-value-key="StateName"
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
            value={employees.inputValue || ""}
            type={"text"}
            isRequired={false}
            selectOptions={employees.options}
            onSelection={employees.setSelected}
            defaultValue={""}
            autoComplete={"false"}
            onClear={employees.clear}
          />
        </Cell>
      </StyledGrid>
    </StyledForm>
  )
}
