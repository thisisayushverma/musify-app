import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import Hls from "hls.js";
import {
  setCurrentTime,
  setDuration,
  setIsPlaying,
} from "../reduxSlice/playerSLice";
import config from "../config/config";

type Props = {};

function AudioProgressBar({}: Props) {
  const dispatch = useDispatch();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const [showSeeker, setShowSeeker] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const { currentTime, duration, isPlaying } = useSelector(
    (state: RootState) => state.player
  );

  const { audioUrl } = useSelector((state: RootState) => state.audio);

  const [progress, setProgress] = useState<number>(
    (currentTime * 100) / duration
  );

  // let progress:number = 100;
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    // console.log("audio element", audioRef);

    const hls = new Hls({
      xhrSetup: function(xhr, url) {
        xhr.withCredentials = true;
      }
    });

    const handleFetchAudioUrl = async () => {
      const response = await fetch(
        config.backendUrl + `/get-audio/${audioUrl}/128k`,{
          credentials:"include",
          method:"GET"
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log("data from be",data);
          return data.url;
        })
        .catch((error) => {
          console.log("error while getting audio url", error);
          throw error;
        });

      return response;
    };

    try {
      handleFetchAudioUrl().then((audioApi) => {
        if (Hls.isSupported()) {
          console.log("audio loadedd");
          
          hls.loadSource(audioApi);
          hls.attachMedia(audio);
          // console.log(hls);
        } else {
          audio.src = audioUrl;
          audio.load();
        }

        audio.ontimeupdate = () => {
          dispatch(setCurrentTime(audio.currentTime.toFixed(0)));
          setProgress(() => {
            return (audio.currentTime * 100) / duration;
          });
        };
      });
    } catch (error) {
      alert("Error while getting audio url" + error);
    }

    return () => {
      hls.destroy();
    };
  }, []);

  useEffect(() => {
    // this for play and pause from custom to audio element
    if (isPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying]);

  const seeker = (e: MouseEvent) => {
    if (progressBarRef.current && audioRef.current) {
      // console.log("drag started", e);
      const rect = progressBarRef.current.getBoundingClientRect();
      const mouseDistance = e.clientX - rect.left;
      const seekTime = (mouseDistance / rect.width) * duration;
      setProgress((seekTime / duration) * 100);
      audioRef.current.currentTime = seekTime;
    }
    // audioRef?.current.currentTime = seekTime;
    // console.log(rect);
  };

  const handleShowSeeker = () => {
    setShowSeeker(() => {
      return true;
    });
  };

  const handleHideSeeker = () => {
    setShowSeeker(() => {
      return false;
    });
  };

  const handleMouseDown = (e: MouseEvent) => {
    // console.log("mouse down");
    seeker(e);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseUp = () => {
    // console.log("mouse up");
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    // console.log("mouse move");
    seeker(e);
  };

  useEffect(() => {
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  });

  return (
    <div className="flex  justify-between items-center w-full gap-2  text-gray-500">
      <audio ref={audioRef} controls className="w-full hidden"></audio>

      <p>{currentTime}</p>

      <div
        ref={progressBarRef}
        onMouseEnter={() => {
          handleShowSeeker();
        }}
        onMouseDown={handleMouseDown}
        onMouseLeave={() => {
          handleHideSeeker();
        }}
        className={`rounded-full hover:cursor-pointer bg-[#6a7282] h-1 w-full`}
      >
        <div
          className="flex items-center justify-end h-1 rounded-full bg-[#ffffff]"
          style={{ width: `${progress}%` }}
        >
          <div
            className="w-3 h-3 bg-white border-4 border-white rounded-full"
            style={{ display: showSeeker ? "block" : "none" }}
          ></div>
        </div>
      </div>
      <p>{duration}</p>
    </div>
  );
}

export default AudioProgressBar;
