import { useEffect, useState } from 'react'
import api from './api'
import finland from './finland'

const baseURL = "https://studies.cs.helsinki.fi/restcountries/api"

const CountryData = ({ country }) => <div>
  <h2>{country.name.common}</h2>
  <p>
    Capital: {country.capital[0]}
    <br />
    Area: {country.area}
  </p>
  <h3>languages</h3>
  <ul>
    {Object.keys(country.languages).map(k => <li key={k}>{country.languages[k]}</li>)}
  </ul>
  <img src={country.flags.png} alt={country.flags.alt}></img>
</div>

const Filter = ({ handleChange }) => <div>
  find countries
  <input onChange={handleChange} />
</div>

const App = () => {
  const [filter, setFilter] = useState("")
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => {
    api.getAllCountries().then(response => setCountries(response.data))
  }, [])

  const changeFilter = (e) => {
    const newFilter = e.target.value
    setFilter(newFilter)
    setFilteredCountries(countries.filter(country => country.name.common.toLowerCase().includes(newFilter.toLowerCase())))
  }

  const renderCountry = () => {
    if (filteredCountries.length === 1) return <CountryData country={filteredCountries[0]} />
    else if (filteredCountries.length < 10 ) return filteredCountries.map(country => <div key={country.name.common}>{country.name.common}</div>)
    else return <div>Too many matches, please specify another filter</div>
  }



  return <>
    <Filter handleChange={changeFilter} />
    {renderCountry()}
  </>
}

export default App
