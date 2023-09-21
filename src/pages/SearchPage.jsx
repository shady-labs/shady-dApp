import React, { useState, useEffect } from "react";
import { Box, Flex, Heading, Text, Grid, Image } from "@chakra-ui/react";
import Search from "../components/Search";
import { searchBarAutoComplete } from "../graphql/query/searchBarAutoComplete";
import { set } from "react-hook-form";
import { getAllTracks } from "../graphql/query/getAllTracks";
import { getAllArtists } from "../graphql/query/getAllArtists";
import LoadingSkeleton from "../components/LoadingSkeleton";
import SongCard from "../components/SongCard";

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState([]);
  const [artistSearchResults, setArtistSearchResults] = useState([]);
  const [trackSearchResults, setTrackSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTopCharts, setIsTopCharts] = useState(true);
  const [isNoResults, setIsNoResults] = useState(false);
  const [fetched, setFetched] = useState(false);
  const [topArtists, setTopArtists] = useState([
    {
      _id: "",
      name: "loading...",
      image: "loading...",
      url: "loading...",
    },
  ]);
  const [setTrackofArtistResult, setSetTrackofArtist] = useState([
    {
      _id: "",
      name: "loading...",
      image: "loading...",
      url: "loading...",
      artistId: [],
      artistName: [],
      genre: [],
      duration: 1,
    },
  ]);
  const [setArtistofTrackResult, setSetArtistofTrack] = useState([
    {
      _id: "",
      name: "loading...",
      image: "loading...",
      url: "loading...",
      artistId: [],
      artistName: [],
      genre: [],
      duration: 1,
    },
  ]);
  const [topTracks, setTopTracks] = useState([
    {
      _id: "",
    name: "",
    artistsID: [],
    artistsName: [],
    trackImage: "",
    trackUrl: "",
    genre: [],
    duration: 1,
    },
  ]);


  useEffect(() => {
    if (!fetched) {
      setIsLoading(true);
      getAllTracks().then(
        (res) => {
          setTopTracks(res);
          console.log("Top Tracks: ", res)
          topTracks.map((track) => {
            console.log("top track details: "+JSON.stringify(
              {
                "_id": track._id,
                "title": "",
                "artistes": [track.artistsName[0]],
                "coverImage": track.trackImage,
                "songUrl": track.trackUrl,
                "duration": track.duration,
                "likes": {
                  "64b27271cbbc5494326b3f5d":true,
                  "64be80fb0e97b62cf659af8c":true,
                  "64e63265d233402a9f2edee9":true
                },
                "type": "Song",
                "__v": 0,
              }
            ));
          });
          getAllArtists().then(
            (res) => {
              setTopArtists(res);
              console.log("Top Artists: ", res)
              setFetched(true);
              setIsLoading(false);
            },
          );
        },
      );
    }
  }, []);


  
  const handleQuery = async (query) => {
    setSearchQuery(query);
    console.log("Search Query: ", query)
    setIsLoading(true);
    if(query != "" && query != null && query!=" "){
    await searchBarAutoComplete(query).then(
      (res) => {  
        //console.log("Search result: ", res)
        if(res[0].length == 0 && res[1].length == 0 && res[2].length == 0 && res[3].length == 0){
          setIsNoResults(true);
        }
        else{
          setTrackSearchResults(res[0]);
          setArtistSearchResults(res[1]);
          setSetTrackofArtist(res[3]);
          setSetArtistofTrack(res[2]);
          console.log("Track Search Results: ", trackSearchResults)
          setIsNoResults(false);
        }
        setIsTopCharts(false);
        setIsLoading(false);
      },
    );}
    else{
      await getAllTracks().then(
        (res) => {
          console.log("Search Query: ", res)
          setIsTopCharts(true);
          setIsLoading(false);
        },
      );
    }
  };

  return (
    <Box bg="#000" minH="100vh" p={4}>
      <Search handleQuery={handleQuery}/>
      <Flex direction="column" minH="25rem" align="center" justify="center">
        <Heading>Search Page</Heading>
        <Text color="zinc.300">Some Shady Task Underway!</Text>
        {
          (isLoading) ? (
            <LoadingSkeleton/>
          ) : (
            (isTopCharts) ? (
              <>
                <Text color="zinc.300">Top Charts</Text>
                <Text color="zinc.300">TOP Artists: {topArtists.length} :</Text>
                {
                  <Grid
                    templateColumns={{
                      base: "repeat(2, 1fr)",
                      md: "repeat(3, 1fr)",
                      lg: "repeat(4, 1fr)",
                      xl: "repeat(5, 1fr)",
                    }}
                    gap={{ base: 3, md: 6 }}>
                    {topArtists.map((artist) => (
                      <>
                        <Text color="zinc.300">{artist.name}</Text>
                        <Image src={artist.image} alt="artist image" />
                        <Text color="zinc.300">{artist.genre}</Text>
                      </>
                    ))}
                  </Grid> 
                }
                <Text color="zinc.300">TOP Tracks: {topTracks.length} : </Text>
                {
                  <Grid
                    templateColumns={{
                      base: "repeat(2, 1fr)",
                      md: "repeat(3, 1fr)",
                      lg: "repeat(4, 1fr)",
                      xl: "repeat(5, 1fr)",
                    }}
                    gap={{ base: 3, md: 6 }}>
                    {topTracks.map((track) => (
                      <>
                          < SongCard key={track._id} song={
                            {
                              "_id": track._id,
                              "title": track.name,
                              "artistes": track.artistsName,
                              "coverImage": track.trackImage,
                              "songUrl": track.trackUrl,
                              "duration": track.duration,
                              "likes": {
                                "64b27271cbbc5494326b3f5d":true,
                                "64be80fb0e97b62cf659af8c":true,
                                "64e63265d233402a9f2edee9":true
                              },
                              "type": "Song",
                              "__v": 0,
                            }
                          } />
                          </>
                    ))}
                  </Grid> 
                }
              </>
            ) : (
              (isNoResults) ? (
                <Text color="zinc.300">No Results</Text>
              ) : (
                <>
                <Text color="zinc.300">Track Search Results: {trackSearchResults.length} :</Text>
                  {
                    <Grid
                      templateColumns={{
                        base: "repeat(2, 1fr)",
                        md: "repeat(3, 1fr)",
                        lg: "repeat(4, 1fr)",
                        xl: "repeat(5, 1fr)",
                      }}
                      gap={{ base: 3, md: 6 }}>
                      {trackSearchResults.map((track) => (
                        <>
                          < SongCard key={track._id} song={
                            {
                              "_id": track._id,
                              "title": track.name,
                              "artistes": track.artistsName,
                              "coverImage": track.trackImage,
                              "songUrl": track.trackUrl,
                              "duration": track.duration,
                              "likes": {
                                "64b27271cbbc5494326b3f5d":true,
                                "64be80fb0e97b62cf659af8c":true,
                                "64e63265d233402a9f2edee9":true
                              },
                              "type": "Song",
                              "__v": 0,
                            }
                          } />
                          </>
                      ))}
                    </Grid>
                  }
                  <Text color="zinc.300">Artist Search Results: {artistSearchResults.length} : </Text>
                  {
                    <>
                      <Grid
                        templateColumns={{
                          base: "repeat(2, 1fr)",
                          md: "repeat(3, 1fr)",
                          lg: "repeat(4, 1fr)",
                          xl: "repeat(5, 1fr)",
                        }}
                        gap={{ base: 3, md: 6 }}>
                        {artistSearchResults.map((artist) => (
                          <>
                          <Text color="zinc.300">{artist.name}</Text>
                          <Image src={artist.image} alt="artist image" />
                          </>
                        ))}
                      </Grid>
                    </>
                  }
                  <Text color="zinc.300">Track of Artist: {setTrackofArtistResult.length} : </Text>
                  {
                    <Grid
                      templateColumns={{
                        base: "repeat(2, 1fr)",
                        md: "repeat(3, 1fr)",
                        lg: "repeat(4, 1fr)",
                        xl: "repeat(5, 1fr)",
                      }}
                      gap={{ base: 3, md: 6 }}>
                      {setTrackofArtistResult.map((track) => (
                        < SongCard key={track._id} song={
                          {
                            "_id": track._id,
                            "title": track.name,
                            "artistes": track.artistsName,
                            "coverImage": track.trackImage,
                            "songUrl": track.trackUrl,
                            "duration": track.duration,
                            "likes": {
                              "64b27271cbbc5494326b3f5d":true,
                              "64be80fb0e97b62cf659af8c":true,
                              "64e63265d233402a9f2edee9":true
                            },
                            "type": "Song",
                            "__v": 0,
                          }
                        } />
                      ))}
                    </Grid>
                  }
                  <Text color="zinc.300">Artist of Track Results: {setArtistofTrackResult.length} : </Text>
                  {
                    <Grid
                      templateColumns={{
                        base: "repeat(2, 1fr)",
                        md: "repeat(3, 1fr)",
                        lg: "repeat(4, 1fr)",
                        xl: "repeat(5, 1fr)",
                      }}
                      gap={{ base: 3, md: 6 }}>
                      {setArtistofTrackResult.map((artist) => (
                        <>
                          <Text color="zinc.300">{artist.name}</Text>
                          <Image src={artist.image} alt="artist image" />
                          </>
                      ))}
                    </Grid>
                  }
                </>
              )
            )
          )
        }
      </Flex>
    </Box>
  );
};

export default SearchPage;
