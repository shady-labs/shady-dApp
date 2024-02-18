import { Box, Button, Flex, Hide, Image, Text } from "@chakra-ui/react";
import { AiFillPlayCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { BsSoundwave } from "react-icons/bs";
import { convertToMins } from "../utils";
import {
  setCurrentTrack,
  setPlaying,
  setTrackList,
} from "../redux/slices/playerSlice";
import { motion } from "framer-motion";
import { fadeInUp } from "../theme/motionVariants";
import { Link } from "react-router-dom";

const ArtisteSong = ({ song, handlePlay }) => {
  const dispatch = useDispatch();
  const { currentTrack, isPlaying } = useSelector((state) => state.player);

  const playSong = () => {
    dispatch(setCurrentTrack(song));
    dispatch(setTrackList({ list: [song] }));
    dispatch(setPlaying(true));
  };

  const isCurrentTrack = currentTrack?._id === song?._id;

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
                  <Text
                    fontSize="xs"
                    fontWeight={600}
                    color="accent.main"
                    ml={2}
                  >
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
          </Hide>
        </Flex>
      </Flex>
    //</Link>
  );
};

export default ArtisteSong;
