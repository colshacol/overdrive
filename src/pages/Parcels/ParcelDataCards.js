import * as React from "react"
import { Grid, Cell } from "styled-css-grid"
import theme from "../../theme"
import { Box } from "../../components/Box"
import { SmallLabel } from "../../components/SmallLabel"
import { Spacer } from "../../components/Spacer"

const BG_IMAGES = {
  black: "url(https://i.imgur.com/aMNP2JA.png)",
  purple: "url(https://i.imgur.com/veWfJkI.png)",
}

const DataCard = (props) => {
  const bgImage = BG_IMAGES[props.color]

  return (
    <Box
      display="inline-flex"
      paddingLeft="16px"
      paddingRight="48px"
      paddingTop="8px"
      paddingBottom="6px"
      // background="var(--grayscale10)"
      border="1px solid var(--darkPurple2)"
      backgroundImage={bgImage}
      backgroundPosition={props.backgroundPosition}
      borderRadius="6px"
      flexDirection="column"
    >
      <SmallLabel
        style={{
          color: "white",
        }}
      >
        {props.text}
      </SmallLabel>
      <h3 style={{ color: "white" }}>{props.value}</h3>
    </Box>
  )
}

export const ParcelDataCards = (props) => {
  const completed = props.parcels.filter((parcel) => {
    return parcel.DateCompleted
  })

  return (
    <Box>
      <DataCard
        color="purple"
        backgroundPosition="20% 7%"
        text="Total Parcels"
        value={props.parcels.length}
      />
      <Spacer size="16px" />
      <DataCard
        color="purple"
        text="Complete Parcels"
        value={completed.length}
        backgroundPosition="42% 40%"
      />
      <Spacer size="16px" />
      <DataCard
        color="purple"
        text="Incomplete Parcels"
        value={props.parcels.length - completed.length}
        backgroundPosition="55% 70%"
      />
    </Box>
  )
}
