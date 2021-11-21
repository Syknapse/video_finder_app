import './search.css'

const Search = ({ handleSubmit, query, numberOfVideos, handleSearchChange, handleNumChange, isLoading }) => {
  return (
    <form className="search" onSubmit={handleSubmit}>
      <fieldset>
        <input
          type="search"
          value={query}
          placeholder="Search videos ex: tiger, beach..."
          onChange={handleSearchChange}
        />
        <input type="submit" value="Submit" />
      </fieldset>
      <fieldset>
        <label>Number of videos to play</label>
        <select onChange={handleNumChange} value={numberOfVideos}>
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
    </form>
  )
}

export default Search
