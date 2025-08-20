import React, { useEffect, useState } from "react";
import uploadIcon from "../assets/upload-main.svg";
import deleteIcon from "../assets/deleteIcon.svg";
import uploadThumbnailIcom from "../assets/uploadThumbnailIcon.svg";
import genreList from "../config/genre.config";
import { createAudioSchema, uplaodAudioFile } from "../features/audio";
import { useNavigate } from "react-router-dom";

function UploadSongs() {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [isPublic, setIsPublic] = useState<boolean>(false);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [titleInput,setTitleInput] = useState<string>("");
  const [tagInput, setTagInput] = useState<string>("");
  const [selectedGenre, setSelectedGenre] = useState<string[]>([]);
  const [audioId,setAudioId] = useState("");
  const [duration,setDuration] = useState<number>(0);
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false);

  // Functions
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("file change", e.target.files);

    setAudioFile(e.target.files![0]);

    const audio = new Audio();
    audio.src = URL.createObjectURL(e.target.files![0]);
    console.log("audio", audio);  
    
    audio.addEventListener("loadedmetadata",()=>{
      console.log(audio.duration);
      setDuration(audio.duration);
    });
    console.log(duration);
  };

  const handleInputFile = async () => {
    if (audioFile) {
      setLoading(true);
      console.log("btn clicked");
      console.log(audioFile);
      try {
        const result = await uplaodAudioFile({file:audioFile});
        setAudioId(result.data.filename);
        setShowForm(true);
      } catch (error) {
        alert("Error"+error)
      }
      setLoading(false);
    }
    else{
      alert("Upload Audio File First.....")
    }
  };

  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setThumbnailFile(e.target.files![0]);
  };

  const handleRemoveTag = (ind: number) => {
    let tempTags = tags.filter((_, index) => index !== ind);
    setTags([...tempTags]);
  };

  
  const handleAddGenre = (val:string)=>{
    let tempSelectedGenreArray = selectedGenre;
    const genreOriginalArraySize = selectedGenre.length;
    
    tempSelectedGenreArray=tempSelectedGenreArray.filter((item)=> item!==val);
    if(tempSelectedGenreArray.length === genreOriginalArraySize){
      tempSelectedGenreArray.push(val)
      setSelectedGenre([...tempSelectedGenreArray])
    }
  }

  const handleRemoveGenre = (ind:number)=>{
    const tempArray = selectedGenre.filter((_,i)=> i!==ind)
    setSelectedGenre([...tempArray])
  }

  const handleAudioUpload = async ()=>{
    console.log(tags,selectedGenre);
    
    if(!titleInput || selectedGenre.length === 0 || !thumbnailFile || tags.length === 0 || !audioFile || !audioId || !duration){
      console.log("All Field are mandatory");
      alert("All Field are mandatory"+duration);
      return
    }

    try {
      setLoading(true);
      console.log(duration);
      const result = await createAudioSchema({title:titleInput,duration:duration,genre:selectedGenre,thumbnail:thumbnailFile,tags,audioId,isPublic})
      console.log("result after audio uploaded",result);
      if(result.status === 200){
        navigate('/your-library');
      }
      else{
        // here schema is not able to create but audio file may be uploaded please check carefully
        const error = new Error("error while uploading audio"+result?.message)
        throw error
      }
    } catch (error) {
      alert("Error:-"+ error)
      navigate('/')
    }

    setLoading(false);
  }



  return (
    <div className=" border-white h-full  m-1 rounded-xl flex items-center justify-center overflow-y-auto ">
      { loading ? <div>"Loading..."</div> : !showForm ? (
        <div className="w-[50%]">
          <label
            htmlFor="fileInput"
            className="flex flex-col items-center justify-center gap-2  border-3  border-dashed border-white  p-4  rounded-xl cursor-pointer"
          >
            <img className="h-[10rem]" src={uploadIcon} />
            <p className="text-lg text-gray-500 mb-1 item-center">
              {audioFile ? audioFile.name : "Click to upload or drag and drop"}
            </p>
            <input
              id="fileInput"
              className="bg-white hidden"
              type="file"
              accept="audio/*"
              onChange={handleFileChange}
            />
            <button
              className="text-white bg-[#7d7d7d]  w-[50%] p-2  rounded-xl cursor-pointer hover:bg-[#4d4d4d]"
              onClick={handleInputFile}
            >
              Upload
            </button>
          </label>
        </div>
      ) : (
        <div className="w-[60%] h-full flex flex-col ">
          <audio
            controls
            src={audioFile ? URL.createObjectURL(audioFile) : ""}
          />
          <form className="text-white m-2 w-full flex flex-col items-center">
            <label htmlFor="titleInp" className="flex gap-2 flex-col m-2 p-2 w-full">
              <p className="text-lg ">Title</p>
              <input
                id="titleInp"
                value={titleInput}
                onChange={(e)=>setTitleInput(e.target.value)}
                type="text"
                className="border-2 border-white rounded-lg p-1 px-2 "
              />
            </label>

            <label htmlFor="genreInp" className="flex gap-2 flex-col m-2">
              <p className="text-lg">Genre</p>
              <div className="w-full border-2 p-2 py-4 max-h-[10rem] overflow-auto scrollbar-hide flex flex-wrap rounded-xl gap-2">
                {selectedGenre.length > 0 ? (
                  selectedGenre.map((item, ind) => (
                    <div
                      key={ind}
                      className="bg-gray-900 px-3 py-1 flex gap-2 rounded-lg whitespace-nowrap"
                    >
                      <p className="text-white text-lg  inline-block " key={ind}>
                        {item}
                      </p>
                      <img
                        src={deleteIcon}
                        className="w-5  cursor-pointer"
                        onClick={() => handleRemoveGenre(ind)}
                      />
                    </div>
                  ))
                ) : (
                  <p className="w-full text-center  px-3 py-1 rounded-lg whitespace-nowrap">
                    Genre is not added
                  </p>
                )}
              </div>
              <div>
                <div className="w-full">

                  <div className={`w-full border-2 p-1 max-h-[10rem] my-2 overflow-auto flex flex-wrap rounded-xl }`}>
                    {
                      genreList.map((item,ind)=>(
                        <div key={ind} onClick={()=>handleAddGenre(item)} className="bg-gray-900 w-fit m-1 my-2 p-1 px-2 rounded-lg cursor-pointer">
                          {item}
                        </div>
                      ))
                    
                  }
                  </div>
                </div>
              </div>
            </label>

            <label className="m-2 my-4 flex flex-col gap-2 w-full">
              <p className="text-lg">Thumbnail</p>
              <div className="border-2 border-white border-dashed rounded-lg p-2 flex flex-col items-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    handleThumbnailUpload(e);
                  }}
                  className="bg-white hidden"
                />
                <img className="h-20 w-20" src={uploadThumbnailIcom} />
                <p className="text-center truncate max-w-full">
                  {thumbnailFile ? thumbnailFile.name : "Upload thumbnail"}
                </p>
              </div>
            </label>

            <label className="flex gap-2 m-2 w-full">
              <p className="text-lg">Public</p>
              <div className="bg-white h-[2rem] w-[3rem] flex items-center justify-center rounded-full relative">
                <div
                  className={`w-[1.5rem] h-[1.5rem] bg-black rounded-full absolute top-1 ${
                    isPublic ? "left-1" : "right-1"
                  }`}
                ></div>
              </div>
              <input
                type="checkbox"
                checked={isPublic}
                className="hidden"
                onChange={(e) => setIsPublic(e.target.checked)}
              />
              <p className="text-lg">Private</p>
            </label>

            <label htmlFor="tagsInp" className="flex gap-2 flex-col m-2 w-full">
              <p className="text-lg">Tags</p>
              <div className="w-full border-2 p-1 py-4 max-h-[10rem] overflow-auto scrollbar-hide flex flex-wrap rounded-xl">
                {tags.length > 0 ? (
                  tags.map((tag, i) => (
                    <div key={i} className="bg-gray-900 w-fit  flex gap-1 m-1 my-2 p-1 px-2 rounded-lg">
                      <p className="text-white text-lg  inline-block " key={i}>
                        {tag}
                      </p>
                      <img
                        src={deleteIcon}
                        className="w-5  cursor-pointer"
                        onClick={() => handleRemoveTag(i)}
                      />
                    </div>
                  ))
                ) : (
                  <p className="text-white w-full text-center  text-lg">
                    {" "}
                    Add Tags ...{" "}
                  </p>
                )}
              </div>
              <input
                id="tagsInp"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="Add a tag..."
                onKeyDown={(e) => {
                  if (e.key === "Enter" && tagInput.trim() !== "") {
                    setTags([...tags, tagInput]);
                    setTagInput("");
                  }
                }}
                type="text"
                className="border-1  border-white rounded-lg p-1 px-2"
              />
            </label>

            <button type="button" className="bg-green-600 cursor-pointer m-auto my-5 p-3 text-lg font-bold rounded-lg w-[70%]" onClick={handleAudioUpload}>
              Upload Song
            </button>

          </form>
          
        </div>
      )
      }
    </div>
  );
}

export default UploadSongs;
