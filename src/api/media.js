import { createClient } from 'pexels'

const { REACT_APP_PEXELS_KEY } = process.env
const client = createClient(REACT_APP_PEXELS_KEY)

export const getVideos = ({ query, perPage }) =>
  client.videos.search({ query, per_page: perPage, orientation: 'landscape' }).then(data => data)
