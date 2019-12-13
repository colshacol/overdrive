import * as React from "react";

const getSize = width => {
  if (width < 640) {
    return "sm";
  }

  if (width < 1008) {
    return "md";
  }

  return "xl";
};

export const useWindowSize = () => {
  const [width, setWidth] = React.useState(window.innerWidth);
  const [height, setHeight] = React.useState(window.innerHeight);
  const [size, setSize] = React.useState(getSize(width));

  React.useEffect(() => {
    const listener = event => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
      setSize(getSize(window.innerWidth));
    };

    const removeListener = event => {
      window.removeEventListener(listener);
    };

    window.addEventListener(listener);
    return removeListener;
  });

  return { width, height, size };
};
