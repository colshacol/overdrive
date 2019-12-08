import styled, { css } from "styled-components"
import * as React from "react"
import Popover from "react-tiny-popover"
import Popup from "reactjs-popup"
import { ChevronDown } from "react-feather"

import { Box } from "./Box"
import { Spacer } from "./Spacer"

const StyledOptions = styled.div``

const StyledOption = styled.div`
  width: 280px;
  max-width: 280px;
  background: #fff;
  padding: 16px;

  :hover {
    background: var(--grayscale1);
  }
`

export const SelectInput = (props) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const { onSelection, selectOptions, ...otherProps } = props

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
          icon={<ChevronDown size="24px" color={"var(--grayscale6)"} />}
          onInputFocus={(e) => {
            setIsOpen(true)
            console.log("focused")
            props.onFocus(e)
          }}
          onInputBlur={(e) => {
            // setIsOpen(false)
            console.log("blurred")
            props.onBlur(e)
          }}
          {...otherProps}
        />
      }
    >
      <StyledOptions>
        {selectOptions.map((option) => (
          <StyledOption
            onClick={() => {
              onSelection(option)
              console.log("clickedddd")
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
          <label htmlFor={props.id}>
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
  isSelectable: undefined,
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
