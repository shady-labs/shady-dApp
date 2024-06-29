import { useEffect, useState } from "react";
import SongCard from "../components/SongCard";
import { getAllTracks } from "../graphql/query/getAllTracks";

const BrowsePage = () => {
  const [fetched, setFetched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [allTracks, setAllTracks] = useState([
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
      getAllTracks().then((res) => {
        setAllTracks(res);
        setFetched(true);
        setIsLoading(false);
      });
    }
  }, [fetched]);

  return (
    <div className="p-6 pb-32 pt-20 md:pt-6 pl-4 md:pl-14 xl:pl-0 min-h-screen">
      <div className="mb-6">
        <h1 className="text-lg md:text-2xl font-semibold mb-1 md:mb-3">
          Welcome to a Shady World
        </h1>
        <p className="text-sm text-zinc-400">Discover interesting songs</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6">
        {allTracks.map((track) => (
          <SongCard
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
  );
};

export default BrowsePage;
