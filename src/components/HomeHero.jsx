import { Link } from "react-router-dom";
import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import Slider from "react-slick";
import { motion } from "framer-motion";

const SLIDER_SETTINGS = {
  dots: false,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 3000,
  slidesToShow: 1,
  slidesToScroll: 1,
  pauseOnHover: true,
};

const HomeHero = () => {
  return (
    <Box position={"relative"} height="40vh" width="97%" overflow={"hidden"}>
      {/* CSS files for react-slick */}
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />
      {/* Slider */}
      <Slider {...SLIDER_SETTINGS}>
        <Box
          as={motion.div}
          initial="initial"
          animate="animate"
          height="40vh"
          width="97%"
          bg="#810CA8"
          rounded="lg"
          pos="relative"
          backgroundImage={"./backgroundShadyBanner.jpeg"}
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
                The Decentralised Music Streaming Platform
              </Text>
              <Link to="/browse">
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
        <Box
          as={motion.div}
          initial="initial"
          animate="animate"
          height="40vh"
          width="97%"
          bg="#810CA8"
          rounded="lg"
          pos="relative"
          backgroundImage={"./backgroundShadyBanner2.JPG"}
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
                Stream Indie Music
              </Heading>
              <Text fontSize={{ base: "sm", md: "md" }} w="80%">
                Newer perspective to Artist Revenue & Appreciation.
              </Text>
              <Link to="/search">
                <Button
                  bg="zinc.100"
                  color="zinc.800"
                  fontSize={{ base: "sm", md: "md" }}
                  py={{ base: 3, md: 5 }}
                  px={{ base: 5, md: 8 }}
                  mt={4}
                >
                  Tune In
                </Button>
              </Link>
            </Box>
          </Flex>
        </Box>
        <Box
          as={motion.div}
          initial="initial"
          animate="animate"
          height="40vh"
          width="97%"
          bg="#810CA8"
          rounded="lg"
          pos="relative"
          backgroundImage={"./backgroundShadyBanner3.JPG"}
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
                Mint Tracks
              </Heading>
              <Text fontSize={{ base: "sm", md: "md" }} w="80%">
                Get partial rights your favorite track using NFTs.
              </Text>
              <Link to="/upload">
                <Button
                  bg="zinc.100"
                  color="zinc.800"
                  fontSize={{ base: "sm", md: "md" }}
                  py={{ base: 3, md: 5 }}
                  px={{ base: 5, md: 8 }}
                  mt={4}
                >
                  Mint Now
                </Button>
              </Link>
            </Box>
          </Flex>
        </Box>
      </Slider>
    </Box>
  );
};

export default HomeHero;
