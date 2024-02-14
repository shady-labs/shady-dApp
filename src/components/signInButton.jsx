import {
  useDynamicContext, DynamicUserProfile,
} from "@dynamic-labs/sdk-react-core";
import React from "react";
import {
  Avatar, Button, Icon, Image, Img, IconButton,
} from "@chakra-ui/react";

const getAddress = () => {
  const { primaryWallet } = useDynamicContext();
  const address = primaryWallet;
  /* console.log(address); */
  return address;
}


export const LoginView = () => {
  const { setShowAuthFlow, setShowDynamicUserProfile, user} = useDynamicContext();

  if (getAddress() == null){
    return(
        <Button
        bg="accent.light"
        textColor={"blackAlpha.900"}
        _hover={{ opacity: 0.8 }}
        onClick={() =>  setShowAuthFlow(true)}
        >
          Sign In
        </Button>
    );
  }
  else{
    return (
      <>
        <IconButton onClick={() => setShowDynamicUserProfile(true)}
        isRound="true"
        icon={<Avatar size="sm" src="https://img.freepik.com/premium-photo/gorilla-wearing-pair-headphones-with-purple-background_962508-4153.jpg" />}
        >  
        </IconButton>
        <DynamicUserProfile variant='dropdown' />
      </>
    );
  };

};