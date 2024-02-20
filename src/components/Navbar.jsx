import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Box, Button, Flex, Image, IconButton, Spacer } from "@chakra-ui/react";
import {
  FiHome,
  FiGrid,
  FiSearch,
  FiBarChart2,
  FiUpload,
  FiSettings,
  FiArrowLeft,
} from "react-icons/fi";
import { AvatarNav } from "./avatarNav";

const NAV_ITEMS = [
  { link: "/home", name: "Home", icon: <FiHome size={20} color="white" /> },
  {
    link: "/search",
    name: "Search",
    icon: <FiSearch size={20} color="white" />,
  },
  { link: "/browse", name: "Browse", icon: <FiGrid size={20} color="white" /> },
  {
    link: "/favorites",
    name: "Favorites",
    icon: <FiBarChart2 size={20} color="white" />,
  },
  {
    link: "/upload",
    name: "Upload Track",
    icon: <FiUpload size={20} color="white" />,
  },
  {
    link: "/settings",
    name: "Settings",
    icon: <FiSettings size={20} color="white" />,
  },
];

const Navbar = ({ changeHomelayoutSize }) => {
  const [navSize, changeNavSize] = useState("small");
  const handleSizeChange = (inputSize) => {
    changeNavSize(inputSize);
    changeHomelayoutSize(inputSize);
  };

  const TopNav = ({ handleSizeChange, navSize }) => (
    <Flex direction="row" justifyContent={"space-between"}>
      {
        <Box>
          <NavLink to="/home" onClick={() => handleSizeChange("large")}>
            <Image h="50px" borderRadius="full" src="logo.svg" />
          </NavLink>
        </Box>
      }
      {navSize == "large" ? (
        <IconButton
          background="none"
          _hover={{ background: "none" }}
          onClick={() => handleSizeChange("small")}
          icon={<FiArrowLeft size="25" color="white" />}
        />
      ) : null}
    </Flex>
  );

  const Nav = ({ navSize }) => (
    <Flex direction="column" gap={2} mt={3}>
      {NAV_ITEMS.map((item, i) => (
        <NavLink to={`${item.link}`} key={i}>
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
              {item.icon}
              {navSize == "large" ? <span>{item.name}</span> : null}
            </Button>
          )}
        </NavLink>
      ))}
    </Flex>
  );

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
      minH={{ base: "5rem", md: "91vh" }}
      bg="#18181b"
      bgImage="linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.5))"
    >
      <Flex direction="column" p={4}>
        <Flex
          direction="column"
          justifyItems={navSize == "large" ? "flex-start" : "flex-end"}
        >
          {TopNav({ handleSizeChange, navSize })}
          <Spacer />
          {Nav({ navSize })}
          
        </Flex>
      </Flex>
      {/* {<AvatarNav />} */}
    </Box>
  );
};

export default Navbar;
