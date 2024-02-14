import {
  DynamicConnectButton, DynamicWidget,useDynamicContext, DynamicUserProfile, CheckIcon
} from "@dynamic-labs/sdk-react-core";
import React from "react";
import {
  Avatar, Button, Icon, Image, Img, IconButton,
} from "@chakra-ui/react";
import { ethers } from "ethers";
import logo from "/public/logo.svg"; // Fix: Correct import statement for logo.svg
export const LoginView = () => {
  const { setShowAuthFlow } = useDynamicContext();
  const { setShowDynamicUserProfile } = useDynamicContext();

  if(window.ethereum != null){
  const wallet =  new ethers.providers.Web3Provider(window.ethereum).getSigner().getAddress();
  if (wallet === undefined){
    console.log("brute force initiated")
    return(
        <Button
        bg="accent.light"
        textColor={"blackAlpha.900"}
        _hover={{ opacity: 0.8 }}
        onClick={() => setShowAuthFlow(true)}
        >
          Sign In
        </Button>
    );
  }
  else{
    return(
      <IconButton
      isRound="true"
      icon={<Avatar src="https://img.freepik.com/premium-photo/gorilla-wearing-pair-headphones-with-purple-background_962508-4153.jpg" />}
      onClick={() => setShowDynamicUserProfile(true)}
      ></IconButton>
    );
  }
}
else{
  return(
    <Button
    bg="accent.light"
    textColor={"blackAlpha.900"}
    _hover={{ opacity: 0.8 }}
    onClick={() => setShowAuthFlow(true)}
    >
      Sign In
    </Button>
  );
}
};