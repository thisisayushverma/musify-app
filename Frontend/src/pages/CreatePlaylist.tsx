import React, { useEffect } from "react";
import musicLogo from "../assets/musicLogo.svg";
import searchIcon from "../assets/search.svg";
import EditInfoPlaylist from "../components/EditInfoPlaylist";
import { searchSongsHandler } from "../features/search";
import type { ISearchSongsProps } from "../components/types";
import DurationView from "../components/DurationView";
import { createPlaylistHandler } from "../features/playlist";

function CreatePlaylist() {
  const [playlistName, setPlaylistName] =
    React.useState<string>("New Playlist");
  const [playlistDesc, setPlaylistDesc] =
    React.useState<string>("Give a description");
  const [isPrivate, setIsPrivate] = React.useState<boolean>(false);
  const [playlistImage, setPlaylistImage] = React.useState<File | null>(null);
  const [audioList, setAudioList] = React.useState<ISearchSongsProps[]>([]);
  const [uploadListId, setUploadListId] = React.useState<string[]>([]);
  const [search, setSearch] = React.useState<string>("");
  const [searchList, setSearchList] = React.useState<ISearchSongsProps[]>([]);

  const [dailog, setDialog] = React.useState<boolean>(false);

  useEffect(() => {
    const searchSongs = async (search: string) => {
      await searchSongsHandler(search).then((res) => {
        if (res.status === 200 && res.data.length > 0) {
          setSearchList(res.data);
        }
      });
    };
    if (search.length > 0 && search.trim().length > 0) searchSongs(search);
  }, [search]);

  const handleAddSong = (addSongId: string) => {
    const tempAudioList = uploadListId.filter((id) => id !== addSongId);
    tempAudioList.push(addSongId);
    setUploadListId([...tempAudioList]);

    const tempSearchList = audioList.filter((id) => id._id === addSongId);
    if (tempSearchList.length === 0) {
      setAudioList([
        ...audioList,
        searchList.filter((id) => id._id === addSongId)[0],
      ]);
    }
  };

  const handleRemoveSong = (removeSongId: string) => {
    const tempAudioList = audioList.filter((id) => id._id !== removeSongId);
    setAudioList([...tempAudioList]);
    const tempUploadList: string[] = [];
    audioList.map((audio: ISearchSongsProps) => tempUploadList.push(audio._id));
    setUploadListId([...tempUploadList]);
  };

  const handleSave = async() => {
    const formData = new FormData();
    formData.append("title", playlistName);
    formData.append("description", playlistDesc);
    formData.append("isPublic", JSON.stringify(isPrivate));
    formData.append("thumbnail", playlistImage!);
    formData.append("listOfSongs", JSON.stringify(uploadListId));

    const response = await createPlaylistHandler(formData);
    if(response === null) return;
    
    console.log(response);

    alert("Playlist created successfully");

    // navigate to playlist page with playlist id

  };

  return (
    <div className={`w-full h-full relative rounded-lg my-2 `}>
      <div className={`${dailog && "blur-sm"}`}>
        {/* playlist details or headers */}
        <div className="h-[15rem] relative flex items-center p-5 bg-linear-to-b from-[#3a3a3a] to-[#181818] rounded-t-lg">
          <div className="h-[12rem] w-[12rem] bg-[#303030] rounded-md flex items-center justify-center">
            {playlistImage ? (
              <img
                src={URL.createObjectURL(playlistImage)}
                className="h-full w-full"
              />
            ) : (
              <img src={musicLogo} className="h-[5rem] w-[5rem]" />
            )}
          </div>
          <div className="px-5">
            <p className="font-bold text-sm">
              {isPrivate ? "Private" : "Public"} Playlist
            </p>
            <p className="font-bold text-5xl my-2">{playlistName}</p>
            <p className="text-sm">{playlistDesc}</p>
          </div>
          <div
            className="absolute bottom-5 right-[7rem] h-[2rem] w-[5rem] bg-black rounded-md flex item-center justify-center cursor-pointer "
            onClick={() => {
              setDialog(true);
            }}
          >
            <p className="w-fit font-bold my-auto">Edit</p>
          </div>

          <div
            className="absolute bottom-5 right-5 h-[2rem] w-[5rem] bg-black rounded-md flex item-center justify-center cursor-pointer"
            onClick={handleSave}
          >
            <p className="w-fit font-bold my-auto">Save</p>
          </div>
        </div>
        {/*added audio List  */}

        <div>
          <div className="w-full h-[1px] bg-[#3a3a3a]"></div>
          {audioList.length > 0 ? (
            <div>
              <div className="font-bold text-2xl my-2 mx-4">Added Songs List</div>
              <div className="w-full flex gap-2 items-center  my-2 px-2 text-lg font-semibold text-[#726d6d]">
                <div className="mx-2 text-2xl  w-[5%]">#</div>
                <div className="flex gap-3 w-[50%] ">Title</div>
                <div className="w-[40%] text-left shrink-0 ">Duration</div>
                <div className="w-[10%] shrink-0"></div>
              </div>
              {
            audioList.map((song: ISearchSongsProps, index: number) => {
              return (
                <div

                  key={song._id}
                  className="w-full flex gap-2 items-center my-2 px-2  cursor-pointer"
                >
                  <div className=" mx-2 text-xl w-[5%] ">
                    {index + 1}
                  </div>
                  <div className="flex gap-3 w-[50%] ">
                    <img
                      src={song.image_url}
                      className="w-[3rem] h-[3rem] rounded-md object-cover shrink-0"
                    />
                    <div className="flex flex-col">
                      <p className="font-semibold">{song.title}</p>
                      <p className="text-sm font-semibold text-[#726d6d]">
                        {song.artist}
                      </p>
                    </div>
                  </div>

                  <div className="w-[40%] text-left shrink-0 ">
                    <DurationView duration={song.duration} />
                  </div>

                  <div className="w-[10%] shrink-0 ">
                    <button
                      className="rounded-full px-6 py-1 font-bold text-lg bg-[#3d3d3d] cursor-pointer"
                      onClick={() => {
                        handleRemoveSong(song._id);
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })
          }
            </div>

          ) : null}
        </div>

        {/* audio searching */}
        <div className="my-2">
          <div className="w-full h-[1px] bg-[#3a3a3a] my-4 mt-6"></div>
          <h1 className="text-2xl font-bold">Add song's for playlist</h1>
          <div className="w-[60%] bg-[#303030] rounded-md my-2 flex gap-2 p-2 ">
            <img src={searchIcon} />
            <input
              placeholder="Search for song"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-lg focus:outline-none"
            />
          </div>

          {/* search result  */}
          <div className="w-full">
            {searchList.length > 0 ? (
              <div className="w-full flex flex-col gap-3 px-4">
                {searchList.map((song: ISearchSongsProps, index: number) => {
                  return (
                    <div
                      key={song._id}
                      className="w-full flex gap-2 items-center justify-between"
                    >
                      <div className="flex gap-3 flex-1">
                        <img
                          src={song.image_url}
                          className="w-[3rem] h-[3rem] rounded-md object-cover shrink-0"
                        />
                        <div className="flex flex-col">
                          <p className="font-semibold">{song.title}</p>
                          <p className="text-sm font-semibold text-[#726d6d]">
                            {song.artist}
                          </p>
                        </div>
                      </div>

                      <div className="w-[40%] text-left shrink-0">
                        <DurationView duration={song.duration} />
                      </div>

                      <button
                        className="rounded-full px-6 py-1 font-bold text-lg bg-[#3d3d3d] cursor-pointer"
                        onClick={() => {
                          handleAddSong(song._id);
                        }}
                      >
                        Add
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 pt-3 pb-5 rounded-md  bg-[#181818]  w-[40%]  flex-col  ${
          dailog ? "flex" : "hidden"
        }`}
      >
        <EditInfoPlaylist
          setDialog={setDialog}
          setPlaylistName={setPlaylistName}
          playlistName={playlistName}
          setPlaylistDesc={setPlaylistDesc}
          playlistDesc={playlistDesc}
          setPlaylistImage={setPlaylistImage}
          playlistImage={playlistImage}
          isPrivate={isPrivate}
          setIsPrivate={setIsPrivate}
        />
      </div>
    </div>
  );
}

export default CreatePlaylist;
