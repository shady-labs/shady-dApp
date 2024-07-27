/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import ArtistCard from "../components/ArtistCard";
import { getAllArtists } from "../graphql/query/getAllArtists";

const ArtistsPage = () => {
  const [allArtists, setallArtists] = useState([
    {
      _id: "",
      name: "loading...",
      image: "loading...",
      url: "loading...",
    },
  ]);
  const [fetched, setFetched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!fetched) {
      setIsLoading(true);
      getAllArtists().then((res) => {
        setallArtists(res);
        setFetched(true);
        setIsLoading(false);
      });
    }
  }, [fetched]);

  return (
    <div className="p-6 pb-32 min-h-screen pt-20 md:pt-6 md:pl-14 xl:pl-0">
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-semibold mb-1 md:mb-3">
          Artists
        </h1>
        <p className="text-sm text-gray-400">Discover new artists</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {allArtists.map((artist) => (
          <ArtistCard key={artist._id} artist={artist} />
        ))}
      </div>
    </div>
  );
};

export default ArtistsPage;
