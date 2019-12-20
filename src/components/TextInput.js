import styled, { css } from "styled-components"
import * as React from "react"
import Popover from "react-tiny-popover"

import { Box } from "./Box"
import { Spacer } from "./Spacer"

export const TextInput = (props) => {
  const [isSelectBoxOpen, setIsSelectBoxOpen] = React.useState(false)
  const width = props.fillWidth ? "100%" : "280px"
  const inputPaddingY = props.slim ? "8px" : "12px"

  const inputStyle = {
    ...props.inputStyle,
    paddingTop: inputPaddingY,
    paddingBottom: inputPaddingY,
  }

  return (
    <StyledTextInput
      className="TextInput"
      {...props}
      width={props.width || width}
    >
      {props.label && (
        <>
          <label htmlFor={props.id}>{props.label}</label>
        </>
      )}
      <Popover
        position="bottom"
        isOpen={props.isSelecable && isSelectBoxOpen}
        content={<div style={{ background: "white" }}>HOWDY DUDE</div>}
      >
        <>
          <input
            id={props.id}
            value={props.value}
            placeholder={props.placeholder}
            onChange={props.onChange}
            className={props.inputClassName}
            onFocus={() => props.isSelecable && setIsSelectBoxOpen(true)}
            onBlur={() => props.isSelecable && setIsSelectBoxOpen(false)}
            style={inputStyle}
            type={props.type}
          />
          {props.icon && (
            <Box
              inline
              position="absolute"
              right="12px"
              alignItems="center"
              height="100%"
            >
              {props.icon}
            </Box>
          )}
        </>
      </Popover>
    </StyledTextInput>
  )
}

TextInput.defaultProps = {
  isSelectable: undefined,
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
