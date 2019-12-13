import * as React from "react";
import _Box from "ui-box";

export const Box = props => {
  const { inline, ...otherProps } = props;
  const display = inline ? "inline-flex" : "flex";

  return <_Box display={display} {...otherProps} />;
};
