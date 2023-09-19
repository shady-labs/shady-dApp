import { useEffect, useState } from "react";
import SongCard from "../components/SongCard";
import { AiOutlineLoading } from "react-icons/ai";
import { Box, Flex, Grid, Heading, Text } from "@chakra-ui/react";
import { client } from "../api";

const BrowsePage = () => {
	const [songs, setSongs] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	const fetchSongs = async () => {
		setLoading(true);
		setError(false);
		await client
			.get("/songs")
			.then((res) => {
				setSongs(res.data);
				console.log("res.data: "+res.data)
				songs.map((song) => {
					console.log("songs: "+song);
				});
				setLoading(false);
			})
			.catch(() => {
				setError(true);
				setLoading(false);
			});
	};

	useEffect(() => {
		fetchSongs();
	}, []);

	return (
		<Box
			p={6}
			pb={32}
			pt={{ base: 20, md: 6 }}
			pl={{ base: 4, md: 14, xl: 0 }}
			minH="100vh">
			<Box mb={6}>
				<Heading
					fontSize={{ base: "lg", md: "2xl" }}
					fontWeight="semibold"
					mb={{ base: 1, md: 3 }}>	
						Welcome to a Shady World
				</Heading>
				<Text fontSize="sm" color="zinc.400">
					Discover interesting songs
				</Text>
			</Box>
			{loading && songs.length < 1 && (
				<Flex align="center" justify="center" color="accent.main" minH="20rem">
					<AiOutlineLoading className="spin" size={36} />
				</Flex>
			)}
			<Grid
				templateColumns={{
					base: "repeat(2, 1fr)",
					md: "repeat(3, 1fr)",
					lg: "repeat(4, 1fr)",
					xl: "repeat(5, 1fr)",
				}}
				gap={{ base: 3, md: 6 }}>
				{songs.map((song) => (
					<SongCard key={song._id} song={song} />
				))}
			</Grid>
			{error && (
				<Box>
					<Text>Sorry, an error occured</Text>
				</Box>
			)}
		</Box>
	);
};

export default BrowsePage;
