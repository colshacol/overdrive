import React from "react";

export const SmallLabel = props => {
  return (
    <small className="SmallLabel" {...props}>
      {props.children}
    </small>
  );
};
