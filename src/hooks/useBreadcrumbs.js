import * as React from "react";
import { useLocation, useRoute } from "wouter";

const Context = React.createContext();

export const BreadcrumbsProvider = props => {
  const [crumbs, setCrumbs] = React.useState([]);

  const hasCrumb = crumb => {
    return crumbs.find(c => {
      return c.uid === crumb.uid;
    });
  };

  const addCrumb = crumb => {
    console.log("adding crumb");
    setCrumbs([...crumbs, crumb]);
  };

  const removeCrumb = crumb => () => {
    console.log("removing crumb");
    setCrumbs(
      crumbs.filter(c => {
        return c.uid !== crumb.uid;
      })
    );
  };

  return (
    <Context.Provider value={{ crumbs, addCrumb, removeCrumb, hasCrumb }}>
      {props.children}
    </Context.Provider>
  );
};

export const useBreadcrumb = crumb => {
  const context = React.useContext(Context);

  React.useEffect(() => {
    if (!context.hasCrumb(crumb)) {
      context.addCrumb(crumb);
      return context.removeCrumb(crumb);
    }
  }, [crumb]);
};

export const useBreadcrumbs = crumb => {
  return React.useContext(Context);
};
