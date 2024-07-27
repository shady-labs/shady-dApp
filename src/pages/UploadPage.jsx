import { useState, useEffect } from "react";
import { MdError } from "react-icons/md";
import { StoreContent } from "../utils/StoreContent";
import { uploadTrack } from "../graphql/mutation/uploadTrack";
import { getArtistsByName } from "../graphql/query/getArtistsByName";
import { addArtist } from "../graphql/mutation/addArtist";
import { deployContract } from "../contract/deploy";
import { mint } from "../contract/mint";
import { deployFractionalContract } from "../contract/fractionalise";

const UploadPage = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [songName, setSongName] = useState("");
  const [audio, setAudio] = useState(null);
  const [artistName, setArtistName] = useState("");
  const [banner, setBanner] = useState(null);
  const [bannerUrl, setBannerUrl] = useState("");
  const [artist, setArtist] = useState(null);
  const [audioDuration, setAudioDuration] = useState(0);
  const [trackUrl, setTrackUrl] = useState("");
  const [artistNotFound, setArtistNotFound] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      handleQuery(artistName);
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [artistName]);

  const handleQuery = async (query) => {
    try {
      const data = await getArtistsByName(query);
      if (!data) {
        setArtistNotFound(true);
      } else {
        setArtist(data);
        setArtistNotFound(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleFileChange = (e, setter) => {
    const file = e.target.files[0];
    setter(file);
    if (setter === setAudio) {
      computeLength(file).then((res) => {
        setAudioDuration(Math.round(res.duration));
      });
    }
  };

  const computeLength = (file) => {
    return new Promise((resolve) => {
      const objectURL = URL.createObjectURL(file);
      const mySound = new Audio(objectURL);
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
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (artist?._id && audioDuration && songName && artistName) {
        const cid = await uploadAudio();
        const bannerCid = await uploadBanner();
        if (artistNotFound) {
          const newArtist = await addArtist("temp description", "temp genre", artistName, bannerCid);
          await uploadTrack(cid, newArtist.addArtist._id, audioDuration, "pop", songName, bannerCid);
        } else {
          await uploadTrack(cid, artist._id, audioDuration, "pop", songName, bannerCid);
        }
        setTrackUrl(cid);
        await StoreContent({ image: bannerCid, name: songName, animation_url: cid });
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeploy = async () => {
    try {
      setLoading(true);
      const tx = await useDeploy();
      if (tx) {
        await mintNFT(tx);
        await useDeployFractional(tx);
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen max-w-2xl mx-auto p-6">
      <div className="bg-black rounded p-6">
        <div className="mb-8">
          <h2 className="text-2xl text-purple-500">Upload</h2>
          <p className="text-sm">Add your mix to the jam!</p>
        </div>
        <div className="flex flex-col gap-4">
          <div className="form-control">
            <label className="text-xs text-gray-400">Track Name</label>
            <div className="border border-gray-600 rounded">
              <input
                type="text"
                className="w-full p-2 bg-transparent text-gray-300 text-sm"
                value={songName}
                onChange={(e) => setSongName(e.target.value)}
                placeholder="Enter the Track Name"
              />
            </div>
          </div>
          <div className="form-control">
            <label className="text-xs text-gray-400">Artist Name</label>
            <div className="border border-gray-600 rounded">
              <input
                type="text"
                className="w-full p-2 bg-transparent text-gray-300 text-sm"
                value={artistName}
                onChange={(e) => setArtistName(e.target.value)}
                placeholder="Enter the Artist and Feature Name"
              />
            </div>
          </div>
          <div className="form-control">
            <label className="text-md text-white">Upload Track Cover</label>
            <div className="border border-gray-800 rounded">
              <input
                type="file"
                accept="image/*"
                className="w-full p-2 bg-transparent text-white text-md"
                onChange={(e) => handleFileChange(e, setBanner)}
              />
            </div>
          </div>
          <div className="form-control">
            <label className="text-md text-white">Select the Song File</label>
            <div className="border border-gray-800 rounded">
              <input
                type="file"
                accept=".mp3,audio/*"
                className="w-full p-2 bg-transparent text-white text-md"
                onChange={(e) => handleFileChange(e, setAudio)}
              />
            </div>
          </div>
          {error && (
            <div className="flex items-center text-red-500 gap-2">
              <MdError />
              <span className="text-xs">{error}</span>
            </div>
          )}
          <div className="mt-6">
            <button
              onClick={handleSubmit}
              className={`w-full py-3 bg-purple-600 rounded hover:opacity-80 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={loading}
            >
              {loading ? <div className="spinner-border animate-spin" role="status"><span className="sr-only">Loading...</span></div> : "Upload"}
            </button>
          </div>
          <div className="mt-6">
            <button
              onClick={handleDeploy}
              className={`w-full py-3 bg-purple-600 rounded hover:opacity-80 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={loading}
            >
              {loading ? <div className="spinner-border animate-spin" role="status"><span className="sr-only">Loading...</span></div> : "Deploy & Mint"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
