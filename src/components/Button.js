import * as React from "react";
import styled from "styled-components";

export const Button = styled.button`
  background-image: linear-gradient(
    25deg,
    var(--brandDarkPurple),
    var(--brandLightPurple)
  );

  outline: none;
  border: none;
  box-shadow: 0px 1px 0px -2px rgba(0, 0, 0, 0.01);
  background-position: center center;
  background-size: 100%;
  transition: all 0.15s;
  font-weight: 500;
  color: var(--grayscale0);
  display: inline-flex;
  padding: ${props => (props.small ? "8px 12px" : "10px 14px")};
  font-size: ${props => (props.small ? "14px" : "16px")};
  cursor: ${props => (props.disabled ? "not-allowed" : "pointer")};
  border-radius: 2px;
  font-family: "Red Hat Text", sans-serif;
  letter-spacing: 0.5px;

  :hover {
    background-size: 250%;
    background-position: center right;
    box-shadow: 0px 1px 8px -2px var(--brandLightPurple);
  }
`;

Button.Ghost = styled.button`
  background: none;
  font-weight: 500;
  color: var(--brandLightPurple);
  display: inline-flex;
  /* padding: ${props => (props.small ? "8px 12px" : "10px 14px")}; */
  font-size: ${props => (props.small ? "14px" : "16px")};
  cursor: ${props => (props.disabled ? "not-allowed" : "pointer")};
  border: none;
  outline: none;
  /* border-radius: 2px; */
  font-family: "Red Hat Text", sans-serif;
  letter-spacing: 0.5px;
`;

Button.White = styled.button`
  background: #fff;
  color: var(--grayscale10);
  display: inline-flex;
  padding: ${props => (props.small ? "8px 12px" : "10px 14px")};
  font-size: ${props => (props.small ? "14px" : "16px")};
  font-weight: 500;
  cursor: ${props => (props.disabled ? "not-allowed" : "pointer")};
  border: none;
  outline: none;
  border-radius: 2px;
  font-family: "Red Hat Text", sans-serif;
  letter-spacing: 0.5px;
`;
