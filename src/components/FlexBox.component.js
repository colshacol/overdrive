import React from "react";
import ReactDOM from "react-dom";

import styled from "styled-components";

import * as Styled from "./FlexBox.styled";
import { useWindowSize } from "../hooks/useViewSize";

export const FlexBox = props => {
  const { size } = useWindowSize();

  const responseiveClassName = props[`${size}ClassName`] || "";
  const className = `${props.className} ${responseiveClassName}`;

  return <Styled.Container className={className} {...props} />;
};
