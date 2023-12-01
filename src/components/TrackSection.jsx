import { useEffect, useState } from "react";
import { AiFillPlayCircle, AiOutlineLoading } from "react-icons/ai";
import SongCard from "./SongCard";
import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { getAllTracks } from "../graphql/query/getAllTracks";

const TrackSection = ({ title }) => {
  const [fetched, setFetched] = useState(false);
  const [isLoading, setIsLoading] = useState(false); 
  const [allTracks, setAllTracks] = useState([
    {
      _id: "",
      name: "",
      artistsID: [],
      artistsName: [],
      trackImage: "",
      trackUrl: "",
      genre: [],
      duration: 1,
    },
  ]); 


  useEffect(() => {
  if (!fetched) {
    setIsLoading(true);
    getAllTracks().then((res) => {
    setAllTracks(res);
    setFetched(true);
    setIsLoading(false);
    });
  }
}, []);

  return (
    <Box mt={8} width="97%">
      <Flex align="center" justify="space-between">
        <Flex align="center" gap={3}>
          <Heading as="h3" fontSize={{ base: "lg", md: "xl" }} fontWeight={500}>
            {title}
          </Heading>
          <Box color="accent.main">
            <AiFillPlayCircle size={20} color="inherit" />
          </Box>
        </Flex>
        <Link to="/browse">
          <Button
            variant="unstyled"
            fontSize={{ base: "sm", md: "md" }}
            color="accent.light"
            fontWeight={500}
          >
            See more
          </Button>
        </Link>
      </Flex>
      <Flex
        align="center"
        overflowX="scroll"
        gap={5}
        mt={3}
        pb={4}
        className="scrollbar_style"
      >
        {allTracks.toReversed().slice(0,10).map((track) => (
          <>
            <SongCard
              key={track._id}
              song={{
                _id: track._id,
                title: track.name,
                artistes: track.artistsName,
                coverImage: track.trackImage,
                songUrl: track.trackUrl,
                duration: track.duration,
                likes: {
                  "64b27271cbbc5494326b3f5d": true,
                  "64be80fb0e97b62cf659af8c": true,
                  "64e63265d233402a9f2edee9": true,
                },
                type: "Song",
                __v: 0,
              }}
            />
          </>
        ))}
      </Flex>
    </Box>
  );
};

export default TrackSection;
