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
      minW={{ base: "8rem", md: "13rem" }}
      pb={4}
      overflow="hidden"
      role="group"
      bgGradient="linear(to-r, rgba(128, 128, 128, 0.2), rgba(0, 0, 0, 1))" // Add linear gradient
      backdropFilter="blur(10px)" // Add backdrop filter for blur effect
    >
      <Box
        cursor="pointer"
        h={{ base: "8rem", md: "14rem" }}
        mt={5}
        mb={1}
        overflow="hidden"
        position="relative"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          w="90%" // Smaller width than the outermost box
          h="90%" // Smaller height than the outermost box
          position="relative"
          onClick={playSong}
          borderColor={"zinc.500"}
          borderWidth={0.5}
          borderRadius={"lg"}
          /* borderBottomWidth={0.5}
          borderRightWidth={0.5} */
        >
          <Image
            src={song?.coverImage}
            alt={song?.title}
            w="full"
            h="full"
            objectFit="cover" // Accept the image's aspect ratio
            rounded="lg"
          />
          <Box
            _groupHover={{ opacity: 1 }}
            opacity={0}
            transition="0.5s ease"
            display="flex"
            alignItems="center"
            justifyContent="center"
            /* bg="blackAlpha.700" */
            backdropFilter="blur(2px)" // Add backdrop filter for blur effect
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
                <AiFillPauseCircle color="inherit" size={50} />
              ) : (
                <AiFillPlayCircle color="inherit" size={50} />
              )}
            </Button>
          </Box>
        </Box>
      </Box>
      <Flex gap={2} justify="space-between">
        <Box px={3}>
          <Link to={`/${song?.artists[0]}/song/${song?.title}`}>
            <Heading
              as="h5"
              fontSize={{ base: "sm", md: "md" }}
              noOfLines={1}
              fontWeight={400}
              /* color={"zinc.400"} */
            >
              {song?.title}
            </Heading>
          </Link>
          <Link to={`/artist/${song?.artists[0]}`}>
            <Text
              fontSize={{ base: "xs", md: "md" }}
              color="zinc.400"
              noOfLines={1}
            >
              {song?.artists.join(", ")}
            </Text>
          </Link>
        </Box>
      </Flex>
    </Box>
  );
};

export default SongCard;
