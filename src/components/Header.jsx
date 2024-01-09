import { Box, Flex, Avatar, Spacer, Heading, Button } from "@chakra-ui/react";

import { NavLink } from "react-router-dom";

import {

  DynamicWidget,
} from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import ArtistModal from "./ArtistModal";

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
        ></Heading>
        <Box dir="Row" pb={4}>
          <Flex>
            <ArtistModal />
            <Spacer display={{ base: "none", md: "block" }} mx={2} />
              <DynamicWidget innerButtonComponent={<button>Sign In</button>} />
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default Header;
