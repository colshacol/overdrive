import * as React from "react"

import { Box } from "./Box"
import { Spacer } from "./Spacer"
import { useLocation } from "wouter"
import styled from "styled-components"
import { Crumbs } from "./Breadcrumbs"
import { SmallLabel } from "./SmallLabel"
import { Link } from "./Link"

const PageContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
`

const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1550px;
  margin: 0 auto;
  padding: 32px;
`

const NestedLinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 16px;
`

const NavLink = styled(Link)`
  margin-left: 8px;
`

const NavigationLinks = (props) => {
  return props.navigation.map(([label, routeOrNested]) => {
    if (Array.isArray(routeOrNested)) {
      return (
        <React.Fragment key={`nav-${label}`}>
          <Spacer size="32px" />
          <SmallLabel>{label}</SmallLabel>
          <Spacer size="24px" />
          {/* <NestedLinksContainer> */}
          <NavigationLinks navigation={routeOrNested} />
          {/* </NestedLinksContainer> */}
        </React.Fragment>
      )
    }

    const href =
      routeOrNested === props.baseRoute
        ? props.baseRoute
        : `${props.baseRoute}${routeOrNested}`

    return (
      <React.Fragment key={`${href}-${label}`}>
        <NavLink href={href}>{label}</NavLink>
        <Spacer size="24px" />
      </React.Fragment>
    )
  })
}

export const Page = (props) => {
  return (
    <PageContainer>
      {props.navigation && (
        <StyledPageNavigation>
          <Link href="/">{"<"} Back to Dashboard</Link>
          <Spacer size="48px" />
          <SmallLabel>NAVIGATION</SmallLabel>
          <Spacer size="24px" />
          <NavigationLinks
            navigation={props.navigation}
            baseRoute={props.baseRoute}
          />
        </StyledPageNavigation>
      )}
      <BodyContainer>
        <Crumbs />
        {props.children}
      </BodyContainer>
    </PageContainer>
  )
}

const StyledPageNavigation = styled.div`
  display: flex;
  flex-direction: column;
  width: 240px;
  max-width: 240px;
  min-width: 240px;
  padding: 48px 24px;
  padding-top: 24px;
  background: var(--grayscale0);
  border-right: 1px solid var(--darkPurple2);
  box-shadow: 2px 0px 12px -4px var(--darkPurple2);
`

Page.Navigation = (props) => {
  return (
    <Box
      width="240px"
      height="100%"
      minWidth="240px"
      paddingY="24px"
      paddingX="32px"
      flexDirection="column"
      background="white"
      borderRight="2px solid var(--grayscale4)"
    >
      <Link href="/">{"<"} Back to Dashboard</Link>
      <Spacer size="32px" />
      <SmallLabel>NAVIGATION</SmallLabel>
      {props.children}
    </Box>
  )
}

const NavigationItem = (props) => {
  const [location, setLocation] = useLocation()

  return <Link href={props.href}>{props.children}</Link>
}

Page.NavigationItem = NavigationItem

Page.Container = PageContainer
