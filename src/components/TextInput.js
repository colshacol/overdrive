import styled, { css } from "styled-components"
import * as React from "react"
import Popover from "react-tiny-popover"
import Popup from "reactjs-popup"
import { ChevronDown, X } from "react-feather"

import { Box } from "./Box"
import { Spacer } from "./Spacer"

const StyledOptions = styled.div`
  z-index: 100;
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
  width: 280px;
  max-width: 280px;
  background: #fff;
  padding: 16px;

  :hover {
    background: var(--grayscale1);
  }
`

const applyInputFilter = (target, input, field) => {
  return target.filter((item) => {
    return (item[field] || "").toLowerCase().includes(input.toLowerCase())
  })
}

export const SelectInput = (props) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const { onClear, onSelection, selectOptions, ...otherProps } = props

  const options = selectOptions.filter((item) => {
    return (item.text || "")
      .toLowerCase()
      .includes(otherProps.value.toLowerCase())
  })

  console.log(otherProps)

  return (
    <Popup
      open={isOpen}
      arrow={false}
      className="SelectInputOptions"
      position="bottom left"
      on="focus"
      closeOnDocumentClick={true}
      onClose={() => setIsOpen(false)}
      trigger={
        <TextInput
          {...otherProps}
          icon={
            <StyledIcons>
              <ChevronDown
                className="downArrow"
                size="24px"
                onClick={() => {
                  setIsOpen(!isOpen)
                }}
              />
              <X
                className="clearIcon"
                size="24px"
                onClick={() => {
                  isOpen && setIsOpen(false)
                  onClear()
                }}
              />
            </StyledIcons>
          }
          onInputFocus={(e) => {
            setIsOpen(true)
            props.onFocus(e)
          }}
          onInputBlur={(e) => {
            props.onBlur(e)
          }}
        />
      }
    >
      <StyledOptions>
        {options.map((option) => (
          <StyledOption
            onClick={() => {
              props.onChange({ target: { value: option.text } })
              onSelection(option)
              setIsOpen(false)
            }}
          >
            {option.text}
          </StyledOption>
        ))}
      </StyledOptions>
    </Popup>
  )
}

SelectInput.defaultProps = {
  onFocus: () => {},
  onBlur: () => {},
  onSelection: () => {},
  selectOptions: [],
  value: "",
}

const useRequiredModifiers = (props) => {
  const labelIndicator = React.useRef("")

  React.useEffect(() => {
    if (props.isRequired) {
      labelIndicator.current = "*"
    }
  }, [props.isRequired])

  return { labelIndicator: labelIndicator.current }
}

export const TextInput = (props) => {
  const [isSelectBoxOpen, setIsSelectBoxOpen] = React.useState(false)
  const { labelIndicator } = useRequiredModifiers(props)
  const width = props.fillWidth ? "100%" : "280px"
  const inputPaddingY = props.slim ? "8px" : "12px"

  const inputStyle = {
    ...props.inputStyle,
    paddingTop: inputPaddingY,
    paddingBottom: inputPaddingY,
  }

  const requiredLabelIndicator = props.isRequired ? "*" : ""

  return (
    <StyledTextInput
      className="TextInput"
      {...props}
      width={props.width || width}
    >
      {props.label && (
        <>
          <label>
            {props.label}
            {requiredLabelIndicator}
          </label>
        </>
      )}
      <input
        ref={props.inputRef}
        id={props.id}
        value={props.value}
        placeholder={props.placeholder}
        onChange={props.onChange}
        className={props.inputClassName}
        style={inputStyle}
        type={props.type}
        onFocus={props.onInputFocus}
        onBlur={props.onInputBlur}
        autoComplete={props.autoComplete || "off"}
      />
      {props.icon && (
        <Box
          inline
          position="absolute"
          right="12px"
          top="12px"
          alignItems="center"
          height="100%"
        >
          {props.icon}
        </Box>
      )}
    </StyledTextInput>
  )
}

TextInput.defaultProps = {
  isRequired: false,
}

const StyledTextInput = styled.div`
  position: relative;
  display: inline-flex;
  width: ${(props) => props.width};
  flex-direction: column;

  label {
    font-weight: 500;
    margin-bottom: 4px;
  }

  input {
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
  }

  input:focus {
    border: 2px solid var(--brandDarkPurple);
  }

  input::placeholder {
    font-size: 16px;
    letter-spacing: 1px;
    font-family: "Visby", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif !important;
    color: var(--grayscale7);
  }

  input.onPurple::placeholder {
    color: #fff;
    opacity: 0.9;
  }

  input.onPurple {
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
  }

  input {
    ${(props) => (props.type === "password" ? passwordInputStyles : "")}
  }
`

const passwordInputStyles = css`
  font-size: 22px;
  letter-spacing: 6px;
  font-weight: 900;
`
