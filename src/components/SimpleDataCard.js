import React from "react";
import ReactDOM from "react-dom";
import Box from "ui-box";

import { SmallLabel } from "./SmallLabel";

export const SimpleDataCard = props => {
  return (
    <Box
      display="inline-flex"
      width="100%"
      // boxShadow=" 0px 1px 8px -2px var(--brandLightPurple)"
      backgroundImage={props.backgroundImage}
      backgroundPosition={props.backgroundPosition}
      padding="16px"
      borderRadius="6px"
      flexDirection="column"
    >
      <SmallLabel
        style={{
          color: "white"
        }}
      >
        {props.text}
      </SmallLabel>
      <h2 style={{ color: "white" }}>{props.value}</h2>
    </Box>
  );
};
