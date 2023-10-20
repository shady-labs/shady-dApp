import WalletButton from "./WalletButton";

import {
  Box,
  Button,
  Flex,
  Avatar,
  Divider,
  IconButton,
  Spacer,
  Heading,
} from "@chakra-ui/react";

import {
  FiHome,
  FiGrid,
  FiSearch,
  FiBarChart2,
  FiUpload,
  FiSettings,
  FiMenu,
  FiArrowRightCircle,
  FiArrowLeft,
} from "react-icons/fi";

import { useState } from "react";

import { motion } from "framer-motion";
import Search from "./Search";

const Header = () => {
  const [isActive, setIsActive] = useState(false);
  const handleQuery = async (query) => {
    setSearchQuery(query);
    console.log("Search Query: ", query);
    setIsLoading(true);
    if (query != "" && query != null && query != " ") {
      await searchBarAutoComplete(query).then((res) => {
        //console.log("Search result: ", res)
        if (
          res[0].length == 0 &&
          res[1].length == 0 &&
          res[2].length == 0 &&
          res[3].length == 0
        ) {
          setIsNoResults(true);
        } else {
          setTrackSearchResults(res[0]);
          setArtistSearchResults(res[1]);
          setSetTrackofArtist(res[3]);
          setSetArtistofTrack(res[2]);
          console.log("Track Search Results: ", trackSearchResults);
          setIsNoResults(false);
        }
        setIsTopCharts(false);
        setIsLoading(false);
      });
    }
  };
  return (
    <Box 
    maxW={"74.5rem"}
    >
      <Flex direction="row" justifyContent={"space-between"} pt={4}>
        <Heading
          as="h1"
          fontSize={{ base: "lg", md: "lg" }}
          color="accent.light"
          fontWeight={200}
          pl={2}
        >
          Search... Tracks, Artists or Albums
        </Heading>
        <Box dir="Row">
          <Flex>
            <Avatar
              size="md"
              name="Dan Abrahmov"
              src="https://img.freepik.com/premium-photo/gorilla-wearing-pair-headphones-with-purple-background_962508-4153.jpg"
            />
            <Spacer display={{ base: "none", md: "block" }} mx={2} />
            <WalletButton />
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default Header;
