import { useState, useEffect, useRef } from 'react'
import * as Api from '@api'
import { Search } from '@components'
import { Player } from '@components'
import './main.css'

const DEFAULTS = {
  COUNT: 10,
  TIME: 10,
  NO_RESULTS: 0,
}

const Main = () => {
  const { COUNT, TIME, NO_RESULTS } = DEFAULTS
  const vidEl = useRef(null)
  const [displayVideos, setDisplayVideos] = useState([])
  const [currentVid, setCurrentVid] = useState(null)
  const [vidIndex, setVidIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [values, setValues] = useState({
    query: '',
    count: COUNT,
    time: TIME,
  })
  const [errors, setErrors] = useState({
    hasResults: true,
    hasFailed: false,
    message: '',
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
      if (total_results < values.count) setValues({ ...values, count: total_results })
      setErrors({ ...errors, hasResults: total_results !== NO_RESULTS })
    } catch (e) {
      setErrors({ ...errors, hasFailed: true, message: e.message })
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }

  const getNextVideo = () => (vidIndex === displayVideos.length - 1 ? setVidIndex(0) : setVidIndex(prev => ++prev))

  const handleSubmit = e => {
    e.preventDefault()
    const { query, count } = values
    if (!query) return
    getData({ query, perPage: count })
  }

  const handleSearchChange = e => {
    // If the previous search yielded zero results we need to reset the count to default
    values.count === NO_RESULTS
      ? setValues({ ...values, query: e.target.value, count: COUNT })
      : setValues({ ...values, query: e.target.value })
  }

  const handleTime = () => {
    if (vidEl.current.currentTime > values.time) getNextVideo()
  }

  return (
    <main>
      <Search
        handleSubmit={handleSubmit}
        query={values.query}
        count={values.count}
        time={values.time}
        handleSearchChange={handleSearchChange}
        handleCountChange={e => setValues({ ...values, count: e.target.value })}
        handleTimeChange={e => setValues({ ...values, time: e.target.value })}
        isLoading={isLoading}
      />
      <Player
        video={currentVid}
        onEnded={() => getNextVideo()}
        onTimeUpdate={() => handleTime()}
        vidEl={vidEl}
        isLoading={isLoading}
        errors={errors}
      />
    </main>
  )
}

export default Main
