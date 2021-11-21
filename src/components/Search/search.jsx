import './search.css'

const Search = ({ handleSubmit, value, handleChange, isLoading }) => {
  return (
    <form className="search" onSubmit={handleSubmit}>
      <input type="search" value={value} onChange={handleChange} />
      <input type="submit" value="Submit" />
    </form>
  )
}

export default Search
