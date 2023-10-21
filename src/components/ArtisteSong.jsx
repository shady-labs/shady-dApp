import { Box, Button, Flex, Hide, Image, Text } from "@chakra-ui/react";
import { AiFillPlayCircle } from "react-icons/ai";
import { useSelector } from "react-redux";
import { BsSoundwave } from "react-icons/bs";
import { convertToMins } from "../utils";

const ArtisteSong = ({ song, handlePlay }) => {
  const { currentTrack, isPlaying } = useSelector((state) => state.player);
  const isCurrentTrack = currentTrack?._id === song?._id;
  const playSong = () => {
    handlePlay(song);
  };

  return (
    <>
      <Flex
        align="center"
        justify="space-between"
        py={2}
        px={{ base: 1, md: 3 }}
        w="full"
        bg="zinc.900"
        rounded="lg"
      >
        <Flex gap={{ base: 2, md: 4 }} align="center">
          <Image
            src={song?.trackImage}
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
            <Text color="zinc.400" fontSize={{ base: "xs", md: "sm" }}>
              {song?.artistsName.join(", ")}
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
    </>
  );
};

export default ArtisteSong;
