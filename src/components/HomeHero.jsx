import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  IconButton,
  useBreakpointValue,
} from "@chakra-ui/react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";

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
};

const CARDS = [
  "./backgroundShadyBanner.jpeg",
  "https://images.unsplash.com/photo-1612852098516-55d01c75769a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60",
  "https://images.unsplash.com/photo-1627875764093-315831ac12f7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60",
  "https://images.unsplash.com/photo-1571432248690-7fd6980a1ae2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60",
];

const HomeHero = () => {
  const [slider, setSlider] = useState(null);
  const top = useBreakpointValue({ base: "90%", md: "40%" });
  const side = useBreakpointValue({ base: "30%", md: "10px" });

  return (
    <Box position={"relative"} height={"600px"} width="97%" overflow={"hidden"}>
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
      {/* Left Icon */}
      <IconButton
        aria-label="left-arrow"
        colorScheme="purple"
        opacity={0.8}
        borderRadius="full"
        position="absolute"
        left={side}
        top={top}
        transform={"translate(0%, -50%)"}
        zIndex={2}
        onClick={() => slider?.slickPrev()}
      >
        <BiLeftArrowAlt />
      </IconButton>
      {/* Right Icon */}
      <IconButton
        aria-label="right-arrow"
        colorScheme="purple"
        opacity={0.8}
        borderRadius="full"
        position="absolute"
        right={side}
        top={top}
        transform={"translate(0%, -50%)"}
        zIndex={2}
        onClick={() => slider?.slickNext()}
      >
        <BiRightArrowAlt />
      </IconButton>
      {/* Slider */}
      <Slider {...SLIDER_SETTINGS} ref={(slider) => setSlider(slider)}>
        {CARDS.map((url, index) => (
          <Box
            key={index}
            as={motion.div}
            initial="initial"
            animate="animate"
            height="56vh"
            width="97%"
            bg="#810CA8"
            // h={96}
            rounded="lg"
            pos="relative"
            backgroundImage={`url(${url})`}
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
        ))}
      </Slider>
    </Box>
  );
};

export default HomeHero;
