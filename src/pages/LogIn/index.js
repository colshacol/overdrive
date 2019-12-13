import * as React from "react";
import { Box } from "../../components/Box";

import theme from "../../theme";
import { TextInput } from "../../components/TextInput";
import { Spacer } from "../../components/Spacer";
import { Logo } from "../../components/Logo";
import { Button } from "../../components/Button";

const INPUT_STYLE = {
  background: "rgba(255, 255, 255, 0.05)",
  border: "2px solid white"
};

const Form = props => {
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
      />
      <Spacer size="16px" />
      <TextInput
        inputClassName="onPurple"
        id="password"
        label="Password"
        placeholder=""
      />
      <Spacer size="24px" />
      <Button.White variant="white" onClick={props.logIn}>
        Log In
      </Button.White>
    </Box>
  );
};

export const LogIn = props => {
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
  );
};
