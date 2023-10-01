import { useEffect, useState } from "react";
import SongCard from "../components/SongCard";
import { Box, Flex, Grid, Heading, Text } from "@chakra-ui/react";
import { getAllTracks } from "../graphql/query/getAllTracks";


const BrowsePage = () => {
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
    <Box
      p={6}
      pb={32}
      pt={{ base: 20, md: 6 }}
      pl={{ base: 4, md: 14, xl: 0 }}
      minH="100vh"
    >
      <Box mb={6}>
        <Heading
          fontSize={{ base: "lg", md: "2xl" }}
          fontWeight="semibold"
          mb={{ base: 1, md: 3 }}
        >
          Welcome to a Shady World
        </Heading>
        <Text fontSize="sm" color="zinc.400">
          Discover interesting songs
        </Text>
      </Box>
      <Grid
        templateColumns={{
          base: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
          xl: "repeat(5, 1fr)",
        }}
        gap={{ base: 3, md: 6 }}
      >
        {allTracks.map((track) => (
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
        ))}
      </Grid>
    </Box>
  );
};

export default BrowsePage;
