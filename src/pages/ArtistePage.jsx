import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Text,
  Spacer,
} from "@chakra-ui/react";
import { useState } from "react";

import ArtisteSong from "../components/ArtisteSong";
import { BsFillPlayFill } from "react-icons/bs";
import { MdErrorOutline } from "react-icons/md";
import { useDispatch } from "react-redux";
import { playTrack, setTrackList, PushTrackList, setCurrentTrack, setPlaying } from "../redux/slices/playerSlice";
import LoadingSkeleton from "../components/LoadingSkeleton";
import { gql, useQuery } from "@apollo/client";
import { searchTrackByArtistName } from "../graphql/query/searchBarAutoComplete";
import Header from "../components/Header";
import { Search } from "../components/SearchHeader";
import ArtistModal from "../components/ArtistModal";
import { LoginView } from "../components/signInButton";

const ArtistePage = () => {
  const { artistName } = useParams();
  const dispatch = useDispatch();

  const Artist = gql`
    query GetArtistsByName($name: String) {
      getArtistsByName(name: $name) {
        _id
        name
        image
        description
        genre
        tracksId
        tracksName
      }
    }
  `;
  const [songs, setSongs] = useState([]);
  const [playerTracks, setPlayerTracks] = useState([
    {
      artistes: ['Drake'],
      coverImage: "abcd",
      duration: 123,
      likes: {
        "asdjasdads": true,
        "sdjasdk": true,
        "fedwesnjm": true,
      },
      songUrl: "temp",
      title: "titel",
      type: "Song",
      _v: 0,
      _id: "id"
    }
  ]);
  const { loading, error, data } = useQuery(Artist, {
    variables: {
      name: artistName,
    },
  });

  if (loading) return console.log("loading");
  if (error) return `Error! ${error}`;
  if (data) {
    console.log("data", data);
    
    // if (trackError) return `Track Error! ${error}`;
    // if (trackData) {
    //   data.artist.songs = trackData.getTracksByArtistId;
    // }
    searchTrackByArtistName(artistName).then((res) => {
      // data.artist.songs = res;
      setSongs(res);
      console.log("res", res);
    });
    console.log(data.getTracksByArtistId);
  }

  const handlePlay = () => {
    playerTracks.splice(0, playerTracks.length)
    {songs?.map((song) => (
      //  handlePlay={onSongPlay}
      console.log("playerTracks: ",playerTracks),
      playerTracks.push(
        {
          _id: song._id,
          title: song.name,
          artistes: song.artistsName,
          coverImage: song.trackImage,
          songUrl: song.trackUrl,
          duration: song.duration,
          likes: {
            "64b27271cbbc5494326b3f5d": true,
            "64be80fb0e97b62cf659af8c": true,
            "64e63265d233402a9f2edee9": true,
          },
          type: "Song",
          __v: 0,
        }
      )
    ))}
    // dispatch(setCurrentTrack(playerTracks[0]))
    dispatch(setTrackList({ list: playerTracks}));
    dispatch(setCurrentTrack(playerTracks[0]))
    dispatch(setPlaying(true))
    // dispatch(playTrack(data.artist?.songs[0]));
  };

  const onSongPlay = (song) => {
    const index = data.artist?.songs.findIndex((s) => s._id == song._id);

    dispatch(setTrackList({ list: data.Artist?.songs, index }));
    dispatch(playTrack(song));
  };

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return (
      <Flex align="center" justify="center" minH="100vh">
        <Flex direction="column" align="center" color="accent.light">
          <MdErrorOutline color="inherit" size={32} />
          <Text color="zinc.400" textAlign="center">
            An error occured
          </Text>
        </Flex>
      </Flex>
    );
  }

  return (
    <GridItem
      sx={styles.background}
      backgroundImage={data.getArtistsByName[0].image}
    >
      <Box >
        <Box
          minH="100vh"
          p={4}
          pb={32}
          pt={{ base: 16, md: 4 }}
          sx={styles.section}
        >
          <Box maxW={"97%"}>
            <Flex direction="row" justifyContent={"space-between"} pt={2}>
              <Heading
                as="h1"
                fontSize={{ base: "3xl", md: "3xl" }}
                color="accent.light"
                fontWeight={200}
                // pl={2}
                
              >
                <Search />
              </Heading>
              <Box dir="Row" pb={4}>
                <Flex>
                  <ArtistModal />
                  <Spacer display={{ base: "none", md: "block" }} mx={2} />
                  {/* <DynamicWidget variant="modal" /> */}
                  <LoginView />
                </Flex>
              </Box>
            </Flex>
          </Box>
          <Box pt={6}>
            <Flex
              maxW="full"
              direction={{ base: "column", md: "row" }}
              align="flex-start"
              justify="flex-start"
              gap={5}
            >
              <Box minWidth="14rem" h="14rem">
                <Image
                  src={data.getArtistsByName[0].image}
                  alt={data.getArtistsByName[0].name}
                  w="full"
                  h="full"
                  objectFit="cover"
                  rounded="3xl"
                />
              </Box>
              <Box>
                <Text
                  fontSize={{ base: "sm", md: "lg" }}
                  maxW="full"
                  color="zinc.300"
                >
                  Introducing,
                </Text>
                <Heading
                  as="h1"
                  fontSize={{ base: "lg", md: "6xl" }}
                  color="accent.light"
                  mb={4}
                  fontWeight={600}
                >
                  {data.getArtistsByName[0].name}
                </Heading>
                <Text
                  fontSize={{ base: "lg", md: "lg" }}
                  maxW="full"
                  color="zinc.300"
                  fontWeight={600}
                >
                  {data.getArtistsByName[0].description}
                </Text>
              </Box>
            </Flex>
          </Box>
          <Box mt={12}>
            <Flex align="center" gap={6} mb={4}>
              <Heading
                as="h3"
                fontSize={{ base: "lg", md: "xl" }}
                fontWeight={600}
              >
                Songs
              </Heading>
              <Button
                onClick={handlePlay}
                display="inline-flex"
                alignItems="center"
                variant="unstyled"
                bg="accent.light"
                fontSize={{ base: "sm", md: "md" }}
                color="white"
                rounded="2rem"
                py={1}
                px={4}
                leftIcon={<BsFillPlayFill size={20} />}
              >
                Play All
              </Button>
            </Flex>

            <Divider w="full" h="1px" border="0" bg="zinc.600" mb={3} />

            <Flex direction="column" gap={4}>
              {songs?.map((song) => (
                //  handlePlay={onSongPlay}

                <ArtisteSong
                  key={song._id}
                  song={{
                    _id: song._id,
                    title: song.name,
                    artistes: song.artistsName,
                    coverImage: song.trackImage,
                    songUrl: song.trackUrl,
                    duration: song.duration,
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
            </Flex>
          </Box>
        </Box>
      </Box>
    </GridItem>
  );
};

const styles = {
  background: {
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    width: "100%",
    height: "35%",
  },
  section: {
    backgroundColor: "transparent", //black --> #090b0c
    backdropFilter: "saturate(60%) blur(40px)",
  },
};

export default ArtistePage;
