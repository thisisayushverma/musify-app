import "./App.css";
import AudioPlayer from "./components/AudioPlayer.tsx";
import NavCard from "./components/NavCard.tsx";
import { store, type RootState } from "./store/store.ts";
import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import config from "./config/config.ts";
// Icon imports
import homeIcon from "../src/assets/home.svg";
import libraryIcon from "../src/assets/library.svg";
import createPlaylistIcon from "../src/assets/createPlaylist.svg";
import likeIcon from "../src/assets/liked.svg";
import userIcon from "../src/assets/user.svg";
import uploadIcon from "../src/assets/upload.svg";
import PlaylistCard from "./components/PlaylistCard.tsx";
import { Outlet, useNavigate } from "react-router-dom";
import UserDialog from "./components/UserDialog.tsx";
import SearchBar from "./components/SearchBar.tsx";

function App() {
  console.log(store.getState());
  const {isAuthenticated} = useSelector((state:RootState)=>state.user)
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const [showUserDialog, setShowUserDialog] = useState(false);

  // useEffect(() => {
  //   console.log("i'm calling app before");

  //   const getUserDetails = async () => {
  //     await fetch(config.backendUrl + "/user/", {
  //       credentials: "include",
  //       method: "GET",
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         if (data.status === 201) {
  //           console.log("data status code 201", data);
  //           dispatch(setUserLogin({ user: data.data, isAuthenticated: true }));
  //         } else {
  //           throw new Error(data.message);
  //         }
  //       })
  //       .catch((error) => {
  //         console.log("data status code not 201", error);
  //       });
  //   };

  //   getUserDetails();
  //   console.log("i'm calling app after");
  // }, []);
  
  
  return (
    <div className="bg-black h-screen max-h-[100vh] p-2 w-full flex flex-col justify-between box-border">
      <div className="flex w-full h-[90%] pb-3">

        <div className="w-[15%] h-[100%] pb-1 border-1 rounded-2xl border-gray-50  flex flex-col ">
          <div className="p-2 ">
            <NavCard title="Home" icon={homeIcon} />
            {/* <NavCard title="Search" icon={searchIcon} path="search" />
              <NavCard
                title="Your Library"
                icon={libraryIcon}
                path="your-library"
              /> */}
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
          <div className="flex-1 m-1 px-3 h-full overflow-y-auto  hide-scrollbar">
            <PlaylistCard title="Playlist 1" />
          </div>
        </div>

        <div className="w-[85%] h-[100%] text-white m-1 p-1 flex flex-col"> 

          <div className="flex w-full h-fit justify-between">

              {/* Search bar  */}
              <SearchBar/>

              {/* User icon */}
            <div className="relative">
              <div className="bg-[#181818] h-[3rem] w-[3rem] cursor-pointer flex items-center p-2  rounded-full hover:invert transition duration-300">
                <img src={userIcon} className="h-[3rem] w-[3rem]" onClick={() => setShowUserDialog(!showUserDialog)} />
              </div>

                <div className={`absolute top-full right-0 z-2 my-3 transition-all delay-700  transform  ${showUserDialog ? "block" : "hidden"}`}>
                  {
                    isAuthenticated? (<UserDialog/>) : (<div className='dialog-box  w-[10rem] bg-[#303030] py-2'>
                      <button className='w-full text-left py-2 px-3 bg-green-800 font-semibold text-xl cursor-pointer' onClick={()=>{navigate('/login')}} >Login</button>
                    </div>)
                  }
                </div>
            </div>
            
          </div>

          <div className="w-full flex-1 h-[100%] overflow-auto scrollbar-hide">
            <Outlet />
          </div>

        </div>
      </div>

      <div className="h-max w-full">
        <AudioPlayer />
      </div>
    </div>
  );
}

export default App;
