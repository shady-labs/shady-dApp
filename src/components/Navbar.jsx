import { NavLink } from "react-router-dom";
import WalletButton from "./WalletButton";

import {
	Box,
	Button,
	Flex,
  Image,
  Avatar,
  Divider,
  
} from "@chakra-ui/react";

import {
  FiHome,
  FiGrid,
  FiSearch,
  FiBarChart2,
  FiUpload,
  FiSettings
} from "react-icons/fi";


const Navbar = () => {
	return (
    <Box
      position="fixed"
      top={0}
      left={0}
      zIndex={30}
      minW={{ base: "20", md: "12rem", lg: "16rem", xl: "15rem" }}
      minH={{ base: "5rem", md: "88vh" }}
      bg="#18181b"
      bgImage="linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.5))"
    >
      <Flex direction="column" p={4}>
          <NavContent />
      </Flex>
    </Box>
  );
};

export const NavContent = () => {
  return (
    <Flex direction="column">
      {TopNav}
      {MidNav}
      <Divider size="xl" />
      {BottomNav}
    </Flex>
  );
};


const TopNav = (
  <Flex direction="row" justifyContent={"space-between"}>
    <Box>
      <NavLink to="/home">
        <Image h="60px" borderRadius="full" src="logo.svg" />
      </NavLink>
    </Box>
    <Box mt={3.5}>
      <NavLink to="/user">
        <Avatar
          size="sm"
          name="Dharampal"
          src="https://img.freepik.com/premium-photo/gorilla-wearing-pair-headphones-with-purple-background_962508-4153.jpg"
        />
      </NavLink>
    </Box>
  </Flex>
);

const MidNav = (
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
          <FiHome size={20} color="white" />
          <span>Home</span>
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
          <span>Search</span>
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
          <span>Browse</span>
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
          <span>Library</span>
        </Button>
      )}
    </NavLink>
  </Flex>
);


const BottomNav = (
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
          <span>Upload Track</span>
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
          <span>Settings</span>
        </Button>
      )}
    </NavLink>
    <WalletButton />
  </Flex>
);

export default Navbar;
