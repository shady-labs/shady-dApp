import {
	Box,
	Button,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Input,
	InputGroup,
	InputRightElement,
	Spinner,
	Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { MdError } from "react-icons/md";
import { Link } from "react-router-dom";
import { resetPlayer } from "../redux/slices/playerSlice";
import { ToastContainer, toast } from "react-toastify";
import { StoreContent } from "../utils/StoreContent";
import { useDispatch, useSelector } from "react-redux";
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum, base, zora } from 'wagmi/chains';
import { getDefaultWallets, RainbowKitProvider, midnightTheme } from '@rainbow-me/rainbowkit';
import { publicProvider } from 'wagmi/providers/public';
import WalletButton from "../components/ConnectWallet";
import ConnectWallet from "../components/ConnectWallet";



const UploadPage = () => {
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
    const [songName, setSongName] = useState([]);
    const [audio, setAudio] = useState([]);
    const [artistName, setArtistName] = useState([]);
    const [banner, setBanner] = useState([]);
	const { user, token } = useSelector((state) => state.user);

	/* const validateFields = () => {
		if (audio == "" || songName == "" || artistName == "" || banner == "") {
			setError("All fields are required!");
			return false;
		} else {
			setError(null);
			return true;
		}
	}; */

    const notify = (message) => toast(`${message}`);

	/// uploads the audio to the ipfs
	const uploadAudio = async () => {
		try {
		const cid = await StoreContent(audio);
		/* const audioCID = `https://w3s.link/ipfs/${cid}/`;
		console.log(audioCID); */
		console.log("track name: ",audio.name);
		/* notify("Music file uploaded to IPFS"); */
		/* setMusicCID(audioCID);
		await uploadMetadata(banner, name, audioCID, description).then(
			() => {
			uploadToFireStore();
		}); */
		} catch (err) {
		console.log(err);
		/* notify(err); */
		}
	};

	///restrict access logic (WIP)

	/* if (!user) {
		return (
			<Flex align="center" justify="center" h="100vh">
				<Flex direction="column" align="center" gap={4}>
					<Text textAlign="center" color="zinc.500">
						please connect your wallet to upload tracks :)
					</Text>
					<ConnectWallet />
				</Flex>
			</Flex>
		);
	} */

    const handleSubmit = async () => {
    try {
      setLoading(true);
      await uploadAudio();
      // await setTimeout(uploadMetadata(), 5000);
      // await mintNFT();
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
    };

    return (
		<Box minH="calc(100vh - 5rem)" maxW="2xl" mx="auto" p={6}>
			<Box
				bg={{ base: "zinc.950", md: "zinc.900" }}
				rounded="base"
				p={{ base: 2, md: 10 }}>
				<Box mb={8}>
					<Heading fontSize="2xl" color="zinc.200">
						upload
					</Heading>
					<Text fontSize="sm">add your mix to the jam</Text>
				</Box>
				<Flex direction="column" gap={4}>
                    <FormControl>
						<FormLabel fontSize="xs" color="zinc.400">
							song name
						</FormLabel>
						<InputGroup border="1px" borderColor="zinc.600" rounded="base">
							<Input
                                type="text"
								color="zinc.300"
								fontSize="sm"
								value={songName}
								onChange={(e) => setSongName(e.target.value)}
							/>
						</InputGroup>
					</FormControl>
					<FormControl>
						<FormLabel fontSize="xs" color="zinc.400">
							artist
						</FormLabel>
						<InputGroup border="1px" borderColor="zinc.600" rounded="base">
							<Input
								color="zinc.300"
								fontSize="sm"
								value={artistName}
								onChange={(e) => setArtistName(e.target.value)}
							/>
						</InputGroup>
					</FormControl>
                    <FormControl>
						<FormLabel fontSize="xs" color="zinc.400">
							select the song cover
						</FormLabel>
						<InputGroup border="1px" borderColor="zinc.600" rounded="base">
							<Input
                                type='file' 
                                accept="image/*" 
                                /* onChange={(e) => setAudio(e.target.files[0])} */
								color="zinc.300"
								fontSize="sm"
								value={banner}
								onChange={(e) => setBanner(e.target.value)}
							/>
						</InputGroup>
					</FormControl>
                    <FormControl>
						<FormLabel fontSize="xs" color="zinc.400">
							select the song file
						</FormLabel>
						<InputGroup border="1px" borderColor="zinc.600" rounded="base">
							<Input
                                type='file' 
                                accept=".mp3,audio/*" 
                                onChange={(e) => setAudio(e.target.files[0])}
								color="zinc.300"
								fontSize="sm"
							/>
						</InputGroup>
					</FormControl>
					{error && (
						<Flex align="center" color="red.500" gap={4}>
							<MdError color="inherit" />
							<Text color="inherit" fontSize="xs">
								{error}
							</Text>
						</Flex>
					)}
					<Box mt={6}>
						<Button
							onClick={handleSubmit}
							bg="accent.main"
							py={5}
							w="full"
							_hover={{ opacity: 0.8 }}>
							{loading ? <Spinner color="white" /> : "upload"}
						</Button>
						<Text my={2} fontSize="sm" textAlign="center">
							OR
						</Text>
						<Link to="/home">
							<Text color="zinc.400" fontSize="sm" textAlign="center">
								Continue without logging in
							</Text>
						</Link>
					</Box>
					<Text fontSize="sm" color="zinc.400">
						{"Don't have an account yet?"}{" "}
						<Link to="/auth/register">
							{" "}
							<Text as="span" color="accent.main">
								Register
							</Text>
						</Link>
					</Text>
				</Flex>
			</Box>
		</Box>
	);

};

export default UploadPage;
