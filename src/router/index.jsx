import { Navigate, createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import HomeLayout from "../layouts/HomeLayout";
import ErrorPage from "../pages/ErrorPage";
import UploadPage from "../pages/UploadPage";
import ArtistPage from "../pages/ArtistPage";
import ArtistsPage from "../pages/ArtistsPage";
import FavoritesPage from "../pages/FavoritesPage";
import SettingsPage from "../pages/SettingsPage";
import UserPage from "../pages/UserPage";
import SearchPage from "../pages/SearchPage";
import BrowsePage from "../pages/BrowsePage";
import SongPage from "../pages/SongPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Navigate to="/home" replace /> },
      {
        path: "/home",
        element: <HomePage />,
      },
      {
        path: "browse",
        element: <BrowsePage />,
      },
      {
        path: "artists",
        element: <ArtistsPage />,
      },
      {
        path: "artist/:artistName",
        element: <ArtistPage />,
      },
      {
        path: "favorites",
        element: <FavoritesPage />,
      },
      {
        path: "upload",
        element: <UploadPage />,
      },
      {
        path: "settings",
        element: <SettingsPage />,
      },
      {
        path: ":artistName/song/:songName",
        element: <SongPage />,
      },
      {
        path: "user",
        element: <UserPage />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
      {
        path: "search/:inputQuery",
        element: <SearchPage />,
      }
    ],
  },
  // {
  //   path: "/landing",
  //   element: <LandingLayout />,
  //   errorElement: <ErrorPage />,
  // },
]);
