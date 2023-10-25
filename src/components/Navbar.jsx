import { NavLink } from "react-router-dom";

import { Box, Button, Flex, Image, IconButton, Spacer } from "@chakra-ui/react";
import { useOutsideClick } from '@chakra-ui/react'
import {
  FiHome,
  FiGrid,
  FiSearch,
  FiBarChart2,
  FiUpload,
  FiSettings,
  FiArrowLeft,
} from "react-icons/fi";

import { useState, useRef } from "react";

var size = "large";
const Navbar = ({ changeHomelayoutSize }) => {
  const [navSize, changeNavSize] = useState("large");
  const ref = useRef();
  useOutsideClick({
    ref: ref,
    handler: () => handleSizeChange("small"),
  })

  const handleSizeChange = (inputSize) => {
    console.log("inputSize: ", inputSize);
    size = inputSize;
    changeNavSize(inputSize);
    changeHomelayoutSize(inputSize);
    console.log("navSize: ", navSize);
  };
  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      zIndex={30}
      minW={
        navSize == "large"
          ? { base: "20", md: "12rem", lg: "16rem", xl: "15rem" }
          : { base: "0", md: "0rem", lg: "0rem", xl: "0rem" }
      }
      minH={{ base: "5rem", md: "88vh" }}
      bg="#18181b"
      bgImage="linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.5))"
      onClick={() => {
        console.log("navbar clicked current size:", navSize)
        if (navSize == "small") {
          // change navbar size to small
          // changeNavSize("small")
          size = "large";
          handleSizeChange("large");
          console.log("small changed to: ", navSize);
        }
        else{
          if(navSize == "large"){
            size = "small";
            handleSizeChange("small");
            console.log("large changed to: ", navSize);
          }
        }
      }}
      useOutSideClick = {true}
    >
      <Flex direction="column" p={4}>
        <NavContent changeNavSize={handleSizeChange} navSize={navSize} />
      </Flex>
    </Box>
  );
};

export const NavContent = ({ changeNavSize, navSize }) => {
  return (
    <Flex
      direction="column"
      justifyItems={navSize == "large" ? "flex-start" : "flex-end"}
    >
      {TopNav({ changeNavSize, navSize })}
      {MidNav({ navSize })}
      <Spacer />
      <Spacer />
      {BottomNav({ navSize })}
    </Flex>
  );
};

const TopNav = ({ changeNavSize, navSize }) => (
  <Flex direction="row" justifyContent={"space-between"}>
    {
      <Box>
        <NavLink to="/home">
          <Image h="50px" borderRadius="full" src="logo.svg" />
        </NavLink>
      </Box>
    }
    {navSize == "large" ? (
      <IconButton
        background="none"
        _hover={{ background: "none" }}
        onClick={() => {
          if (size == "large") {
            // change navbar size to small
            // changeNavSize("small")
            size = "small";
            changeNavSize("small");
            console.log("large changed to: ");
          } else {
            size = "large";
            console.log("small changed to");
            changeNavSize("large");
            // changeNavSize("large")
          }
        }}
        icon={<FiArrowLeft size="25" color="white" />}
      />
    ) : null}
  </Flex>
);

const MidNav = ({ navSize }) => (
  <Flex direction="column" gap={2} mt={3} mb={3}>
    <NavLink to="/home">
      {({ isActive }) => (
        <Button
          bg={isActive ? "#2B2730" : "transparent"}
          _hover={isActive ? { opacity: 1 } : { opacity: 1 }}
          opacity={isActive ? 1 : 0.6}
          rounded="base"
          display="inline-flex"
          alignItems="center"
          justifyContent="flex-start"
          gap={6}
          py={6}
          px={4}
          w="full"
        >
          {navSize == "large" ? (
            <>
              <FiHome size={20} color="white" />
              <span>Home</span>
            </>
          ) : (
            <FiHome size={20} color="white" />
          )}
        </Button>
      )}
    </NavLink>
    <NavLink to="/search">
      {({ isActive }) => (
        <Button
          bg={isActive ? "#2B2730" : "transparent"}
          _hover={isActive ? { opacity: 1 } : { opacity: 1 }}
          opacity={isActive ? 1 : 0.6}
          rounded="base"
          display="inline-flex"
          alignItems="center"
          justifyContent="flex-start"
          gap={6}
          py={6}
          px={4}
          w="full"
        >
          <FiSearch size={20} color="white" />
          {navSize == "large" ? <span>Search</span> : null}
        </Button>
      )}
    </NavLink>
    <NavLink to="/browse">
      {({ isActive }) => (
        <Button
          bg={isActive ? "#2B2730" : "transparent"}
          _hover={isActive ? { opacity: 1 } : { opacity: 1 }}
          opacity={isActive ? 1 : 0.6}
          rounded="base"
          display="inline-flex"
          alignItems="center"
          justifyContent="flex-start"
          gap={6}
          py={6}
          px={4}
          w="full"
        >
          <FiGrid size={20} color="white" />
          {navSize == "large" ? <span>Browse</span> : null}
        </Button>
      )}
    </NavLink>
    <NavLink to="/favorites">
      {({ isActive }) => (
        <Button
          bg={isActive ? "#2B2730" : "transparent"}
          _hover={isActive ? { opacity: 1 } : { opacity: 1 }}
          opacity={isActive ? 1 : 0.6}
          rounded="base"
          display="inline-flex"
          alignItems="center"
          justifyContent="flex-start"
          gap={6}
          py={6}
          px={4}
          w="full"
        >
          <FiBarChart2 size={20} color="white" />
          {navSize == "large" ? <span>Favorites</span> : null}
        </Button>
      )}
    </NavLink>
  </Flex>
);

const BottomNav = ({ navSize }) => (
  <Flex direction="column" gap={2} mt={3}>
    <NavLink to="/upload">
      {({ isActive }) => (
        <Button
          bg={isActive ? "#2B2730" : "transparent"}
          _hover={isActive ? { opacity: 1 } : { opacity: 1 }}
          opacity={isActive ? 1 : 0.6}
          rounded="base"
          display="inline-flex"
          alignItems="center"
          justifyContent="flex-start"
          gap={6}
          py={6}
          px={4}
          w="full"
        >
          <FiUpload size={20} color="#fff" />
          {navSize == "large" ? <span>Upload Track</span> : null}
        </Button>
      )}
    </NavLink>
    <NavLink to="/settings">
      {({ isActive }) => (
        <Button
          bg={isActive ? "#2B2730" : "transparent"}
          color={isActive ? "000" : "#fff"}
          _hover={isActive ? { opacity: 1 } : { opacity: 1 }}
          opacity={isActive ? 1 : 0.6}
          rounded="base"
          display="inline-flex"
          alignItems="center"
          justifyContent="flex-start"
          gap={6}
          py={6}
          px={4}
          w="full"
        >
          <FiSettings size={20} color="white" />
          {navSize == "large" ? <span>Settings</span> : null}
        </Button>
      )}
    </NavLink>
    {/* <WalletButton /> */}
  </Flex>
);

export default Navbar;
