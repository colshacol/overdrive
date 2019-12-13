import styled from "styled-components";
import * as React from "react";

import { Box } from "./Box";
import { Spacer } from "./Spacer";

export const TextInput = props => {
  const width = props.fillWidth ? "100%" : "280px";
  const inputPaddingY = props.slim ? "8px" : "12px";

  const inputStyle = {
    ...props.inputStyle,
    paddingTop: inputPaddingY,
    paddingBottom: inputPaddingY
  };

  return (
    <StyledTextInput width={props.width || width} className="TextInput">
      {props.label && (
        <>
          <label htmlFor={props.id}>{props.label}</label>
        </>
      )}
      <input
        id={props.id}
        value={props.value}
        placeholder={props.placeholder}
        onChange={props.onChange}
        className={props.inputClassName}
        style={inputStyle}
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
    </StyledTextInput>
  );
};

const StyledTextInput = styled.div`
  position: relative;
  display: inline-flex;
  width: ${props => props.width};
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
`;
