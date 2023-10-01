import HomeHero from "../components/HomeHero";
import SmallSection from "../components/SmallSection";
import TopCharts from "../components/TopCharts";
import Categories from "../components/Categories";
import Search from "../components/Search";
import { Grid, GridItem, Hide } from "@chakra-ui/react";
import Artistes from "../components/Artistes";
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
				{/* <Search /> */}
				<HomeHero />
				<TrackSection title="New Releases" />
				<ArtistSection/>
				{/* <SmallSection title="New Releases" endpoint="/songs/releases" /> */}
				{/* <Artistes />
				
				<SmallSection title="Popular Around You" endpoint="/songs/top" /> */}
			</GridItem>
			{/* <GridItem colSpan={3} p={4}>
				<TopCharts />
				<Hide below="md">
					<Categories />
				</Hide>
			</GridItem> */}
		</Grid>
	);
};

export default HomePage;
