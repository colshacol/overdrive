import React from "react";
import ReactDOM from "react-dom";

import "@servicetitan/anvil-fonts/dist/css/anvil-fonts.css";
import "@servicetitan/design-system/dist/system.min.css";

import "./styles/variables.css";
import "./styles/fonts.css";
import "./styles/styles.css";

import * as GlobalStore from "./global.store";
import * as ProjectsStore from "./projects.store";

import * as Breadcrumbs from "./components/Breadcrumbs";

import { Link, Route, useLocation, useRouter } from "wouter";
import { BreadcrumbsProvider } from "./hooks/useBreadcrumbs";

import { Box } from "./components/Box";
import { SceneHeader } from "./SceneHeader";
// import { Parcels } from "./pages/Parcels";
import { LogIn } from "./pages/LogIn";
import { Home } from "./pages/Home";

import sampleData from "./sampleData.json";
import { AuthenticatedRouter, UnauthenticatedRouter } from "./Router";

const StoreWrapper = props => {
  return (
    <GlobalStore.Provider>
      <BreadcrumbsProvider>
        <AuthWrapper />
      </BreadcrumbsProvider>
    </GlobalStore.Provider>
  );
};

const AuthWrapper = props => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  if (!isLoggedIn)
    return <UnauthenticatedRouter logIn={() => setIsLoggedIn(true)} />;
  return <App />;
};

const App = props => {
  const [ready, setReady] = React.useState(false);
  const [location, setLocation] = useLocation();
  const router = useRouter();

  console.log(router);

  React.useLayoutEffect(() => {
    setLocation("/");
    setReady(true);
  }, []);

  return ready ? (
    <Breadcrumbs.Provider>
      {/* <a href="https://overdriveblobstorage.blob.core.windows.net/blobcontainer/Title/QCD1400.174.pdf?si=OverdriveApp&sv=2019-02-02&sr=b&sig=pxhLK3smzGI07tOHAM3xOZMv8BJBFQ9sznkTc4l6R64%3D">
        CLICK ME
      </a> */}
      <ProjectsStore.Provider>
        <Box width="100%" height="100%" flexDirection="column">
          <SceneHeader />
          <AuthenticatedRouter />
        </Box>
      </ProjectsStore.Provider>
    </Breadcrumbs.Provider>
  ) : null;
};

// const App = props => {
//   const globalStore = GlobalStore.useGlobalStore();
//   const [location, setLocation] = useLocation();

//   const handleLogInSuccess = () => {
//     setLocation("/");
//     globalStore.setIsUserAuthenticated(true);
//     globalStore.setUser({});
//   };

//   if (!globalStore.isUserAuthenticated) {
//     return <LogIn handleLogInSuccess={handleLogInSuccess} />;
//   }

//   return <AuthenticatedApp />;
// };

const rootElement = document.getElementById("root");
ReactDOM.render(<StoreWrapper />, rootElement);
