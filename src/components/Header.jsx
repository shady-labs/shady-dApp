import WalletButton from "./WalletButton";

import { Box, Flex, Avatar, Spacer, Heading } from "@chakra-ui/react";

import { NavLink } from "react-router-dom";


const Header = () => {
  return (
    
    <Box maxW={"97%"}>
      <Flex direction="row" justifyContent={"space-between"} pt={2}>
        <Heading
          as="h1"
          fontSize={{ base: "lg", md: "lg" }}
          color="accent.light"
          fontWeight={200}
          pl={2}
        >
        </Heading>
        <Box dir="Row" pb={4}>
          <Flex>
            <NavLink to="/user">
              <Avatar
                size="md"
                name="Dan Abrahmov"
                src="https://img.freepik.com/premium-photo/gorilla-wearing-pair-headphones-with-purple-background_962508-4153.jpg"
              />
            </NavLink>
            <Spacer display={{ base: "none", md: "block" }} mx={2} />
            <WalletButton />
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default Header;
