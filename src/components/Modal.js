import * as React from "react"
import { Table } from "./Table"
import { useLocation } from "wouter"
import { Box } from "./Box"
import { Button } from "./Button"
import { Plus, X } from "react-feather"
// import { useGlobalStore } from "global.store"
import Popup from "reactjs-popup"
import styled from "styled-components"
import { TextInput } from "./TextInput"
import { Spacer } from "./Spacer"
import { Grid, Cell } from "styled-css-grid"
import truncate from "truncate"

const CloseButton = styled(X)`
  width: 24px;
  height: 24px;
  position: absolute;
  top: 24px;
  cursor: pointer;
  right: 24px;
`

const StyledModal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  max-width: 1100px;
  min-width: 900px;
  height: 100%;
  min-height: 700px;
  max-height: 800px;
  border-radius: 6px;
  padding: 48px;
  background: var(--grayscale0);
  overflow-y: scroll;
  overflow-x: hidden;
  position: relative;
`

const StyledActionsRow = styled.div`
  padding: 24px 0 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`

export const Modal = (props) => {
  return (
    <Popup modal closeOnDocumentClick trigger={props.triggerElement}>
      {(close) => (
        <StyledModal>
          <CloseButton onClick={close} />
          <h2>{props.title}</h2>
          <p>{props.text}</p>
          <Spacer size="24px" />
          {props.children}
          <StyledActionsRow>{props.actions({ close })}</StyledActionsRow>
        </StyledModal>
      )}
    </Popup>
  )
}
