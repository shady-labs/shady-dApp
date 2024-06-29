import { useSelector } from "react-redux";
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

import Navbar from "../components/Navbar";
import { MusicPlayer } from "../components/MusicPlayer/index.jsx";

const HomeLayout = () => {
	const { currentTrack } = useSelector((state) => state.player);
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return (
    <>
      <div className="relative grid grid-cols-1 md:grid-cols-10 gap-1 bg-black text-white">
        <div className="col-span-1">
          <Navbar/>
        </div>
        <div
          className="col-span-9"
        >
          <Outlet />
        </div>
        {currentTrack && <MusicPlayer />}
      </div>
    </>
  );
};

export default HomeLayout;
