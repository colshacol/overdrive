import React from "react";
import ReactDOM from "react-dom";

import Box from "ui-box";

const ListHeader = props => {
  return (
    <Box width="100%">
      <h1>{props.title}</h1>
    </Box>
  );
};

const ListItemTitle = props => {
  return (
    <Box>
      <h3>
        <a href="#">{props.title}</a>
      </h3>
    </Box>
  );
};

const ListItem = props => {
  return (
    <Box
      width="100%"
      background="#ffffff"
      padding="16px"
      border="1px solid var(--grayscale2)"
      boxShadow="var(--elevation0)"
      borderRadius="6px"
    >
      <ListItemTitle title={props.item.title} />
    </Box>
  );
};

const ListItems = props => {
  return (
    <>
      {props.items.map(item => (
        <ListItem {...props} item={item} />
      ))}
    </>
  );
};

export const List = props => {
  return (
    <Box width="100%">
      <ListHeader {...props} />
      <ListItems {...props} />
    </Box>
  );
};
