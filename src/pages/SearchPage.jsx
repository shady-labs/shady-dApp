import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Grid,
  GridItem,
  Image,
  SimpleGrid,
} from "@chakra-ui/react";
import Search from "../components/Search";
import {
  searchBarAutoComplete,
  searchTrackByArtistName,
} from "../graphql/query/searchBarAutoComplete";
import LoadingSkeleton from "../components/LoadingSkeleton";
import { useParams, useNavigate } from "react-router-dom";
import ArtisteSong from "../components/ArtisteSong";
import ArtistCardAlt from "../components/ArtistCardAlt";
import Footer from "../components/Footer";

const SearchPage = () => {
  const { inputQuery } = useParams();
  const [searchQuery, setSearchQuery] = useState([]);
  const [artistSearchResults, setArtistSearchResults] = useState([]);
  const [trackSearchResults, setTrackSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTopCharts, setIsTopCharts] = useState(true);
  const [isNoResults, setIsNoResults] = useState(false);
  const [fetched, setFetched] = useState(false);
  const [topArtists, setTopArtists] = useState([
    {
      _id: "",
      name: "loading...",
      image: "loading...",
      url: "loading...",
    },
  ]);
  const [setTrackofArtistResult, setSetTrackofArtist] = useState([
    {
      _id: "",
      name: "loading...",
      mage: "loading...",
      url: "loading...",
      artistId: [],
      artistName: [],
      genre: [],
      duration: 1,
    },
  ]);
  const [setArtistofTrackResult, setSetArtistofTrack] = useState([
    {
      _id: "",
      name: "loading...",
      image: "loading...",
      url: "loading...",
      artistId: [],
      artistName: [],
      genre: [],
      duration: 1,
    },
  ]);
  const [topTracks, setTopTracks] = useState([
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
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Search Query: ", inputQuery);
    if (inputQuery) {
      handleQuery(inputQuery);
    }
  }, []);

  const handleQuery = async (query) => {
    setSearchQuery(query);
    console.log("Search Query: ", query);
    setIsLoading(true);
    if (query != "" && query != null && query != " ") {
      navigate("/search/" + query);
      await searchBarAutoComplete(query).then((res) => {
        //console.log("Search result: ", res)
        if (
          res[0].length == 0 &&
          res[1].length == 0 &&
          res[2].length == 0 &&
          res[3].length == 0
        ) {
          setIsNoResults(true);
        } else {
          setTrackSearchResults(res[0]);
          setArtistSearchResults(res[1]);
          setSetTrackofArtist(res[3]);
          setSetArtistofTrack(res[2]);
          console.log("Track Search Results: ", trackSearchResults);
          setIsNoResults(false);
        }
        setIsTopCharts(false);
        setIsLoading(false);
      });
    } else {
      navigate("/search");
      setIsLoading(false);
      if (inputQuery) {
        setIsTopCharts(false);
      }
      // setIsTopCharts(true);
    }
  };

  return (
    <Box bg="#000" minH="100vh" p={4}>
      <Search
        handleQuery={handleQuery}
        isSearchPage={true}
        inputQuery={inputQuery}
      />
      <Flex direction="column" minH="25rem" justify="center">
        <Heading p={2} align="center">
          Search Your Jam!
        </Heading>
        {isLoading ? (
          <LoadingSkeleton />
        ) : isTopCharts ? (
          <></>
        ) : isNoResults ? (
          <Text color="zinc.300">No Results</Text>
        ) : (
          <>
            <Box mt={12}>
              <Heading
                as="h3"
                pb={5}
                fontSize={{ base: "lg", md: "xl" }}
                fontWeight={500}
              >
                Songs
              </Heading>

              <SimpleGrid columns={3} gap={4}>
                {trackSearchResults.map((track) => (
                  <ArtisteSong
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
              </SimpleGrid>
            </Box>

            <Box mt={12}>
              <Heading
                as="h3"
                pb={5}
                fontSize={{ base: "lg", md: "xl" }}
                fontWeight={500}
              >
                Artists
              </Heading>

              {
                <Flex direction="column">
                  <SimpleGrid columns={2} gap={1}>
                    {artistSearchResults.slice(0, 6).map((artist) => (
                      <>
                        <ArtistCardAlt key={artist._id} artist={artist} />
                      </>
                    ))}
                  </SimpleGrid>
                </Flex>
              }
            </Box>

            <Box mt={12}>
              <Heading
                as="h3"
                pb={5}
                fontSize={{ base: "lg", md: "xl" }}
                fontWeight={500}
              >
                Songs by {inputQuery}
              </Heading>

              <SimpleGrid columns={3} gap={4}>
                {setTrackofArtistResult.map((track) => (
                  <ArtisteSong
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
              </SimpleGrid>
            </Box>

            {/* <Box mt={12}>
              <Heading
                as="h3"
                pb={5}
                fontSize={{ base: "lg", md: "xl" }}
                fontWeight={500}
              >
                Artists
              </Heading>

              <SimpleGrid columns={3} gap={4}>
                {artistSearchResults.map((artist) => (
                  <ArtisteSong
                    key={artist._id}
                  />
                ))}
              </SimpleGrid>
            </Box> */}

            {/* <Box mt={12}>
              <Heading
                as="h3"
                pb={5}
                fontSize={{ base: "lg", md: "xl" }}
                fontWeight={500}
              >
                Artists
              </Heading>
              {
                <Flex direction="column">
                  {setArtistofTrackResult.slice(0, 5).map((artist) => (
                    <>
                      <ArtistCardAlt key={artist._id} artist={artist} />
                    </>
                  ))}
                </Flex>
              }
            </Box> */}
          </>
        )}
      </Flex>
      <GridItem>
        <Footer />
      </GridItem>
    </Box>
  );
};

export default SearchPage;
