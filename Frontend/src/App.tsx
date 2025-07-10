import "./App.css";
import AudioPlayer from "./components/AudioPlayer.tsx";
import NavCard from "./components/NavCard.tsx";
import { store } from "./store/store.ts";
// Icon imports
import homeIcon from "../src/assets/home.svg";
import searchIcon from "../src/assets/search.svg";
import libraryIcon from "../src/assets/library.svg";
import createPlaylistIcon from "../src/assets/createPlaylist.svg";
import likeIcon from "../src/assets/liked.svg";
import uploadIcon from "../src/assets/upload.svg";
import PlaylistCard from "./components/PlaylistCard.tsx";
import { Outlet } from "react-router-dom";


function App() {
  console.log(store.getState());
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   console.log("i'm calling app before");

  //   // const getUserDetails = async () => {
  //   //   await fetch(config.backendUrl + "/user/", {
  //   //     credentials: "include",
  //   //     method: "GET",
  //   //   })
  //   //     .then((res) => res.json())
  //   //     .then((data) => {
  //   //       if (data.status === 201) {
  //   //         console.log("data status code 201", data);
  //   //         dispatch(setUserLogin({ user: data.data, isAuthenticated: true }));
  //   //       } else {
  //   //         throw new Error(data.message);
  //   //       }
  //   //     })
  //   //     .catch((error) => {
  //   //       console.log("data status code not 201", error);
  //   //     });
  //   // };

  //   // getUserDetails();
  //   console.log("i'm calling app after");
  // }, []);

  return (
    <>
      <div className="bg-black h-screen max-h-full p-2 w-full flex flex-col overflow-hidden justify-between">
        <div className="flex w-full h-[90%] pb-3">
          <div className="w-[15%] h-[100%] pb-1 border-1 rounded-2xl border-gray-50  flex flex-col ">
            <div className="p-2 flex-1 ">
              <NavCard title="Home" icon={homeIcon} />
              <NavCard title="Search" icon={searchIcon} path="search" />
              <NavCard
                title="Your Library"
                icon={libraryIcon}
                path="your-library"
              />
              <hr className="mx-4 border-t border-gray-700" />
              <NavCard
                title="Create Playlist"
                icon={createPlaylistIcon}
                path="create-playlist"
              />
              <NavCard title="Liked Songs" icon={likeIcon} path="liked-songs" />
              <NavCard
                title="Upload Songs"
                icon={uploadIcon}
                path="upload-songs"
              />
              <hr className="mx-4 border-t border-gray-700" />
            </div>
            <div className="flex-1 m-1 px-3 overflow-y-auto  hide-scrollbar">
              <PlaylistCard title="Playlist 1" />
            </div>
          </div>

          <div className="w-[85%] h-full">
            <Outlet />
          </div>
        </div>
        <div className="h-max w-full">
          <AudioPlayer />
        </div>
      </div>
    </>
  );
}

export default App;
