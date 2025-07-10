import { useEffect, useState } from 'react'
import { getAllYourAudio } from '../features/audio';
import AudioCard from '../components/AudioCard';

interface IAudioCardProps {
  title:string,
  image_url:string,
  genre:string,
  duration:number,
  _id:string,
  isLiked:boolean,
  audioUuId:string,
  artist:string
}

function Library() {
  
  const [audioList, setAudioList] = useState([]);

  useEffect(()=>{
    (
      async ()=>{
        try {
          const fetchAllAudio = await getAllYourAudio();
          console.log(fetchAllAudio);
          setAudioList(fetchAllAudio.data);
        } catch (error) {
          alert("error while getting your audio"+ error);
        }
      }
    )();
  },[])

  return (
    <div className='h-full text-white w-full border-2 mx-2 border-white p-2'>
      {
        audioList.length===0?(
          <div>
            <h1 className=''>NO audio found in Library</h1>
          </div>
        ):(<div className='w-full'>
          {
            audioList.map((audio:IAudioCardProps)=>{
              console.log("map",audio._id);
              
              return(
                <AudioCard key={audio._id} title={audio.title} thumbnail={audio.image_url} genre={audio.genre} duration={audio.duration} audio_id={audio._id} isLiked={audio.isLiked} audioUuId={audio.audioUuId} artist={audio.artist}/>
              )
            })
          }
        </div>)
      }
    </div>
  )
}

export default Library
