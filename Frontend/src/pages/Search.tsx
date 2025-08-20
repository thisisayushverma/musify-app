import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { searchHandler } from '../features/search';
import type { ISearchSongsProps } from '../components/types.ts';
import HomeCard from '../components/HomeCard.tsx';

function Search() {
  const {search}  = useParams();  
  const [searchedSong,setSearchSong] = useState<ISearchSongsProps[]>([]);
  useEffect(()=>{
    const searching = async (search:string)=>{
      const result = await searchHandler(search);
      if(result.data.length>0){
        setSearchSong(result.data);
      }
    }

    if(search !== undefined && search.trim().length > 0){
      searching(search.trim());
    }
  },[search])

  return (
    <div className='text-white m-1 rounded-lg p-2 h-full'>
      {
        searchedSong.length > 0 ? (
          <div className='w-full'>
            <h1 className='font-semibold text-2xl my-1'>Songs</h1>
            <div className='w-full flex gap-2 overflow-auto scrollbar-hide '>{
                searchedSong.map((song:ISearchSongsProps)=>{
                  return(
                    <HomeCard key={song._id} _id={song._id} name={song.title} imgUrl={song.image_url} artist={song.artist}/>
                  )
                })
              }</div>
          </div>
        ) : null
      }    
    </div>  
  )
}

export default Search
