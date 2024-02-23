import Navbar from "../components/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import { Grid, GridItem } from "@chakra-ui/react";
import { MusicPlayer } from "../components/MusicPlayer/index.jsx";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const HomeLayout = () => {
	const { currentTrack } = useSelector((state) => state.player);
	const { pathname } = useLocation();
  const [navSize, changeNavSize] = useState("small")

	useEffect(() => {
		window.scrollTo(0, 0);
    console.log("homelayout useeffect called")
	}, [pathname]);

	return (
    <>
      <Grid
        position="relative"
        templateColumns={{ base: "1fr", md: "repeat(10, 1fr)" }}
        bg="#000"
        color="#fff"
      >
        <GridItem colSpan={
          navSize == "large" ? 2 : 1
        }>
          <Navbar changeHomelayoutSize = {changeNavSize}/>
        </GridItem>
        <GridItem colSpan={
          navSize == "large" ? 8 : 9
        } minH={{ base: "97vh", md: "100vh" }}>
          <Outlet />
        </GridItem>
        {
          currentTrack && <MusicPlayer />
        }
        {currentTrack && console.log("current track &&")}
      </Grid>
    </>
  );
};

export default HomeLayout;
