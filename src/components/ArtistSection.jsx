import { useEffect, useState } from "react";
import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import ArtistCard from "./ArtistCard";
import { Link } from "react-router-dom";
import { getAllArtists } from "../graphql/query/getAllArtists";

const ArtistSection = () => {
  const [allArtists, setallArtists] = useState([
    {
      _id: "",
      name: "loading...",
      image: "loading...",
      url: "loading...",
    },
  ]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [fetched, setFetched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!fetched) {
      setIsLoading(true);
      getAllArtists().then((res) => {
        setallArtists(res);
        setFetched(true);
        setIsLoading(false);
      });
    }
  }, []);

  return (
    <Box mt={8} width="97%">
      <Flex align="center" justify="space-between" mb={3}>
        <Heading as="h3" fontSize={{ base: "lg", md: "xl" }} fontWeight={500}>
          Top Artists Today
        </Heading>
        <Link to="/artistes">
          <Button
            variant="unstyled"
            color="accent.light"
            fontSize={{ base: "sm", md: "md" }}
            fontWeight={500}
          >
            See more
          </Button>
        </Link>
      </Flex>
      <Flex
        align="stretch"
        overflowX="scroll"
        gap={5}
        mt={3}
        pb={4}
        px={2}
        className="scrollbar_style"
      >
        {allArtists.slice(0, 10).map((artist) => (
          <ArtistCard key={artist._id} artist={artist} />
        ))}
      </Flex>
    </Box>
  );
};

export default ArtistSection;
