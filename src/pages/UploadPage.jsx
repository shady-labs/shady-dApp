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
  InputLeftElement,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { MdError } from "react-icons/md";
import { Link } from "react-router-dom";
import { resetPlayer } from "../redux/slices/playerSlice";
import { ToastContainer, toast } from "react-toastify";
import { StoreContent } from "../utils/StoreContent";
import { useDispatch, useSelector } from "react-redux";
import WalletButton from "../components/WalletButton";
import { uploadTrack } from "../graphql/mutation/uploadTrack";
import { getArtistsByName } from "../graphql/query/getArtistsByName";
import { addArtist } from "../graphql/mutation/addArtist";
import { useDropzone } from "react-dropzone";

const UploadPage = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [songName, setSongName] = useState([]);
  const [audio, setAudio] = useState([]);
  const [artistName, setArtistName] = useState([]);
  const [banner, setBanner] = useState([]);
  const { user, token } = useSelector((state) => state.user);
  const [bannerUrl, setBannerUrl] = useState([]);
  const [artist, setArtist] = useState([]);
  const [audioDuration, setAudioDuration] = useState(0);
  // search query test
  const [temp, setTemp] = useState([]);
  const [artistNotFound, setArtistNotFound] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [covers, setCovers] = useState([]);
  const [track, setTrack] = useState([]);

  const { getRootProps: getCoverRootProps, getInputProps: getCoverInputProps } =
    useDropzone({
      onDrop: (acceptedFiles) => {
        setCovers(acceptedFiles.map((file) => URL.createObjectURL(file)));
      },
    });

  const { getRootProps: getTrackRootProps, getInputProps: getTrackInputProps } =
    useDropzone({
      onDrop: (acceptedFiles) => {
        setTrack(acceptedFiles.map((file) => URL.createObjectURL(file)));
      },
    });

  const thumbs = covers.map((cover, i) => (
    <div key={i}>
      <div>
        <img src={cover} style={{ height: "80px", width: "80px" }} />
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks
    covers.forEach((cover) => URL.revokeObjectURL(cover));
  }, []);

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
      /* notify("Music file uploaded to IPFS"); */
      /* setMusicCID(audioCID);
		await uploadMetadata(banner, name, audioCID, description).then(
			() => {
			uploadToFireStore();
		}); */
      return cid;
    } catch (err) {
      console.log(err);
      /* notify(err); */
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      console.log("delay function running");
      handleQuery(artistName);
      handleQuery();
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [artistName]);

  const handleQuery = async (query) => {
    try {
      getArtistsByName(query).then((data) => {
        if (data == null || data == undefined || data == "") {
          setArtistNotFound(true);
        } else {
          setArtist(data);
          setArtistNotFound(false);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  const uploadBanner = async () => {
    try {
      console.log("banner: ", banner);
      const cid = await StoreContent(banner);
      /* const audioCID = `https://w3s.link/ipfs/${cid}/`;
		console.log(audioCID); */
      /* notify("Music file uploaded to IPFS"); */
      /* setMusicCID(audioCID);
		await uploadMetadata(banner, name, audioCID, description).then(
			() => {
			uploadToFireStore();
		}); */
      setBannerUrl(cid);
      return cid;
    } catch (err) {
      console.log(err);
      /* notify(err); */
    }
  };

  const onUploadBanner = (file) => {
    setUploadLoading(true);
    setBanner(file);
    setUploadLoading(false);
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
  function computeLength(file) {
    return new Promise((resolve) => {
      var objectURL = URL.createObjectURL(file);
      var mySound = new Audio([objectURL]);
      mySound.addEventListener(
        "canplaythrough",
        () => {
          URL.revokeObjectURL(objectURL);
          resolve({
            file,
            duration: mySound.duration,
          });
        },
        false
      );
    });
  }

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (
        artist["_id"] != "" &&
        audioDuration != "" &&
        songName != "" &&
        artistName != ""
      ) {
        await uploadAudio().then(async (cid) => {
          await uploadBanner().then((banner) => {
            if (artistNotFound) {
              //
              addArtist(
                "temp description",
                "temp genre",
                artistName,
                banner
              ).then((res) => {
                uploadTrack(
                  cid,
                  res["addArtist"]["_id"],
                  audioDuration,
                  "pop",
                  songName,
                  banner
                ).then((res) => {
                  console.log(res);
                  StoreContent(res).then((res) => {
                    console.log(res);
                  }
                  );
                });
              });
            } else {
              uploadTrack(
                cid,
                artist["_id"],
                audioDuration,
                "pop",
                songName,
                banner
              ).then((res) => {
                console.log(res);
                StoreContent(res).then((res) => {
                  console.log(res);
                }
                );
              }
              );
            }
          });
        });
      } else {
        //
      }
      // await setTimeout(uploadMetadata(), 5000);
      // await mintNFT();
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box
      minH="calc(100vh - 5rem)"
      maxW="2xl"
      mx="auto"
      display="flex"
      justifyContent="center"
      alignItems="center"
      p={6}
      backgroundColor="#000"
    >
      <Box
        bg={{ base: "#000", md: "#040d11" }}
        rounded="base"
        p={{ base: 2, md: 10 }}
        width="full"
      >
        <Box mb={8}>
          <Heading fontSize="2xl" color="#8E05C2">
            Upload
          </Heading>
          <Text fontSize="sm">Add your mix to the jam!</Text>
        </Box>
        <Flex direction="column" gap={4}>
          <FormControl>
            <FormLabel fontSize="xs" color="zinc.400" fontWeight="bold">
              Track Name
            </FormLabel>
            <InputGroup borderColor="zinc.600" rounded="base">
              <Input
                type="text"
                color="zinc.300"
                fontSize="sm"
                value={songName}
                onChange={(e) => setSongName(e.target.value)}
                placeholder="Track Name"
              />
            </InputGroup>
          </FormControl>
          <FormControl>
            <FormLabel fontSize="xs" color="zinc.400" fontWeight="bold">
              Artist and Feature Name
            </FormLabel>
            <InputGroup borderColor="zinc.600" rounded="base">
              <Input
                color="zinc.300"
                fontSize="sm"
                value={artistName}
                onChange={(e) => {
                  setArtistName(e.target.value);
                }}
                placeholder="Artist and Feature Name"
              />
            </InputGroup>
          </FormControl>
          <FormControl>
            <FormLabel fontSize="xs" color="zinc.400" fontWeight="bold">
              Upload Track Cover
            </FormLabel>
            <InputGroup border="1px" borderColor="#040d11" rounded="base">
              <div
                {...getCoverRootProps({ className: "dropzone" })}
                style={{
                  height: "80px",
                  width: "100%",
                  padding: "10px",
                  border: "1px dashed gray",
                  borderRadius: "4px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => onUploadBanner(e.target.files[0])}
                  {...getCoverInputProps()}
                />
                <p style={{ color: "gray", fontSize: "12px" }}>
                  Drag 'n' drop some files here, or click to select files
                </p>
              </div>
              <aside>{thumbs}</aside>
            </InputGroup>
          </FormControl>

          <FormControl>
            <FormLabel fontSize="xs" color="zinc.400" fontWeight="bold">
              Select Song File
            </FormLabel>
            <InputGroup border="1px" borderColor="#040d11" rounded="base">
              <div
                {...getTrackRootProps({ className: "dropzone" })}
                style={{
                  height: "80px",
                  width: "100%",
                  padding: "10px",
                  border: "1px dashed gray",
                  borderRadius: "4px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <input
                  type="file"
                  accept=".mp3,audio/*"
                  onChange={(e) => {
                    setAudio(e.target.files[0]);
                    computeLength(e.target.files[0]).then((res) => {
                      setAudioDuration(Math.round(res.duration));
                    });
                  }}
                  {...getTrackInputProps()}
                />
                <p style={{ color: "gray", fontSize: "12px" }}>
                  Drag 'n' drop some files here, or click to select files
                </p>
              </div>
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
              onClick={() => {
                if (loading == false) {
                  handleSubmit();
                }
              }}
              bg="accent.main"
              py={5}
              w="full"
              _hover={{ opacity: 0.8 }}
            >
              {loading ? <Spinner color="white" /> : "upload"}
            </Button>
            {/* <Text my={2} fontSize="sm" textAlign="center">
							OR
						</Text> */}
            {/* <Link to="/home">
							<Text color="zinc.400" fontSize="sm" textAlign="center">
								Continue without logging in
							</Text>
						</Link> */}
          </Box>
          {/* <Text fontSize="sm" color="zinc.400">
						{"Don't have an account yet?"}{" "}
						<Link to="/auth/register">
							{" "}
							<Text as="span" color="accent.main">
								Register
							</Text>
						</Link>
					</Text> */}
        </Flex>
      </Box>
    </Box>
  );
};

export default UploadPage;
