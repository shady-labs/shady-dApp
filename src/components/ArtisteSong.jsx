import {
  Box,
  Button,
  Flex,
  Hide,
  Image,
  Text,
  Modal,
  Spacer,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Divider,
  Grid,
  GridItem,
  Stack, HStack, VStack,
} from "@chakra-ui/react";
import { AiFillPlayCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { BsSoundwave } from "react-icons/bs";
import { convertToMins } from "../utils";
import React, { useState } from "react";
import {
  setCurrentTrack,
  setPlaying,
  setTrackList,
} from "../redux/slices/playerSlice";
import { motion } from "framer-motion";
import { fadeInUp } from "../theme/motionVariants";
import { Link } from "react-router-dom";
import CollectModal from "./CollectModal";

const ArtisteSong = ({ song, handlePlay }) => {
  const dispatch = useDispatch();
  const { currentTrack, isPlaying } = useSelector((state) => state.player);

  const playSong = () => {
    dispatch(setCurrentTrack(song));
    dispatch(setTrackList({ list: [song] }));
    dispatch(setPlaying(true));
  };

  const isCurrentTrack = currentTrack?._id === song?._id;

  const { isOpen, onOpen, onClose } = useDisclosure();

  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );

  const [overlay] = React.useState(<OverlayOne />);

  function Feature({ title, desc, ...rest }) {
    return (
      <Box p={5} borderWidth='2px' borderRadius={10} {...rest}>
        <Text fontSize='lg' color='zinc' fontWeight={600}>{title}</Text>
        <Text mt={3}>{desc}</Text>
      </Box>
    )
  }

  return (
    //<Link to={`/${song?.artistes[0]}/song/${song?.title}`}>
    <Flex
      align="center"
      justify="space-between"
      py={2}
      px={{ base: 1, md: 3 }}
      w="full"
      bg="black"
      _hover={{ bg: "zinc.800" }}
      rounded="lg"
      as={motion.div}
      initial="initial"
      animate="animate"
      variants={fadeInUp}
    >
      <Flex gap={{ base: 2, md: 4 }} align="center">
        <Image
          src={song?.coverImage}
          alt={song?.title}
          w={{ base: "3rem", md: "5rem" }}
          h={{ base: "3rem", md: "5rem" }}
          rounded="lg"
          objectFit="cover"
        />
        <Box>
          <Flex align="center" gap={2}>
            <Text fontSize={{ base: "sm", md: "lg" }}>{song?.name}</Text>
            {isCurrentTrack && (
              <Flex align="center" color="accent.main">
                <BsSoundwave size={20} />
                <Text fontSize="xs" fontWeight={600} color="accent.main" ml={2}>
                  Playing
                </Text>
              </Flex>
            )}
          </Flex>
          <Text color="zinc.400" fontSize={{ base: "sm", md: "lg" }}>
            {song?.title}
          </Text>
          <Text color="zinc.400" fontSize={{ base: "sm", md: "sm" }}>
            {song?.artistes}
          </Text>
        </Box>
      </Flex>
      <Flex align="center" gap={3} pr={3}>
        {isCurrentTrack && isPlaying ? null : (
          <Button
            onClick={playSong}
            variant="unstyled"
            color="accent.light"
            fontSize={{ base: 24, md: 36 }}
            p={0}
            display="inline-flex"
            alignItems="center"
            justifyContent="center"
          >
            <AiFillPlayCircle />
          </Button>
        )}
        <Hide below="md">
          <Text fontSize="sm" color="zinc.400">
            {convertToMins(song?.duration)}
          </Text>
          {/* <CollectModal /> */}

          <Button
            //bg="accent.light"
            textColor={"blackAlpha.900"}
            _hover={{ opacity: 0.8 }}
            onClick={async () => {
              <OverlayOne />;
              onOpen();
            }}
          >
            Collect
          </Button>

          <Modal isOpen={isOpen} onClose={onClose} size="xs" isCentered>
            {overlay}

            <ModalContent
              bg="#0c0e13"
              color="white"
              borderRadius="15px" /* outlineColor={"white"} */
            >
              <ModalHeader>Collect this song</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Flex>
                  <Image
                    src={song?.coverImage}
                    alt={song?.title}
                    w={{ base: "3rem", md: "5rem" }}
                    h={{ base: "3rem", md: "5rem" }}
                    rounded="lg"
                    objectFit="cover"
                  />
                  <Spacer />
                  <Box h={100} pt={3.5}>
                    <Text
                      color="zinc.100"
                      fontSize={{ base: "sm", md: "lg" }}
                      align="right"
                    >
                      {song?.title}
                    </Text>
                    <Text
                      color="zinc.100"
                      fontSize={{ base: "sm", md: "sm" }}
                      align="right"
                    >
                      {song?.artistes}
                    </Text>
                  </Box>
                </Flex>
                <Divider my={2} />
                <Flex pt={2.5}>
                  <Text
                    color="zinc.100"
                    fontSize={{ base: "sm", md: "lg" }}
                    fontWeight={600}
                  >
                    NFT Details
                  </Text>
                  <Spacer />
                </Flex>

                <Stack spacing={8} direction='column' pt={4}>
      <Feature
        title='Free Edition'
        desc='The future can be even brighter but a goal without a plan is just a wish'
      />
      <Feature
        title='Limited Edition'
        desc='You deserve good things. With a whooping 10-15% interest rate per annum, grow your savings on your own terms with our completely automated process'
      />
    </Stack>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                  Close
                </Button>
                <Button>Continue</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Hide>
      </Flex>
    </Flex>
    //</Link>
  );
};

export default ArtisteSong;
