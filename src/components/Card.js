import * as React from "react"
import styled from "styled-components"

const Card = styled.div`
  position: relative;
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  border-radius: 6px;
  height: 100px;
  cursor: pointer;
  padding: 16px 32px;
  background: #fff;
  background-position: 20% 7%;
  box-shadow: 0px 2px 12px -4px var(--darkPurple2);
  transition: all 0.25s;
  border: 1px solid var(--darkPurple2);

  h3 {
    display: inline;
    /* color: var(--brandLightPurple); */
  }

  :hover {
    /* box-shadow: 0px 2px 8px -2px var(--brandLightPurple); */
    box-shadow: 0px 8px 16px -6px var(--darkPurple2);
  }
`

export default Card
