import React from 'react'
import './search.css'

interface searchInterface {
  query: string
  count: number
  time: number
  isLoading: boolean
  handleSubmit: React.FormEventHandler<HTMLFormElement>
  handleSearchChange: React.ChangeEventHandler<HTMLInputElement>
  handleCountChange: React.ChangeEventHandler<HTMLSelectElement>
  handleTimeChange: React.ChangeEventHandler<HTMLSelectElement>
}

const Search = ({
  query,
  count,
  time,
  isLoading,
  handleSubmit,
  handleSearchChange,
  handleCountChange,
  handleTimeChange,
}: searchInterface): JSX.Element => {
  return (
    <form className="form" onSubmit={handleSubmit}>
      <fieldset disabled={isLoading}>
        <input
          className="search"
          type="search"
          value={query}
          placeholder="Search videos"
          onChange={handleSearchChange}
        />
        <input
          className="submit"
          type="submit"
          value="Submit"
          title={query ? `Click to search for ${count} ${query} videos playing each for ${time}s` : undefined}
        />
      </fieldset>
      <fieldset disabled={isLoading}>
        <label>Number of videos to play</label>
        <select onChange={handleCountChange} value={count}>
          <option key={0} value={0} disabled>
            0
          </option>
          {Array.from(Array(10).keys()).map(i => {
            const value = i + 1
            return (
              <option key={value} value={value}>
                {value}
              </option>
            )
          })}
        </select>
      </fieldset>
      <fieldset disabled={isLoading}>
        <label>Each video plays for up to</label>
        <select onChange={handleTimeChange} value={time}>
          <option value={10}>10s</option>
          <option value={20}>20s</option>
          <option value={30}>30s</option>
        </select>
      </fieldset>
    </form>
  )
}

export default Search
