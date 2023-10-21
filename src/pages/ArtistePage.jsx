import { useParams } from "react-router-dom";
import {
	Box,
	Button,
	Divider,
	Flex,
	Heading,
	Image,
	Text,
} from "@chakra-ui/react";

import ArtisteSong from "../components/ArtisteSong";
import { BsFillPlayFill } from "react-icons/bs";
import { MdErrorOutline } from "react-icons/md";
import { useDispatch } from "react-redux";
import { playTrack, setTrackList } from "../redux/slices/playerSlice";
import LoadingSkeleton from "../components/LoadingSkeleton";
import { gql, useQuery } from "@apollo/client";

const ArtistePage = () => {
  const { name } = useParams();
  const dispatch = useDispatch();
	
	const Artist = gql`
    query Artist($name: String) {
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
  const { loading, error, data } = useQuery(Artist, {
    variables: { name },
  });

  if (loading) return null;
  if (error) return `Error! ${error}`;

  const handlePlay = () => {
    dispatch(setTrackList({ list: data.Artist?.tracksName }));
    dispatch(playTrack(data.Artist?.songs[0]));
  };

	console.log(data.Artist?.tracksName);
	console.log(data.Artist?.image);
  const onSongPlay = (song) => {
    const index = data.Artist?.songs.findIndex((s) => s._id == song._id);

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
    <Box minH="100vh" p={4} pb={32} pt={{ base: 16, md: 4 }}>
      <Box pt={6}>
        <Flex
          maxW="full"
          direction={{ base: "column", md: "row" }}
          align="flex-start"
          justify="flex-start"
          gap={5}
        >
          <Box minWidth="14rem" h="14rem" >
            <Image
              src={"https://i.scdn.co/image/ab676161000051744293385d324db8558179afd9"}
              alt={data.Artist?.name}
              w="full"
              h="full"
              objectFit="cover"
              rounded="3xl"
            />
          </Box>
          <Box>
            <Text
              fontSize={{ base: "sm", md: "md" }}
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
              {/* {data.Artist?.name} */}
              Drake
            </Heading>
            <Text
              fontSize={{ base: "sm", md: "md" }}
              maxW="full"
              color="zinc.300"
            >
              {/* {data.Artist?.bio} */}
							This a rolli not a stopwatch, shit dont ever stop.
            </Text>
          </Box>
        </Flex>
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
            {data.Artist?.songs?.map((song) => (
              <ArtisteSong
                key={song?._id}
                song={song}
                handlePlay={onSongPlay}
              />
            ))}
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default ArtistePage;
