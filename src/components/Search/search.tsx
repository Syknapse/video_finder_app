import React from 'react'
import './search.css'

export interface ISearchProps {
  query: string
  count: number
  time: number
  isLoading: boolean
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleCountChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  handleTimeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
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
}: ISearchProps): JSX.Element => {
  return (
    <form data-testid="search-form" className="form" onSubmit={handleSubmit}>
      <fieldset data-testid="search-fieldset" disabled={isLoading}>
        <input
          data-testid="search-input"
          className="search"
          type="search"
          name="searchQuery"
          value={query}
          placeholder="Search videos"
          onChange={handleSearchChange}
        />
        <input
          data-testid="search-submit"
          className="submit"
          type="submit"
          value="Submit"
          title={query ? `Click to search for ${count} ${query} videos playing each for ${time}s` : undefined}
        />
      </fieldset>
      <fieldset data-testid="search-fieldset" disabled={isLoading}>
        <label>Number of videos to play</label>
        <select onChange={handleCountChange} name="count" value={count}>
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
      <fieldset data-testid="search-fieldset" disabled={isLoading}>
        <label>Each video plays for up to</label>
        <select onChange={handleTimeChange} name="time" value={time}>
          <option value={10}>10s</option>
          <option value={20}>20s</option>
          <option value={30}>30s</option>
        </select>
      </fieldset>
    </form>
  )
}

export default Search
