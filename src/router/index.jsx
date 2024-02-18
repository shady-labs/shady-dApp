import { Navigate, createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import HomeLayout from "../layouts/HomeLayout";
import ErrorPage from "../pages/ErrorPage";
import UploadPage from "../pages/UploadPage";
import ArtistePage from "../pages/ArtistePage";
import ArtistesPage from "../pages/ArtistesPage";
import FavoritesPage from "../pages/FavoritesPage";
import SettingsPage from "../pages/SettingsPage";
import UserPage from "../pages/UserPage";
import SearchPage from "../pages/SearchPage";
import BrowsePage from "../pages/BrowsePage";
import LandingLayout from "../layouts/LandingLayout";
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
        path: "artistes",
        element: <ArtistesPage />,
      },
      {
        path: "artist/:artistName",
        element: <ArtistePage />,
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
  {
    path: "/landing",
    element: <LandingLayout />,
    errorElement: <ErrorPage />,
  },
  // {
  //   path: "/",
  //   element: <UploadLayout />,
  //   errorElement: <ErrorPage />,
  //   children: [
  //     {
  //       path: "upload",
  //       element: <UploadPage />,
  //     },
  //   ],
  // },
]);
