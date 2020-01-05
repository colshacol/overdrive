import * as React from "react"
import styled from "styled-components"
import { Modal } from "./_Modal"
import { Button } from "./Button"
import { Grid } from "styled-css-grid"

export const EditTitleModal = (props) => {
  const [isOpen, setIsOpen] = React.useState(false)

  const handleClose = React.useCallback(() => {
    setIsOpen(false)
  }, [])

  return (
    <Modal
      isOpen={isOpen}
      handleClose={handleClose}
      title="Title"
      head="Create/edit a title."
      body={(
          <Grid>
              
          </Grid>
      )}
      foot={(
          <StyledFoot>
              <Button onClick={handleSubmit}
          </StyledFoot>
      )}
    />
  )
}
