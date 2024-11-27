import { useState, useEffect } from 'react'
import axios from 'axios'
import Search from './components/Search'
import Filter from './components/Filter'
import CountryList from './components/CountryList'
import CountryCard from './components/CountryCard'

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [filterMessage, setFilterMessage] = useState('')

  useEffect(() => {
    const fetchCountries = async () => {
      if (!search) {
        setCountries([])
        setSelectedCountry(null)
        setFilterMessage('')
        return
      }

      setLoading(true)
      try {
        const { data } = await axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
        const filteredCountries = data.filter((country) =>
          country.name.common.toLowerCase().includes(search.toLowerCase())
        )

        setCountries(filteredCountries)

        if (filteredCountries.length > 10) {
          setFilterMessage('Too many matches. Please refine your search.')
          setSelectedCountry(null)
        } else if (filteredCountries.length === 0) {
          setFilterMessage('Oops! No countries match your search.')
          setSelectedCountry(null)
        } else {
          setFilterMessage('')

          const exactMatch = filteredCountries.find(
            (country) => country.name.common.toLowerCase() === search.toLowerCase()
          )
          setSelectedCountry(exactMatch || null)
        }
      } catch (error) {
        setCountries([])
        setFilterMessage('Something went wrong. Please try again soon.')
        setSelectedCountry(null)
      } finally {
        setLoading(false)
      }
    }

    const debounceFetch = setTimeout(fetchCountries, 500)
    return () => clearTimeout(debounceFetch)
  }, [search])

  const handleSearchChange = (value) => {
    setSearch(value)
    setSelectedCountry(null)
  }

  const handleCountryClick = (country) => {
    setSelectedCountry(country)
  }

  return (
    <div>
      <h1>Global Country Guide</h1>
      <Search search={search} onSearchChange={handleSearchChange} loading={loading} />
      <Filter message={filterMessage} />
      {selectedCountry ? (
        <CountryCard country={selectedCountry} />
      ) : (
        <CountryList countries={countries} onCountryClick={handleCountryClick} />
      )}
    </div>
  )
}

export default App