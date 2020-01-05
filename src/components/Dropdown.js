import * as React from "react"
import styled from "styled-components"
import { useClickHandler } from "../hooks/useClickHandler"

const StyledLabel = styled.label`
  font-weight: 500;
  margin-bottom: 4px;
`

const StyledInputBox = styled.div`
  font-size: 16px;
  letter-spacing: 1px;
  font-family: "Visby", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif !important;
  background: transparent;
  padding: 8px 12px;
  width: 100%;
  border-radius: 3px;
  border: 2px solid var(--grayscale4);
  outline: none;
  background: #fff;
  max-height: 47px;
  height: 47px;
  display: flex;
  align-items: center;
`

const StyledOptionsContainer = styled.div`
  position: absolute;
  top: 100%;
  z-index: 500;
  max-height: 300px;
  overflow-y: scroll;
  width: 100%;
  background: #fff;
  box-shadow: 0px 2px 12px -2px rgba(0, 0, 0, 0.25) !important;
`

const StyledDropdownContainer = styled.div`
  position: relative;
  display: inline-flex;
  width: ${(props) => props.width};
  flex-direction: column;
`

const StyledIcons = styled.div`
  position: relative;

  .downArrow {
    cursor: pointer;
    color: var(--grayscale6);
    position: absolute;
    top: -10px;
    right: 35px;
    z-index: 50;
  }

  .downArrow:hover,
  .clearIcon:hover {
    color: var(--brandDarkPurple);
  }

  .clearIcon {
    cursor: pointer;
    z-index: 50;
    color: var(--grayscale6);
    position: absolute;
    bottom: -13px;
    right: 0;
  }

  .clearIcon:hover {
    color: var(--brandDarkPurple);
  }
`

const StyledOption = styled.div`
  cursor: pointer;
  width: 100%;
  max-width: 100%;
  background: #fff;
  padding: 16px;

  :hover {
    background: var(--grayscale1);
  }
`

const DropdownOptions = (props) => {
  React.useEffect(() => {
    const handler = (event) => {
      const { target } = event
      const dropdown = document.getElementById(props.id)
      const containsDropdown = target.contains(dropdown)
      const containedByDropdown = dropdown.contains(target)

      if (!containsDropdown || !containedByDropdown) {
        props.onClose()
      }
    }

    document.addEventListener("click", handler)
    return () => document.removeEventListener("click", handler)
  }, [])

  return (
    <StyledOptionsContainer>
      {props.options.map((option, index) => (
        <StyledOption
          onClick={() => {
            props.onSelect(option, index)
            props.onClose()
          }}
        >
          {option[props.displayValueKey]}
        </StyledOption>
      ))}
    </StyledOptionsContainer>
  )
}

export const Dropdown = (props) => {
  const [isOpen, setIsOpen] = React.useState(false)

  const selectedOption = props.options[props.selectedIndex] || {
    text: props.placeholder,
  }

  return (
    <StyledDropdownContainer width={props.width} id={props.id}>
      <StyledLabel onClick={() => setIsOpen(!isOpen)}>
        {props.label + (props.isRequired ? "*" : "")}
      </StyledLabel>
      <StyledInputBox onClick={() => setIsOpen(!isOpen)}>
        {selectedOption[props.displayValueKey]}
      </StyledInputBox>
      {isOpen && (
        <DropdownOptions
          {...props}
          onClose={() => setIsOpen(false)}
          selectedOption={selectedOption}
        />
      )}
    </StyledDropdownContainer>
  )
}

Dropdown.defaultProps = {
  label: "",
  placeholder: "",
  displayValueKey: "",
  selectedIndex: undefined,
  options: [],
  onSelect: () => {},
  onClear: () => {},
}
