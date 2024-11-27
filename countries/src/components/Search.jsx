const Search = ({ search, onSearchChange, loading }) => {
    const handleInputChange = (event) => {
        onSearchChange(event.target.value)
    }

    return (
        <div>
            <input type="text" value={search} onChange={handleInputChange} placeholder="Search for a country..." />
            {loading && <p>Searching...</p>}
        </div>
    )
}

export default Search