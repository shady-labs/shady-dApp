import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { fadeInUp } from "../theme/motionVariants";
import {
  setCurrentTrack,
  setPlaying,
  setTrackList,
} from "../redux/slices/playerSlice";
import { AiFillPauseCircle, AiFillPlayCircle } from "react-icons/ai";
import { Link } from "react-router-dom";

const SongCard = ({ song }) => {
  const dispatch = useDispatch();
  const { currentTrack, isPlaying } = useSelector((state) => state.player);

  const playSong = () => {
    dispatch(setCurrentTrack(song));
    dispatch(setTrackList({ list: [song] }));
    dispatch(setPlaying(true));
  };

  const isCurrentTrack = currentTrack?._id === song?._id;

  return (
    <Box
      as={motion.div}
      initial="initial"
      animate="animate"
      variants={fadeInUp}
      rounded="lg"
      bg="zinc.900"
      minW={{ base: "8rem", md: "10rem" }}
      pb={4}
      overflow="hidden"
      role="group"
    >
      <Box
        onClick={playSong}
        cursor="pointer"
        h={{ base: "8rem", md: "10rem" }}
        mb={4}
        overflow="hidden"
        position="relative"
      >
        <Image
          src={song?.coverImage}
          alt={song?.title}
          w="full"
          h="full"
          objectFit="cover" // <-- need to remove this and accept the image's aspect ratio
          roundedTop="base"
          transition="0.5s ease"
          _groupHover={{ transform: "scale(1.1)" }}
        />
        <Box
          _groupHover={{ opacity: 1 }}
          opacity={0}
          transition="0.5s ease"
          display="flex"
          alignItems="center"
          justifyContent="center"
          bg="blackAlpha.700"
          position="absolute"
          top={0}
          left={0}
          w="full"
          h="full"
        >
          <Button
            variant="unstyled"
            display="inline-flex"
            alignItems="center"
            justifyContent="center"
            p={0}
            color="gray.300"
            rounded="full"
          >
            {isPlaying && isCurrentTrack ? (
              <AiFillPauseCircle color="inherit" size={36} />
            ) : (
              <AiFillPlayCircle color="inherit" size={36} />
            )}
          </Button>
        </Box>
      </Box>
      <Flex gap={2} justify="space-between">
        <Box px={2}>
          <Link to={`/${song?.artistes[0]}/song/${song?.title}`}>
            <Heading
              as="h5"
              fontSize={{ base: "sm", md: "md" }}
              noOfLines={1}
              fontWeight={500}
            >
              {song?.title}
            </Heading>
          </Link>
          <Link to={`/artist/${song?.artistes[0]}`}>
            <Text
              fontSize={{ base: "xs", md: "sm" }}
              color="zinc.400"
              noOfLines={1}
            >
              {" "}
              {song?.artistes.join(", ")}{" "}
            </Text>
          </Link>
        </Box>
      </Flex>
    </Box>
  );
};

export default SongCard;
