import React from 'react'
import ToggleIcon from '../ToggleIcon'
import MusicCard from '../Card/MusicCard'
import ShuffleIcon from '../ShuffleIcon';
import PausePlay from '../PausePlay';
import RepeatIcon from '../RepeatIcon';

function MusicPlayer() {
    console.log("hello from player");
    return (
        <div className='w-full bg-[#121212]'>
            <div className='w-full h-[10px] bg-white border-4'/>
            <div className='w-full p-5'>
                <div className='flex gap-5 items-center'>
                    <MusicCard  title="Shape of You" artist="Ed Sheeran"/>
                    <ToggleIcon/>
                </div>
                <div>
                    <ShuffleIcon/>
                    <PausePlay/>
                    <RepeatIcon/>
                </div>
                <div>

                </div>
            </div>
        </div>
    )
}

export default MusicPlayer
