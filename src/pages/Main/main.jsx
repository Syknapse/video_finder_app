import { useState, useEffect, useRef } from 'react'
import * as Api from '@api'
import { Search } from '@components'
import { Player } from '@components'
import './main.css'

const Main = () => {
  const [displayVideos, setDisplayVideos] = useState([])
  const [currentVid, setCurrentVid] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [values, setValues] = useState({
    query: '',
    numberOfVideos: 10,
  })
  const vidEl = useRef(null)

  const getData = async ({ query, perPage }) => {
    setIsLoading(true)
    try {
      const response = await Api.getVideos({ query, perPage })
      setDisplayVideos(response.videos)
    } catch (e) {
      window.alert(e)
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    setCurrentVid(displayVideos[0])
  }, [displayVideos])

  useEffect(() => {
    if (currentVid) vidEl.current.load()
  }, [currentVid])

  const handleSubmit = e => {
    e.preventDefault()
    const { query, numberOfVideos } = values
    if (!query) return
    getData({ query, perPage: numberOfVideos })
  }

  const handleEnded = () => {
    setCurrentVid(displayVideos[6])
  }

  return (
    <main>
      <Search
        handleSubmit={handleSubmit}
        query={values.query}
        numberOfVideos={values.numberOfVideos}
        handleSearchChange={e => setValues({ ...values, query: e.target.value })}
        handleNumChange={e => setValues({ ...values, numberOfVideos: e.target.value })}
      />
      <Player video={currentVid} onEnded={() => handleEnded()} vidEl={vidEl} isLoading={isLoading} />
    </main>
  )
}

export default Main
