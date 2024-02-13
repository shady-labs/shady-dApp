import { Box, Flex, Avatar, Spacer, Heading, Button } from "@chakra-ui/react";

import { NavLink } from "react-router-dom";
import { Search } from "./SearchHeader";

import {

  DynamicWidget,
} from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import ArtistModal from "./ArtistModal";
import { LoginView } from "./signInButton";

const Header = () => {
  return (
    <Box maxW={"97%"}>
      <Flex direction="row" justifyContent={"space-between"} pt={2}>
        <Heading
          as="h1"
          fontSize={{ base: "3xl", md: "3xl" }}
          color="accent.light"
          fontWeight={200}
          // pl={2}
          pt={5}
          pb={5}
        >
          <Search />
        </Heading>
        <Box dir="Row" pb={4}>
          <Flex>
            <ArtistModal />
            <Spacer display={{ base: "none", md: "block" }} mx={2} />
              {/* <DynamicWidget innerButtonComponent={<button>Sign In</button>} /> */}
              <LoginView />
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default Header;
