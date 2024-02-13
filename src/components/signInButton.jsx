import {
  DynamicConnectButton,
} from "@dynamic-labs/sdk-react-core";

import React from "react";
import {
  Button,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";

/* const [loading, setLoading] = useState(false); */

const children = (
  <Button
    bg="accent.light"
    textColor={"blackAlpha.900"}
    _hover={{ opacity: 0.8 }}
  >
    {/*  {loading ? <Spinner color="white" /> : "upload"} */}
    Sign In
  </Button>
);

export const LoginView = () => (
  <DynamicConnectButton>{children}</DynamicConnectButton>
);
