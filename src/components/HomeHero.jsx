import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { appear } from "../theme/motionVariants";
import { Link } from "react-router-dom";

const HomeHero = () => {
	return (
    <Box
      as={motion.div}
      initial="initial"
      animate="animate"
      height="400px"
      width="77.5vw"
      bg="#810CA8"
      // h={96}
      rounded="lg"
      pos="relative"
      bgImage="url('./backgroundShadyBanner.jpeg')"
      bgSize="cover"
      backdropBlur="8px"
      backdropFilter="auto"
    >
      <Flex
        align="flex-end"
        pos="absolute"
        bottom={0}
        left={0}
        w="full"
        h="full"
        p={4}
        pb={6}
        bgGradient="linear(to-t, zinc.900, transparent)"
      >
        <Box w="full">
          <Heading
            as="h1"
            fontSize={{ base: "2xl", md: "4xl" }}
            fontWeight={600}
            mb={2}
          >
            Welcome to Shady
          </Heading>
          <Text fontSize={{ base: "sm", md: "md" }} w="80%">
            Music Reimagined and Decentralised.
          </Text>
          <Link to="/library">
            <Button
              bg="zinc.100"
              color="zinc.800"
              fontSize={{ base: "sm", md: "md" }}
              py={{ base: 3, md: 5 }}
              px={{ base: 5, md: 8 }}
              mt={4}
            >
              Listen Now
            </Button>
          </Link>
        </Box>
      </Flex>
    </Box>
  );
};

export default HomeHero;
