const CountryList = ({ countries, onCountryClick }) => {
    return (
        <div>
            {countries.length > 0 && countries.length <= 10 && (
                <ul>
                    {countries.map((country) => (
                        <li key={country.name.common}>
                            {country.name.common}{' '}
                            <button onClick={() => onCountryClick(country)}>Show Details</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default CountryList