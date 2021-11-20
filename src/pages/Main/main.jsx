import { useState, useEffect, useRef } from 'react'
import * as Api from '@api'
import { Player } from '@components'

const Main = ({ title }) => {
  const query = 'Tiger'
  const [displayVideos, setDisplayVideos] = useState([])
  const [currentVid, setCurrentVid] = useState(null)
  const vidEl = useRef(null)

  useEffect(() => {
    const getData = async () => {
      const response = await Api.getVideos({ query, perPage: 8 })
      setDisplayVideos(response.videos)
    }
    getData()
  }, [])

  useEffect(() => {
    setCurrentVid(displayVideos[0])
  }, [displayVideos])

  const handleEnded = () => {
    setCurrentVid(displayVideos[6])
    vidEl.current.load()
  }

  return (
    <div>
      <h2>{title}</h2>
      <Player video={currentVid} onEnded={() => handleEnded()} vidEl={vidEl} />
    </div>
  )
}

export default Main
