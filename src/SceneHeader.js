import React from "react"
import { useLocation } from "wouter"
import { Button } from "./components/Button"
import { useUser } from "./stores/userStore"

import { Stack, Avatar, Popover } from "@servicetitan/design-system"

import theme from "./theme.json"
import { Link } from "./components/Link"
import { Box } from "./components/Box"

const sceneHeaderStyles = {
  backgroundImage: `url(${theme.brandBackgroundImage})`,
  backgroundSize: "cover",
  backgroundRepeat: "repeat",
  height: 68,
}

const OverdriveLogo = () => (
  <img src="/overdrive.png" style={{ maxWidth: 136, marginBottom: 4 }} />
)

export const SceneHeader = (props) => {
  const [location, setLocation] = useLocation()
  const user = useUser()
  const [isAvatarOpen, setAvatarOpen] = React.useState(false)

  return (
    <Stack direction="column">
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        className="p-l-3 p-r-3"
        style={sceneHeaderStyles}
      >
        <Stack
          alignItems="center"
          onClick={() => setLocation("/")}
          style={{ cursor: "pointer" }}
        >
          <OverdriveLogo />
        </Stack>
        <Stack direction="row">
          <Stack justifyContent="center">
            <Popover
              header={user.FullName}
              headerAlign="space-between"
              trigger={
                <Avatar
                  style={{ cursor: "pointer" }}
                  name={user.FullName}
                  size="m"
                  color="#f7f5f9"
                  onClick={() => setAvatarOpen(!isAvatarOpen)}
                />
              }
              footer={
                <Button.Ghost onClick={() => window.location.reload()}>
                  Log Out
                </Button.Ghost>
              }
              open={isAvatarOpen}
              direction="t"
              width="xs"
              sharp
              direction="bl"
              width="xs"
              padding="s"
            >
              <Box flexDirection="column">
                <Link href="/account">Account</Link>
                <Link href="/settings">Settings</Link>
              </Box>
            </Popover>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  )
}
