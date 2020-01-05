import * as React from "react"
import { X } from "react-feather"
import Popup from "reactjs-popup"
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

const useModalState = () => {
  const [isOpen, setIsOpen] = React.useState(false)

  const toggleOpen = React.useCallback(
    (isNowOpen: boolean) => {
      setIsOpen(isNowOpen || !isOpen)
    },
    [isOpen]
  )

  const close = React.useCallback(() => {
    toggleOpen(false)
  }, [toggleOpen])

  const open = React.useCallback(() => {
    toggleOpen(true)
  }, [toggleOpen])

  return {
    isOpen,
    toggleOpen,
    open,
    close,
  }
}

const NewModal = (props) => {
  const modalState = useModalState()

  useClickHandler(
    (event) => {
      const pane = document.getElementById("ModalPane")
      event.target.contains(pane) && modalState.close()
    },
    [modalState.isOpen]
  )

  return modalState.isOpen ? (
    <StyledModalContainer id="ModalContainer">
      <StyledModalPane id="ModalPane">
        <CloseButton size={24} onClick={modalState.close} />
        <StyledModalHead>
          <h1>{props.title}</h1>
          {props.head}
        </StyledModalHead>
        <Spacer size="24px" />
        <StyledModalBody>{props.body}</StyledModalBody>
        <StyledModalFoot>{props.foot}</StyledModalFoot>
      </StyledModalPane>
    </StyledModalContainer>
  ) : null
}

NewModal.defaultProps = {
  isOpen: false,
}
