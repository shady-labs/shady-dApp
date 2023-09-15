import { BiMenuAltRight, BiMusic } from "react-icons/bi";
import {
  AiFillHeart,
  AiFillHome,
  AiFillUpCircle,
} from "react-icons/ai";
import { TiTimes } from "react-icons/ti";
import { HiViewGrid } from "react-icons/hi";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { MdSettings } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import {
	Box,
	Button,
	Divider,
	Flex,
	Heading,
	Hide,
	Show,
	Text,
  Spacer
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/slices/userSlice";
import { resetPlayer } from "../redux/slices/playerSlice";
import { useEffect, useState } from "react";

// rainbowkit and wagmi imports
import ConnectWallet from "./ConnectWallet";

const DesktopNav = () => {
	return (
		<Box
			position="fixed"
			top={0}
			left={0}
			zIndex={30}
			minW={{ base: "20", md: "12rem", lg: "16rem", "xl": "15rem" }}
			minH={{ base: "5rem", md: "100vh" }}
			bg="black">
			<Flex direction="column" minH="100vh" p={4}>
				<NavContent />
			</Flex>
		</Box>
	);
};

export const NavContent = () => {
	const { user } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// const handleLogout = () => {
	// 	dispatch(resetPlayer());
	// 	dispatch(logoutUser());
	// 	navigate("/auth/login");
	// };

	// const gotoLogin = () => {
	// 	dispatch(resetPlayer());
	// 	navigate("/auth/login");
	// };
  
  // const handleUpload = () => {
	// 	dispatch(resetPlayer());
	// 	navigate("/upload");
	// };

	return (
    <Flex direction="column">
      <Box>
        <Flex direction="column" gap={2} mt={3}>
          <NavLink to="/home">
            {({ isActive }) => (
              <Button
                bg={isActive ? "accent.main" : "transparent"}
                _hover={
                  isActive ? { opacity: 0.8 } : { bg: "accent.transparent" }
                }
                rounded="base"
                display="inline-flex"
                alignItems="center"
                justifyContent="flex-start"
                gap={6}
                py={6}
                px={4}
                w="full"
              >
                <AiFillHome size={20} color="white" />
                <span>Home</span>
              </Button>
            )}
          </NavLink>
          <NavLink to="/library">
            {({ isActive }) => (
              <Button
                bg={isActive ? "accent.main" : "transparent"}
                _hover={
                  isActive ? { opacity: 0.8 } : { bg: "accent.transparent" }
                }
                rounded="base"
                display="inline-flex"
                alignItems="center"
                justifyContent="flex-start"
                gap={6}
                w="full"
                py={6}
                px={4}
              >
                <HiViewGrid size={20} color="white" />
                <span>Explore</span>
              </Button>
            )}
          </NavLink>
          <NavLink to="/favorites">
            {({ isActive }) => (
              <Button
                bg={isActive ? "accent.main" : "transparent"}
                _hover={
                  isActive ? { opacity: 0.8 } : { bg: "accent.transparent" }
                }
                rounded="base"
                display="inline-flex"
                alignItems="center"
                justifyContent="flex-start"
                gap={6}
                w="full"
                py={6}
                px={4}
              >
                <AiFillHeart size={20} color="white" />
                <span>Favorites</span>
              </Button>
            )}
          </NavLink>
          <NavLink to="/upload">
            {({ isActive }) => (
              <Button
                bg={isActive ? "accent.main" : "transparent"}
                _hover={
                  isActive ? { opacity: 0.8 } : { bg: "accent.transparent" }
                }
                rounded="base"
                display="inline-flex"
                alignItems="center"
                justifyContent="flex-start"
                gap={6}
                w="full"
                py={6}
                px={4}
              >
                <AiFillUpCircle size={20} color="#fff" />
                <span>Upload Track</span>
              </Button>
            )}
          </NavLink>
        </Flex>
      </Box>

      <Divider
        bg="#C147E9"
        border="0"
        mt={{ base: 1, md: 2, lg: 3 }}
        h="1px"
        mb={4}
      />
      {/* <Divider
        bg="#000"
        border="0"
        mt="150%"
        h="1px"
        mb={4}
      /> */}
      <Box>
        <Flex direction="column" gap={2} mt={3}>
          {({ isActive }) => (
            <Button
              bg={isActive ? "accent.main" : "transparent"}
              _hover={
                isActive ? { opacity: 0.8 } : { bg: "accent.transparent" }
              }
              rounded="base"
              display="inline-flex"
              alignItems="center"
              justifyContent="flex-start"
              gap={6}
              w="full"
              py={6}
              px={4}
            >
              <ConnectWallet />
            </Button>
          )}

          <NavLink to="/settings">
            {({ isActive }) => (
              <Button
                bg={isActive ? "accent.main" : "transparent"}
                _hover={
                  isActive ? { opacity: 0.8 } : { bg: "accent.transparent" }
                }
                rounded="base"
                display="inline-flex"
                alignItems="center"
                justifyContent="flex-start"
                gap={6}
                w="full"
                py={6}
                px={4}
              >
                <MdSettings size={20} color="white" />
                <span>Settings</span>
              </Button>
            )}
          </NavLink>

          {/* User Profile (Topic to Discuss) */}

          {/* <NavLink to="/settings">
            {({ isActive }) => (
              <Button
                bg={isActive ? "accent.main" : "transparent"}
                _hover={
                  isActive ? { opacity: 0.8 } : { bg: "accent.transparent" }
                }
                rounded="base"
                display="inline-flex"
                alignItems="center"
                justifyContent="flex-start"
                gap={6}
                w="full"
                py={6}
                px={4}
              >
                <FaUser size={20} color="white" />
                <span>User Profile</span>
              </Button>
            )}
          </NavLink> */}
        </Flex>
      </Box>
    </Flex>
  );
};

const Navbar = () => {
	return (
		<>
			<Show above="md">
				<DesktopNav />
			</Show>
		</>
	);
};

export default Navbar;
