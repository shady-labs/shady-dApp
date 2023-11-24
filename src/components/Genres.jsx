import { Box, Flex, Heading, Image, SimpleGrid } from "@chakra-ui/react";

const genres = [
  {
    id: 1,
    title: "Pop",
    image:
      "https://img.freepik.com/premium-photo/retro-pop-art-dj-board-illustration-abstract-comics-style-music-background_739548-2634.jpg",
  },
  {
    id: 2,
    title: "Chill",
    image:
      "https://www.japannakama.co.uk/wp-content/uploads/2022/03/lo-fi-pixel-art.jpg",
  },
  {
    id: 3,
    title: "Podcast",
    image:
      "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG9kY2FzdHxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 4,
    title: "Romance",
    image:
      "https://assets.classicfm.com/2021/06/most-romantic-classical-music-1613054625-list-handheld-0.jpg",
  },
  {
    id: 5,
    title: "Hip Hop",
    image:
      "https://assets-global.website-files.com/62d691a88df4876c34575a08/6419c4e60759248306448158_how-to-become-a-rapper-a-beginners-guide-og.jpeg",
  },
  {
    id: 6,
    title: "Rock",
    image:
      "https://img.freepik.com/premium-photo/illustration-rock-guitarist-digital-art-ai_800563-5930.jpg",
  },
];

const Genres = () => {
  return (
    <Box mt={12}>
      <Heading as="h3" pb={5} fontSize={{ base: "lg", md: "xl" }} fontWeight={500}>
        Top Genres
      </Heading>

      <SimpleGrid columns={2} gap={4}>
        {genres.map((genre) => (
          <Flex
            key={genre.id}
            align="center"
            justify="center"
            rounded="base"
            pos="relative"
            h={{ base: 24, "2xl": 32 }}
            cursor="pointer"
          >
            <Image
              src={genre.image}
              alt={genre.title}
              pos="absolute"
              left={0}
              top={0}
              rounded="base"
              objectFit="cover"
              h="full"
              w="full"
            />
            <Flex
              align="center"
              justify="center"
              bg="blackAlpha.600"
              pos="relative"
              zIndex={10}
              h="full"
              w="full"
            >
              <Heading as="h4" fontSize="lg" fontWeight={500}>
                {genre.title}
              </Heading>
            </Flex>
          </Flex>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Genres;
