import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../store/store.ts";
import { setIsLiked } from "../reduxSlice/audioSlice.ts";

function AudioComponent() {
  const audioDetails = useSelector((state: RootState) => state.audio);
  const dispatch = useDispatch<AppDispatch>();
  // console.log("audioDetails", audioDetails);

  return (
    <div className="flex items-center">
      <img className="w-16 h-16 m-2"  src={audioDetails.audioThumbnail} alt="" />
      <div>
        <p className="text-white font-bold">{audioDetails.audioTitle}</p>
        <p className="text-gray-500">{audioDetails.artist}</p>
      </div>
      <div className="flex items-center p-2 m-2" onClick={() => dispatch(setIsLiked())}>
        {audioDetails.isLiked ? (
          <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.44 0.101562C12.63 0.101562 11.01 0.981562 10 2.33156C8.99 0.981562 7.37 0.101562 5.56 0.101562C2.49 0.101562 0 2.60156 0 5.69156C0 6.88156 0.19 7.98156 0.52 9.00156C2.1 14.0016 6.97 16.9916 9.38 17.8116C9.72 17.9316 10.28 17.9316 10.62 17.8116C13.03 16.9916 17.9 14.0016 19.48 9.00156C19.81 7.98156 20 6.88156 20 5.69156C20 2.60156 17.51 0.101562 14.44 0.101562Z" fill="#1DB954"/>
          </svg>
          
        ) : (
            <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 19.6501C10.69 19.6501 10.39 19.6101 10.14 19.5201C6.32 18.2101 0.25 13.5601 0.25 6.6901C0.25 3.1901 3.08 0.350098 6.56 0.350098C8.25 0.350098 9.83 1.0101 11 2.1901C12.17 1.0101 13.75 0.350098 15.44 0.350098C18.92 0.350098 21.75 3.2001 21.75 6.6901C21.75 13.5701 15.68 18.2101 11.86 19.5201C11.61 19.6101 11.31 19.6501 11 19.6501ZM6.56 1.8501C3.91 1.8501 1.75 4.0201 1.75 6.6901C1.75 13.5201 8.32 17.3201 10.63 18.1101C10.81 18.1701 11.2 18.1701 11.38 18.1101C13.68 17.3201 20.26 13.5301 20.26 6.6901C20.26 4.0201 18.1 1.8501 15.45 1.8501C13.93 1.8501 12.52 2.5601 11.61 3.7901C11.33 4.1701 10.69 4.1701 10.41 3.7901C9.48 2.5501 8.08 1.8501 6.56 1.8501Z" fill="white"/>
            </svg>
        )}
      </div>
    </div>
  );
}

export default AudioComponent;
