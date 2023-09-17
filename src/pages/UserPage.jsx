import {
  Box,
  Flex,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";

const UserPage = () => {

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
          <Box minWidth="14rem" h="14rem">
            <Image
              src={
                "https://img.freepik.com/premium-photo/gorilla-wearing-pair-headphones-with-purple-background_962508-4153.jpg"
              }
              w="full"
              h="full"
              objectFit="cover"
              rounded="lg"
            />
          </Box>
          <Box>
            <Heading
              as="h1"
              fontSize={{ base: "lg", md: "3xl" }}
              color="accent.light"
              mb={4}
              fontWeight={600}
            >
              A Shady User
            </Heading>
            <Text
              fontSize={{ base: "sm", md: "md" }}
              maxW="full"
              color="zinc.300"
            >
              I am Awesome!
            </Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default UserPage;
