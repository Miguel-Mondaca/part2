import { useState, useEffect } from 'react'
import axios from 'axios'

const CountryCard = ({ country }) => {
    const [weather, setWeather] = useState(null)
    const [apiError, setApiError] = useState('')
    const [loading, setLoading] = useState(false)

    const capitalizeWords = (str) => {
        return str
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ')
    }

    const formatNumber = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    }

    const weatherInfo = () => {
        try {
            setLoading(true)
            const api_key = import.meta.env.VITE_SOME_KEY
            const capital = country.capital ? country.capital[0] : ''

            if (capital) {
                const weatherCall = axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`)

                weatherCall.then((response) => {
                    setWeather(response.data)
                    setLoading(false)
                }).catch((error) => {
                    console.error("Error fetching weather data", error)
                    setWeather(null)
                    setApiError("Failed to fetch weather data")
                    setLoading(false)
                });
            } else {
                setApiError('Capital not found')
                setLoading(false)
            }
        } catch (error) {
            console.error("Error calling the information", error)
            setWeather(null)
            setApiError("Failed to fetch weather data")
            setLoading(false)
        }
    }

    useEffect(() => {
        if (country && country.capital) {
            weatherInfo()
        }
    }, [country])

    return (
        <div>
            <h2>{country.name.common}</h2>
            <ul>
                <li><strong>Capital:</strong> {country.capital ? country.capital[0] : 'Not available'}</li>
                <li><strong>Region:</strong> {country.region}</li>
                <li><strong>Area:</strong> {formatNumber(country.area)} km²</li>
                <li><strong>Language(s):</strong> {Object.values(country.languages || {}).join(', ')}</li>
                <li><strong>Population:</strong> {formatNumber(country.population)}</li>
                <li><strong>Flag:</strong><br />
                    <img src={country.flags.png} alt={`${country.name.common} Flag`} style={{ width: '200px', margin: '10px 0' }} />
                </li>
                <li><strong>Coat of Arms:</strong><br />
                    {country.coatOfArms?.png ? (
                        <img src={country.coatOfArms.png} alt={`${country.name.common} Coat of Arms`} style={{ width: '200px', margin: '10px 0' }} />
                    ) : (
                        <span>Not available</span>
                    )}
                </li>
            </ul>

            {loading && <p>Loading weather info...</p>}
            {weather && !loading && (
                <div>
                    <h3>Weather in {country.capital ? country.capital[0] : 'N/A'}</h3>
                    <ul>
                        <li><strong>Temperature:</strong> {weather.main.temp} °C</li>
                        <li><strong>Weather:</strong> {capitalizeWords(weather.weather[0].description)}</li>
                        <li><strong>Humidity:</strong> {weather.main.humidity} %</li>
                        <li><strong>Wind Speed:</strong> {weather.wind.speed} m/s</li>
                        <li><strong>Weather Icon:</strong><br />
                            {weather.weather[0].icon && (
                                <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt="Weather Icon" />
                            )}
                        </li>
                    </ul>
                </div>
            )}

            {apiError && !loading && <p>{apiError}</p>}
        </div>
    )
}

export default CountryCard