import { useState, useEffect, useRef } from 'react'
import * as Api from '@api'
import { Search } from '@components'
import { Player } from '@components'
import './main.css'

const Main = () => {
  const vidEl = useRef(null)
  const [displayVideos, setDisplayVideos] = useState([])
  const [hasResults, setHasResults] = useState(true)
  const [currentVid, setCurrentVid] = useState(null)
  const [vidIndex, setVidIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [values, setValues] = useState({
    query: '',
    numberOfVideos: 10,
  })

  useEffect(() => {
    setCurrentVid(displayVideos[vidIndex])
  }, [vidIndex, displayVideos])

  useEffect(() => {
    if (currentVid) vidEl.current.load()
  }, [currentVid])

  const getData = async ({ query, perPage }) => {
    setIsLoading(true)
    try {
      const { videos, total_results } = await Api.getVideos({ query, perPage })
      setDisplayVideos(videos)
      if (total_results < values.numberOfVideos) setValues({ ...values, numberOfVideos: total_results })
      setHasResults(total_results !== 0)
    } catch (e) {
      window.alert(e)
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }

  const getNextVideo = () => (vidIndex === displayVideos.length - 1 ? setVidIndex(0) : setVidIndex(prev => ++prev))

  const handleSubmit = e => {
    e.preventDefault()
    const { query, numberOfVideos } = values
    if (!query) return
    getData({ query, perPage: numberOfVideos })
  }

  const handleSearchChange = e => {
    values.numberOfVideos === 0
      ? setValues({ query: e.target.value, numberOfVideos: 10 })
      : setValues({ ...values, query: e.target.value })
  }

  return (
    <main>
      <Search
        handleSubmit={handleSubmit}
        query={values.query}
        numberOfVideos={values.numberOfVideos}
        handleSearchChange={handleSearchChange}
        handleNumChange={e => setValues({ ...values, numberOfVideos: e.target.value })}
      />
      <Player
        video={currentVid}
        onEnded={() => getNextVideo()}
        vidEl={vidEl}
        isLoading={isLoading}
        hasResults={hasResults}
      />
    </main>
  )
}

export default Main
