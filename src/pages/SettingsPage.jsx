import { Box, Flex, Heading, Text } from "@chakra-ui/react";

const SettingsPage = () => {
  return (
    <Box bg="#000" minH="100vh" p={4}>
      <Flex direction="column" minH="25rem" align="center" justify="center">
        <Heading>Settings</Heading>
        <Text color="zinc.300">Some Shady Task Underway!</Text>
      </Flex>
    </Box>
  );
};

export default SettingsPage;
