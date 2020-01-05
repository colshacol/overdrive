import * as React from "react"
import { X } from "react-feather"
import styled from "styled-components"
import { Spacer } from "./Spacer"
import { useClickHandler } from "../hooks/useClickHandler"

const CloseButton = styled(X)`
  width: 24px;
  height: 24px;
  right: 24px;
  top: 24px;
  position: absolute;
  cursor: pointer;
`

const StyledModalContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  z-index: 100;
  padding-bottom: 8vh;
  padding-bottom: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
`

const StyledModalPane = styled.div`
  width: 800px;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #fff;
`

const StyledModalHead = styled.div`
  display: flex;
`

const StyledModalBody = styled.div`
  display: flex;
`

const StyledModalFoot = styled.div`
  display: flex;
`

export const Modal = (props) => {
  useClickHandler((event) => {
    const pane = document.getElementById("ModalPane")
    event.target.contains(pane) && props.handleClose()
  })

  return (
    <StyledModalContainer id="ModalContainer">
      <StyledModalPane id="ModalPane">
        <CloseButton size={24} onClick={props.handleClose} />
        <StyledModalHead>
          <h1>{props.title}</h1>
          {props.head}
        </StyledModalHead>
        <Spacer size="24px" />
        <StyledModalBody>{props.body}</StyledModalBody>
        <StyledModalFoot>{props.foot}</StyledModalFoot>
      </StyledModalPane>
    </StyledModalContainer>
  )
}

Modal.defaultProps = {
  isOpen: false,
}
