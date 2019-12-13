import * as React from "react";
import Box from "ui-box";

export const Spacer = (props) => {
  return (
    <Box
      display="inline-flex"
      width={`${props.size} !important`}
      height={`${props.size} !important`}
      minWidth={`${props.size} !important`}
      minHeight={`${props.size} !important`}
    />
  );
};
