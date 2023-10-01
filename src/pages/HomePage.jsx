import HomeHero from "../components/HomeHero";
import { Grid, GridItem } from "@chakra-ui/react";
import TrackSection from "../components/TrackSection";
import ArtistSection from "../components/ArtistSection";

const HomePage = () => {
	return (
		<Grid
			templateColumns={{ base: "1fr", lg: "repeat(8, 1fr)" }}
			minH="100vh"
			pl={{ base: 2, md: 14, lg: 12, xl: 0 }}
			pb={24}
			pt={{ base: 14, md: 4 }}>
			<GridItem colSpan={8} pl={1} pt={3}>
				<HomeHero />
				<TrackSection title="New Releases" />
				<ArtistSection/>
			</GridItem>
		</Grid>
	);
};

export default HomePage;
