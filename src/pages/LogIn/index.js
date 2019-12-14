import * as React from "react"
import { Box } from "../../components/Box"

import theme from "../../theme"
import { TextInput } from "../../components/TextInput"
import { Spacer } from "../../components/Spacer"
import { Logo } from "../../components/Logo"
import { Button } from "../../components/Button"

import { useUser } from "../../stores/userStore"

const Form = (props) => {
  const user = useUser()
  const [emailAddress, setEmailAddress] = React.useState("")
  const [password, setPassword] = React.useState("")

  return (
    <Box
      paddingBottom="48px"
      width="400px"
      color="#fff"
      borderRadius="6px"
      alignItems="flex-start"
      inline
      paddingX="32px"
      flexDirection="column"
    >
      <Logo style={{ width: 260, height: "auto" }} />
      <Spacer size="16px" />
      <p>Log in to access your dashboard.</p>
      <Spacer size="32px" />
      <TextInput
        inputClassName="onPurple"
        id="email"
        label="Email Address"
        placeholder="dave@foo.com"
        value={emailAddress}
        onChange={({ target: { value } }) => setEmailAddress(value)}
      />
      <Spacer size="16px" />
      <TextInput
        inputClassName="onPurple"
        id="password"
        label="Password"
        placeholder=""
        type="password"
        value={password}
        onChange={({ target: { value } }) => setPassword(value)}
      />
      <Spacer size="24px" />
      <Button.White
        variant="white"
        onClick={() => user.authenticate(emailAddress, password)}
      >
        Log In
      </Button.White>
    </Box>
  )
}

export const LogIn = (props) => {
  return (
    <Box
      width="100%"
      height="100%"
      backgroundImage={`url(${theme.brandBackgroundImage})`}
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      justifyContent="center"
      alignItems="center"
    >
      <Form logIn={props.logIn} />
    </Box>
  )
}
