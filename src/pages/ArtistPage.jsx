import { useParams } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useQuery, gql } from "@apollo/client";
import {
  playTrack,
  setTrackList,
  setCurrentTrack,
  setPlaying,
} from "../redux/slices/playerSlice";
import { searchTrackByArtistName } from "../graphql/query/searchBarAutoComplete";
import ArtistSong from "../components/ArtistSong";
import LoadingSkeleton from "../components/LoadingSkeleton";
import { Search } from "../components/SearchHeader";
import ArtistModal from "../components/ArtistModal";
import { LoginView } from "../components/signInButton";

import { BsFillPlayFill } from "react-icons/bs";
import { MdErrorOutline } from "react-icons/md";

const ArtistPage = () => {
  const { artistName } = useParams();
  const dispatch = useDispatch();

  const Artist = gql`
    query GetArtistsByName($name: String) {
      getArtistsByName(name: $name) {
        _id
        name
        image
        description
        genre
        tracksId
        tracksName
      }
    }
  `;

  const [songs, setSongs] = useState([]);
  const [playerTracks, setPlayerTracks] = useState([
    {
      artists: ["Drake"],
      coverImage: "abcd",
      duration: 123,
      likes: {
        "asdjasdads": true,
        "sdjasdk": true,
        "fedwesnjm": true,
      },
      songUrl: "temp",
      title: "title",
      type: "Song",
      _v: 0,
      _id: "id",
    },
  ]);

  const { loading, error, data } = useQuery(Artist, {
    variables: { name: artistName },
  });

  if (loading) return <LoadingSkeleton />;
  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center text-accent-light">
          <MdErrorOutline size={32} />
          <p className="text-zinc-400 text-center">An error occurred</p>
        </div>
      </div>
    );

  if (data) {
    searchTrackByArtistName(artistName).then((res) => {
      setSongs(res);
    });
  }

  const handlePlay = () => {
    setPlayerTracks([]);
    songs.forEach((song) =>
      setPlayerTracks((prevTracks) => [
        ...prevTracks,
        {
          _id: song._id,
          title: song.name,
          artists: song.artistsName,
          coverImage: song.trackImage,
          songUrl: song.trackUrl,
          duration: song.duration,
          likes: {
            "64b27271cbbc5494326b3f5d": true,
            "64be80fb0e97b62cf659af8c": true,
            "64e63265d233402a9f2edee9": true,
          },
          type: "Song",
          __v: 0,
        },
      ])
    );
    dispatch(setTrackList({ list: playerTracks }));
    dispatch(setCurrentTrack(playerTracks[0]));
    dispatch(setPlaying(true));
  };

  // Will be used later :-

  // const onSongPlay = (song) => {
  //   const index = data.artist?.songs.findIndex((s) => s._id === song._id);
  //   dispatch(setTrackList({ list: data.Artist?.songs, index }));
  //   dispatch(playTrack(song));
  // };

  return (
    <div
      className="w-full h-[35%] bg-cover bg-no-repeat bg-center"
      style={{ backgroundImage: `url(${data.getArtistsByName[0].image})` }}
    >
      <div className="min-h-screen p-4 pb-32 pt-16 md:pt-4 bg-transparent backdrop-blur-lg">
        <div className="max-w-full">
          <div className="flex justify-between pt-2">
            <h1 className="text-3xl md:text-3xl text-accent-light font-light">
              <Search />
            </h1>
            <div className="flex items-center space-x-2">
              <ArtistModal />
              <LoginView />
            </div>
          </div>
          <div className="pt-6">
            <div className="flex flex-col md:flex-row items-start gap-5">
              <div className="min-w-[14rem] h-[14rem]">
                <img
                  src={data.getArtistsByName[0].image}
                  alt={data.getArtistsByName[0].name}
                  className="w-full h-full object-cover rounded-3xl"
                />
              </div>
              <div>
                <p className="text-sm md:text-lg text-zinc-300">Introducing,</p>
                <h1 className="text-lg md:text-6xl text-accent-light mb-4 font-semibold">
                  {data.getArtistsByName[0].name}
                </h1>
                <p className="text-lg md:text-lg text-zinc-300 font-semibold">
                  {data.getArtistsByName[0].description}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-12">
            <div className="flex items-center gap-6 mb-4">
              <h3 className="text-lg md:text-xl font-semibold">Songs</h3>
              <button
                onClick={handlePlay}
                className="inline-flex items-center bg-accent-light text-white rounded-2xl py-1 px-4"
              >
                <BsFillPlayFill size={20} />
                Play All
              </button>
            </div>
            <div className="w-full h-px bg-zinc-600 mb-3"></div>
            <div className="flex flex-col gap-4">
              {songs.map((song) => (
                <ArtistSong
                  key={song._id}
                  song={{
                    _id: song._id,
                    title: song.name,
                    artists: song.artistsName,
                    coverImage: song.trackImage,
                    songUrl: song.trackUrl,
                    duration: song.duration,
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
        </div>
      </div>
    </div>
  );
};

export default ArtistPage;
