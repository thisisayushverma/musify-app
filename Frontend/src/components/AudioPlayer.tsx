
import AudioComponent from './AudioComponent'
import PlayerSection from './PlayerSection'
import VolumeSection from './VolumeSection'

function AudioPlayer() {
  return (
    <div className='flex gap-2 justify-between w-full h-20 bg-[#181818]'>
      <AudioComponent/>
      <PlayerSection/>
      <VolumeSection/>
    </div>
  )
}

export default AudioPlayer
