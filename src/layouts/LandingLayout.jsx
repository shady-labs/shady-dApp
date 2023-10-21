import { Box, Flex, Heading, Button } from "@chakra-ui/react";
import { useEffect } from "react";
import { BiLogoGithub, BiLogoTwitter, BiMusic } from "react-icons/bi";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

const LandingLayout = () => {
  return (
    <Box
      bg="zinc.950"
      h="full"
      minH="100vh"
      w="full"
      minW="100vw"
      p={4}
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      background="url('/ShadyLandingBackground.png')"
      backgroundSize="100% 100%"
      backgroundPosition="bottom"
      backgroundRepeat="no-repeat"
    >
      <Button
        size="lg"
        variant="solid"
        color={"white"}
        borderRadius={35}
        bgColor={"#810CA8"}
        _hover={{
          bg: "#F0F0F0",
          color: "#000000",
          transform: "scale(1.05)",
        }}
        _active={{
          bg: "#810CA8",
        }}
        onClick={() => {
          window.location.href = "/home";
        }}
      >
        Stream Shady
      </Button>
      <Flex
        w="full"
        h="10vh"
        justifyContent="space-evenly"
        alignItems="center"
        position="absolute"
        bottom="0"
        left="0"
      >
        <h1></h1>
        <h1></h1>
        <h1></h1>
        <h1></h1>

        <Box
          w="5vh"
          h="5vh"
          display="flex"
          justifyContent="center"
          alignItems="center"
          borderRadius="100%"
          bgColor={"#810CA8"}
          _hover={{
            bg: "#F0F0F0",
            color: "#000000",
            transform: "scale(1.05)",
          }}
          _active={{
            bg: "white",
          }}
          onClick={() => {
            window.location.href = "https://twitter.com/theshadylabs";
          }}
        >
          <BiLogoTwitter
            size="1.5rem"
            color="black"
            _hover={{
              color: "black",
              transform: "scale(1.05)",
            }}
            _active={{
              color: "black",
              bg: "#810CA8",
            }}
          />
        </Box>
        <Box
          w="5vh"
          h="5vh"
          display="flex"
          justifyContent="center"
          alignItems="center"
          borderRadius="100%"
          bgColor={"#810CA8"}
          _hover={{
            bg: "#F0F0F0",
            color: "#000000",
            transform: "scale(1.05)",
          }}
          _active={{
            bg: "white",
          }}
          onClick={() => {
            window.location.href = "https://github.com/shady-labs";
          }}
        >
          <BiLogoGithub size="1.5rem" color="black" />
        </Box>
        <h1></h1>
        <h1></h1>
        <h1></h1>
        <h1></h1>
      </Flex>
    </Box>
  );
};

export default LandingLayout;
