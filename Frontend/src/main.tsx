import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { store } from "./store/store.ts";
import { Provider } from "react-redux";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route
} from "react-router-dom";
import Register from "./pages/Register.tsx";
import OtpPage from "./pages/OtpPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import AuthLayout from "./components/AuthLayout.tsx";
import Home from "./pages/Home.tsx";
import Search from "./pages/Search.tsx";
import Library from "./pages/Library.tsx";
import LikedSongs from "./pages/LikedSongs.tsx";
import CreatePlaylist from "./pages/CreatePlaylist.tsx";
import UploadSongs from "./pages/UploadSongs.tsx";
import MainHome from "./pages/MainHome.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
  [
  <Route path="/" element={<MainHome/>}>
    <Route path="" element={<App />}>
      <Route path="" element={<Home />} />
      <Route path="search" element={<Search/>}/>
      <Route path="search/:search" element={<Search/>}/>
      <Route path="your-library" element={<AuthLayout authentication={true} ><Library /></AuthLayout>} />
      <Route path="liked-songs" element={<AuthLayout authentication={true} ><LikedSongs /></AuthLayout>} />
      <Route path="create-playlist" element={<AuthLayout authentication={true} ><CreatePlaylist /></AuthLayout>} />
      <Route path="upload-songs" element={<AuthLayout authentication={true} ><UploadSongs /></AuthLayout>} />
    </Route>

    <Route>
      <Route path="register" element={<AuthLayout authentication={false} ><Register/></AuthLayout>}/>
      <Route path="verify-otp" element={<OtpPage/>}/>
      <Route path="login" element={<AuthLayout authentication={false} ><LoginPage/></AuthLayout>}/>
    </Route>
  </Route>
]));

createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
);
