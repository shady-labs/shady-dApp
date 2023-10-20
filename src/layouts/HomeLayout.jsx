import Navbar from "../components/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import { Grid, GridItem } from "@chakra-ui/react";
import { MusicPlayer } from "../components/MusicPlayer/index.jsx";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Search from "../components/Search";
import SearchPage from "../pages/SearchPage";
import Header from "../components/Header";

const HomeLayout = () => {
	const { currentTrack } = useSelector((state) => state.player);
	const { pathname } = useLocation();
  const [navSize, changeNavSize] = useState("large")

	useEffect(() => {
		window.scrollTo(0, 0);
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
          <Header />
          <Outlet />

        </GridItem>

        {currentTrack && <MusicPlayer />}
      </Grid>
    </>
  );
};

export default HomeLayout;
