import React, { useState } from "react";
import musicLogo from "../assets/musicLogo.svg";
import type { IEditInfoProps } from "./types";

function EditInfoPlaylist({
  setDialog,
  playlistName,
  playlistDesc,
  isPrivate,
  playlistImage,
  setPlaylistName,
  setPlaylistDesc,
  setIsPrivate,
  setPlaylistImage,
}: IEditInfoProps) {
  const [tempPlaylistName, setTempPlaylistName] =
    useState<string>(playlistName);
  const [tempPlaylistDesc, setTempPlaylistDesc] =
    useState<string>(playlistDesc);
  const [tempIsPrivate, setTempIsPrivate] = useState<boolean>(isPrivate);
  const [tempPlaylistImage, setTempPlaylistImage] = useState<File | null>(
    playlistImage
  );
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleImgClick = () => {
    fileInputRef.current?.click();
  };

  const handleSave = () => {
    setPlaylistName(tempPlaylistName);
    setPlaylistDesc(tempPlaylistDesc);
    setIsPrivate(tempIsPrivate);
    setPlaylistImage(tempPlaylistImage);
    setDialog(false);
  };

  return (
    <div className="flex flex-col z-2">
      <div className="w-full p-2 my-2 flex justify-between">
        <div className="font-bold text-2xl">Edit Details</div>
        <div
          className="h-[2rem] w-[5rem] bg-[#303030] rounded-md flex item-center justify-center cursor-pointer"
          onClick={() => {
            setDialog(false);
          }}
        >
          <p className="w-fit font-bold my-auto">Close</p>
        </div>
      </div>

      <div className="flex gap-2">
        {/* image of playlist */}
        <div
          className="h-[12rem] w-[24rem] bg-[#303030] relative   rounded-md flex items-center justify-center"
          onClick={() => handleImgClick()}
        >
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={(e) =>
              e.target.files?.[0] && setTempPlaylistImage(e.target.files![0])
            }
            className="hidden"
          />
          {tempPlaylistImage ? (
            <img
              src={URL.createObjectURL(tempPlaylistImage)}
              className="h-full w-full"
            />
          ) : (
            <img src={musicLogo} className="h-[5rem] w-[5rem]" />
          )}

          {/* delete icon  */}
          <div
            className={`absolute top-2 right-2 bg-[#303030] rounded-full p-2 cursor-pointer ${
              tempPlaylistImage ? "" : "hidden"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-5"
              onClick={(e) => {
                e.stopPropagation();
                setTempPlaylistImage(null);
              }}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </div>
        </div>

        {/* playlist details */}
        <div className="w-full  flex flex-col items-center">
          <input
            value={tempPlaylistName}
            onChange={(e) => setTempPlaylistName(e.target.value)}
            placeholder="Playlist Name"
            className="my-2 rounded-md w-[98%] bg-[#303030] outline-none p-2"
          />
          <input
            placeholder="Add an optional description"
            value={tempPlaylistDesc}
            onChange={(e) => setTempPlaylistDesc(e.target.value)}
            className="my-2 rounded-md w-[98%] bg-[#303030] outline-none p-2"
          />
          <div className="text-lg font-semibold flex gap-2 my-2">
            Public
            <div
              className="relative h-[2rem] w-[4rem] bg-[#303030] rounded-full p-1"
              onClick={() => setTempIsPrivate((prev) => !prev)}
            >
              <div
                className={`absolute ${
                  tempIsPrivate
                    ? "right-0 -translate-x-1"
                    : " left-0 translate-x-1"
                }  h-[1.5rem] w-[1.5rem] bg-white rounded-full`}
              ></div>
            </div>
            <input
              type="checkbox"
              checked={tempIsPrivate}
              className="hidden"
              onChange={(e) => setTempIsPrivate(e.target.checked)}
            />
            Private
          </div>
        </div>
      </div>

      <button
        className="my-3 rounded-md w-[98%] bg-[#303030] outline-none p-2 font-semibold text-xl cursor-pointer hover:invert transition"
        onClick={handleSave}
      >
        Save
      </button>
    </div>
  );
}

export default EditInfoPlaylist;
