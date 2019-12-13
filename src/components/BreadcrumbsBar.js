import * as React from "react";
import { useBreadcrumbs } from "../hooks/useBreadcrumbs";
import { Box } from "./Box";
import { useLocation } from "wouter";

export const BreadcrumbsBar = props => {
  const [location, setLocation] = useLocation();
  const { crumbs } = useBreadcrumbs();

  return (
    <Box width="100%" height="48px" alignItems="center">
      {crumbs.map(crumb => (
        <p
          onClick={() => setLocation(crumb.path)}
          style={{ marginRight: 16, textAlign: "center", cursor: "pointer" }}
        >
          {crumb.crumb}
        </p>
      ))}
    </Box>
  );
};
