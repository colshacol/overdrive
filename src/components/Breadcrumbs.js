import * as React from "react";
import nanoid from "nanoid";
import { Box } from "./Box";
import { useLocation } from "wouter";
import styled from "styled-components";

const Context = React.createContext();

export const Provider = props => {
  const [crumbs, setCrumbs] = React.useState([]);

  const addCrumb = (uid, props) => {
    const existingCrumb = crumbs.find(crumb => {
      return crumb.uid === uid;
    });

    if (existingCrumb) {
      return;
    }

    setCrumbs(state => {
      return [...state, { uid, ...props }];
    });
  };

  const removeCrumb = uid => {
    setCrumbs(state => {
      return state.filter(crumb => {
        return crumb.uid !== uid;
      });
    });
  };

  return (
    <Context.Provider value={{ crumbs, addCrumb, removeCrumb }}>
      {props.children}
    </Context.Provider>
  );
};

export class Crumb extends React.Component {
  uid = nanoid();

  componentDidMount() {
    this.context.addCrumb(this.uid, this.props);
  }

  componentWillUnmount() {
    this.context.removeCrumb(this.uid);
  }

  render() {
    return null;
  }
}

Crumb.contextType = Context;

const StyledBreadcrumbs = styled.div`
  display: flex;
  align-items: center;
  /* padding: 0 24px; */
  width: 100%;
  height: 48px;
  min-height: 48px;

  p {
    font-weight: 600;
    color: var(--brandDarkPurple);
  }

  p:last-of-type {
    font-weight: 400;
    color: var(--grayscale8);
  }
`;

export const Crumbs = props => {
  const [location, setLocation] = useLocation();
  const { crumbs } = React.useContext(Context);

  return (
    <StyledBreadcrumbs>
      {crumbs.map((crumb, index) => {
        const isLastCrumb = index !== crumbs.length - 1;

        return (
          <>
            <p
              style={{ cursor: isLastCrumb ? "pointer" : "inherit" }}
              onClick={() => setLocation(crumb.path)}
            >
              {crumb.text}
            </p>
            {isLastCrumb && <p style={{ margin: "0 12px" }}>></p>}
          </>
        );
      })}
    </StyledBreadcrumbs>
  );
};
