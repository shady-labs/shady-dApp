import { Flex, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const TrackDetails = ({ track }) => {
  
	return (
  
    <Flex align="center" gap={{ base: 2, md: 4 }}>
      <Image
        src={track?.coverImage}
        alt={track?.title}
        objectFit="cover"
        w={{ base: "2rem", md: "3rem" }}
        h={{ base: "2rem", md: "3rem" }}
        rounded="lg"
      />
      <Flex direction="column" align="flex-start">
        <Text
          textAlign="left"
          fontSize={{ base: "sm", md: "md" }}
          noOfLines={1}
        >
          {track?.title}
        </Text>
        <Link to={`/artist/${track?.artistes}`}>
          <Text
            textAlign="left"
            fontSize={{ base: "xs", md: "sm" }}
            color="zinc.500"
            noOfLines={{ base: 1, md: undefined }}
          >
            {track?.artistes}
          </Text>
        </Link>
      </Flex>
    </Flex>
  );
};

export default TrackDetails;
