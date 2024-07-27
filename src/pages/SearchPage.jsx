import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Search from "../components/Search";
import { searchBarAutoComplete } from "../graphql/query/searchBarAutoComplete";
import LoadingSkeleton from "../components/LoadingSkeleton";
import ArtistSong from "../components/ArtistSong";
import ArtistCardAlt from "../components/ArtistCardAlt";
import Footer from "../components/Footer";

const SearchPage = () => {
  const { inputQuery } = useParams();
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
      mage: "loading...",
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
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Search Query: ", inputQuery);
    if (inputQuery) {
      handleQuery(inputQuery);
    }
  }, []);

  const handleQuery = async (query) => {
    setSearchQuery(query);
    console.log("Search Query: ", query);
    setIsLoading(true);
    if (query !== "" && query !== null && query !== " ") {
      navigate("/search/" + query);
      await searchBarAutoComplete(query).then((res) => {
        if (
          res[0].length === 0 &&
          res[1].length === 0 &&
          res[2].length === 0 &&
          res[3].length === 0
        ) {
          setIsNoResults(true);
        } else {
          setTrackSearchResults(res[0]);
          setArtistSearchResults(res[1]);
          setSetTrackofArtist(res[3]);
          setSetArtistofTrack(res[2]);
          console.log("Track Search Results: ", trackSearchResults);
          setIsNoResults(false);
        }
        setIsTopCharts(false);
        setIsLoading(false);
      });
    } else {
      navigate("/search");
      setIsLoading(false);
      if (inputQuery) {
        setIsTopCharts(false);
      }
    }
  };

  return (
    <div className="bg-black min-h-screen p-4">
      <Search handleQuery={handleQuery} isSearchPage={true} inputQuery={inputQuery} />
      <div className="flex flex-col min-h-[25rem] justify-center">
        <h1 className="p-2 text-center text-2xl font-bold text-white">Search Your Jam!</h1>
        {isLoading ? (
          <LoadingSkeleton />
        ) : isTopCharts ? (
          <></>
        ) : isNoResults ? (
          <p className="text-gray-300">No Results</p>
        ) : (
          <>
            <div className="mt-12">
              <h3 className="pb-5 text-lg md:text-xl font-medium text-white">Songs</h3>
              <div className="grid grid-cols-3 gap-4">
                {trackSearchResults.map((track) => (
                  <ArtistSong
                    key={track._id}
                    song={{
                      _id: track._id,
                      title: track.name,
                      artists: track.artistsName,
                      coverImage: track.trackImage,
                      songUrl: track.trackUrl,
                      duration: track.duration,
                      likes: {
                        "64b27271cbbc5494326b3f5d": true,
                        "64be80fb0e97b62cf659af8c": true,
                        "64e63265d233402a9f2edee9": true,
                      },
                      type: "Song",
                      __v: 0,
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="mt-12">
              <h3 className="pb-5 text-lg md:text-xl font-medium text-white">Artists</h3>
              <div className="flex flex-col">
                <div className="grid grid-cols-2 gap-1">
                  {artistSearchResults.slice(0, 6).map((artist) => (
                    <ArtistCardAlt key={artist._id} artist={artist} />
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-12">
              <h3 className="pb-5 text-lg md:text-xl font-medium text-white">Songs by {inputQuery}</h3>
              <div className="grid grid-cols-3 gap-4">
                {setTrackofArtistResult.map((track) => (
                  <ArtistSong
                    key={track._id}
                    song={{
                      _id: track._id,
                      title: track.name,
                      artists: track.artistsName,
                      coverImage: track.trackImage,
                      songUrl: track.trackUrl,
                      duration: track.duration,
                      likes: {
                        "64b27271cbbc5494326b3f5d": true,
                        "64be80fb0e97b62cf659af8c": true,
                        "64e63265d233402a9f2edee9": true,
                      },
                      type: "Song",
                      __v: 0,
                    }}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
      <div className="mt-8">
        <Footer />
      </div>
    </div>
  );
};

export default SearchPage;
