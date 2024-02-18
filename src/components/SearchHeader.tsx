import React, { useState, useEffect } from "react";
import {
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  Box,
  Icon,
  BoxProps,
  InputRightElement,
  Flex,
  Text,
  AvatarBadge,
  Avatar,
  Image,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import { searchBarAutoComplete } from "../graphql/query/searchBarAutoComplete";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeInUp } from "../theme/motionVariants";

interface Props extends BoxProps {
  value: string;
  // isLoading: boolean;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  resultRenderer: (result: any) => JSX.Element;
  // searchResult: ( resultData: any )=> JSX.Element;
  onResultSelect: (resultData: any) => void;
  resultListMaxHeight?: string;
  // searchResults?: any[];
  placeholder?: string;
  input?: { iconPosition: "left" | "right" };
  noResultFoundText?: string;
}

export const Search = (props: Props) => {
  const {
    value,
    // isLoading,
    input,
    onSearchChange,
    resultRenderer,
    onResultSelect,
    resultListMaxHeight = "60vh",
    placeholder = "Search Songs, Albums, Artists or Podcasts",
    noResultFoundText = "No results found.",
    ...rest
  } = props;
  const [isLoading, setIsloading] = useState(false);
  const { iconPosition = "left" } = input || {};
  const [searchResults, setSearchResults] = useState([
    {
      id: "",
      title: "",
      redirect: "",
      icon_url: "",
      description: "",
      type: "",
    },
  ]);
  const [showResults, setShowResults] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      console.log("search query: ", query);
      handleQuery(query);
    }, 100);
    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const handleQuery = async (value) => {
    try {
      if (value.length > 0) {
        setIsloading(true);
        await searchBarAutoComplete(value).then((data) => {
          searchResults.splice(0, searchResults.length);
          console.log("search query 2: ", value);
          if (data![0][0] != null) {
            setIsloading(false);
            searchResults.splice(0, searchResults.length);
            if (data![1][0] != null) {
              console.log(data![1][0]);
              data![1].map((artist) => {
                searchResults.push({
                  id: artist["_id"],
                  title: artist["name"],
                  redirect: "/artist/" + artist["name"],
                  icon_url: artist["image"],
                  description: "",
                  type: "Artist",
                });
              });
            }
            data![0].map((track) => {
              searchResults.push({
                id: track["_id"],
                title: track["name"],
                //redirect: "/search/" + track["name"],
                redirect: "/" + track["artistsName"] + "/song/" + track["name"],
                icon_url: track["trackImage"],
                description: track["artistsName"][0],
                type: "track",
              });
            });
          } else {
            setIsloading(false);
            searchResults.splice(0, searchResults.length);
            searchResults.push({
              id: "not found",
              title: "not found",
              redirect: "",
              icon_url:
                "https://img.freepik.com/premium-photo/gorilla-wearing-pair-headphones-with-purple-background_962508-4153.jpg",
              description: "Shady Artist",
              type: "track",
            });
          }
        });
      } else {
        setIsloading(false);
        searchResults.splice(0, searchResults.length);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onBlur = () => {
    setTimeout(() => {
      setShowResults(false);
      setIsloading(false);
    }, 400);
  };

  return (
    <Box
      position="absolute"
      width={"30vw"}
      {...rest}
      zIndex={"overlay"}
    >
      <InputGroup mb="10px">
        {iconPosition === "left" && (
          <InputLeftElement
            pointerEvents="none"
            children={
              isLoading ? <Spinner size="sm" /> : <Icon as={FaSearch} />
            }
            onClick={async (e) => {
              document.location.href = "/search";
            }}
          />
        )}

        <Input
          borderColor="zinc.300"
          focusBorderColor="zinc.300"
          borderRadius="lg"
          border="1px"
          bg="black"
          opacity={0.4}
          placeholder={placeholder}
          value={value}
          //textColor={"white"}
          onChange={async (e) => {
            // setArtistName(e.target.value)
            setIsloading(true);
            setQuery(e.target.value);
            // handleQuery(e.target.value);
            // handleQuery(e.target.value).then((data) => {
            // //   setArtist(data);
            // });
          }}
          onFocus={() => setShowResults(true)}
          onBlur={onBlur}
        />

        {iconPosition === "right" && (
          <InputRightElement
            pointerEvents="none"
            children={
              isLoading ? <Spinner size="sm" /> : <Icon as={FaSearch} />
            }
            onClick={async (e) => {
              document.location.href = "/search";
            }}
          />
        )}
      </InputGroup>
      {showResults && (
        <Box
          as={motion.div}
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          maxHeight={resultListMaxHeight}
          overflowY="auto"
          borderRadius="0.3em"
          bgColor="transparent"
          backdropFilter="saturate(50%) blur(90px)"
          boxShadow="0 2px 4px 0 rgb(34 36 38 / 12%), 0 2px 10px 0 rgb(34 36 38 / 15%);"
          sx={{
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
          zIndex="0"
        >
          {searchResults.length >= 0
            ? searchResults.map((result) => (
                <Link to={result.redirect}>
                  <Box
                    key={result.id}
                    borderBottom="1px solid rgba(34,36,38,.1)"
                    cursor="pointer"
                    _hover={{
                      bgColor: "zinc.900",
                    }}
                    onClick={() => {}}
                    zIndex="0"
                    as={motion.div}
                    initial="initial"
                    animate="animate"
                    variants={fadeInUp}
                  >
                    <Flex alignItems="flex-start">
                      {result.type == "track" ? (
                        <>
                          <Image
                            p="0.3em"
                            src={result.icon_url}
                            alt={result.title}
                            h={"2.5em"}
                            // objectFit="cover" // <-- need to remove this and accept the image's aspect ratio
                            roundedTop="base"
                            transition="0.5s ease"
                          />
                        </>
                      ) : (
                        <>
                          <Avatar p="0.2em" src={result.icon_url} size={"lg"}></Avatar>
                        </>
                      )}
                      <Flex alignItems="center">
                        <Box p="0.3em" margin="0" color="black">
                          {}
                          <Text
                            fontSize="medium"
                            fontWeight="medium"
                            color="white"
							/* p="0.5em" */
                          >
                            {result.title}
                          </Text>
                          <Text
                            fontSize="medium"
                            fontWeight="small"
                            color="white"
                            _hover={{
                              color: "white",
                            }}
                          >
                            {result.description}
                          </Text>
                        </Box>
                      </Flex>
                    </Flex>
                  </Box>
                </Link>
              ))
            : value.length > 0 &&
              !isLoading && (
                <Box borderBottom="1px solid rgba(34,36,38,.1)">
                  <Flex alignItems="center">
                    <Box p="0.8em" margin="0" color="black">
                      <Text>{noResultFoundText}</Text>
                    </Box>
                  </Flex>
                </Box>
              )}
        </Box>
      )}
    </Box>
  );
};
