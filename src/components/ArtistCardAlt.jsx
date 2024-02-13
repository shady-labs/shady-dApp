import { Box, Button, Flex, Hide, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const ArtistCardAlt = ({ artist }) => {
  return (
    <Link to={`/artist/${artist?.name}`}>
      <Flex
        direction="column"
        align="center"
        p={1}
        _hover={{ transform: "scale(1.05)" }}
        transition="0.5s ease"
      ></Flex>
    <Flex
        align="center"
        justify="space-between"
        py={2}
        px={{ base: 1, md: 3 }}
        w={ 500 }
        bg="zinc.900"
        rounded="lg"
    >
        <Flex gap={{ base: 2, md: 4 }} align="center">
          <Image
            src={artist?.image}
            alt={artist?.name}
            w={{ base: "3rem", md: "5rem" }}
            h={{ base: "3rem", md: "5rem" }}
            rounded="full"
            objectFit="cover"
          />
          <Box>
            <Flex align="center" gap={2}>
              <Text color="zinc.400" fontSize={{ base: "sm", md: "lg" }}>{artist?.name}</Text>
              
            </Flex>
          </Box>
        </Flex>   
      </Flex>
    </Link>
  );
};

export default ArtistCardAlt;
