import { Box, Heading, Text } from "@chakra-ui/react";
const FavoritesPage = () => {
	return (
		<Box
			p={4}
			pb={32}
			minH="100vh"
			pt={{ base: 20, md: 6 }}
			pl={{ base: 4, md: 14, xl: 0 }}>
			<Box mb={6}>
				<Heading
					fontSize={{ base: "lg", md: "2xl" }}
					fontWeight="semibold"
					mb={1}>
					Your Library
				</Heading>
				<Text fontSize="sm" color="zinc.400">
					You will see some of your Favorites here!
				</Text>
			</Box>
		</Box>
	);
};

export default FavoritesPage;
