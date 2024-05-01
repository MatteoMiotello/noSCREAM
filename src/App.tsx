import { useCallback, useEffect, useState } from 'react'

import useVolumeLevel from './hooks/useVolumeLevel';
// @ts-ignore
import useSound from 'use-sound';
import SoundBar from './components/SoundBar';
import ReactSlider from 'react-slider';


function App() {
  const [threshold, setThreshold] = useState( Number( window.localStorage.getItem('threshold') ) || 50 )
  const [startRecording, _, volume] = useVolumeLevel()
  const [playSound] = useSound('beep.mp3', {
    interrupt: true,
  })

  const setThresholdAndSave = useCallback( (value: number) => {
    setThreshold(value)
    window.localStorage.setItem('threshold', value.toString())
  }, [])

  useEffect(() => {
    startRecording()
  }, []);

  useEffect(() => {
    if (volume > threshold) {
      playSound()
    }

  }, [volume, threshold])


  return (
    <main className='flex flex-col h-screen w-screen bg-gray-700 py-24'>
      <h1 className='text-white font-bold uppercase text-6xl mx-auto shadow rounded-md'>
        NoSCREAM!!!!
      </h1>
      <div className='flex items-bottom justify-center min-h-full py-16 gap-24'>
        <div className='flex'>
          <SoundBar volume={volume} threshold={threshold} />
        </div>

        <div className='flex flex-col items-center justify-center gap-10'>
          <span className='text-white text-2xl uppercase'>
            Set the threshold:
          </span>
          <ReactSlider
            value={threshold}
            className="border rounded-md p-2 w-96 h-12 flex items-center"
            thumbClassName="border-2 border-white bg-gray-700 text-white font-bold w-10 h-10 rounded-md flex items-center justify-center cursor-pointer"
            trackClassName="bg-green-300 border border-black h-1 rounded-full m-2"
            onChange={(value) => setThresholdAndSave(value)}
            renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
          />

        </div>
      </div>
    </main>
  )
}

export default App
