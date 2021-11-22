import './search.css'

const Search = ({
  handleSubmit,
  query,
  numberOfVideos,
  time,
  handleSearchChange,
  handleNumChange,
  handleTimeChange,
  isLoading,
}) => {
  return (
    <form className="search" onSubmit={handleSubmit}>
      <fieldset disabled={isLoading}>
        <input
          type="search"
          value={query}
          placeholder="Search videos ex: tiger, beach..."
          onChange={handleSearchChange}
        />
        <input type="submit" value="Submit" />
      </fieldset>
      <fieldset disabled={isLoading}>
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
      <fieldset disabled={isLoading}>
        <label>Each video plays for up to</label>
        <select onChange={handleTimeChange} value={time}>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
        </select>
      </fieldset>
    </form>
  )
}

export default Search
