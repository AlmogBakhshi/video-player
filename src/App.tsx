import { useState } from 'react'
import VideoPlayer from './components/videoPlayer';



function App() {
  const [file, setFile] = useState<File | null>(null)


  const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files?.[0] || null)
  }

  return (
    <div className='video-container'>
      <input type='file' accept='video/*' onChange={handleChangeFile} />
      {file && <VideoPlayer duration={(duration) => console.log(duration)} videoSrc={URL.createObjectURL(file)} />}
    </div>
  )
}

export default App
