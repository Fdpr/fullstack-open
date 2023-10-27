import { useEffect, useState } from 'react'
import api from './api'
import finland from './finland'

const baseURL = "https://studies.cs.helsinki.fi/restcountries/api"

const CountryList = ({ countries, handleShow }) => {
  if (countries.length < 2) return null
  else if (countries.length > 10) return <div>Too many matches, please specify another filter</div>
  else
    return <div>
      {countries.map(country => <div key={country.name.common}>{country.name.common}
        <button onClick={() => handleShow(country)}>show</button>
      </div>)}
    </div>
}

const WeatherData = ({ country, weather }) => <>
  <h3>Weather in {country.capital[0]}</h3>
  <p>temperature {weather.main.temp} </p>
  <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
  <p>wind {weather.wind.speed}</p>
</>

const CountryData = ({ country }) => {
  if (country)
    return <div>
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
  else return null
}

const Filter = ({ handleChange }) => <div>
  find countries
  <input onChange={handleChange} />
</div>

const App = () => {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [country, setCountry] = useState(null)
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    setWeather(null)
    if (country){
      api.getCityWeather(country.capital[0])
        .then(response => setWeather(response.data))
    }
  }, [country])

  useEffect(() => {
    api.getAllCountries().then(response => setCountries(response.data))
  }, [])

  const changeFilter = (e) => {
    const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
    setCountry(filteredCountries.length === 1 ? filteredCountries[0] : null)
    setFilteredCountries(filteredCountries)
  }

  return <>
    <Filter handleChange={changeFilter} />
    <CountryList countries={filteredCountries} handleShow={setCountry} />
    <CountryData country={country} />
    {weather && country ? <WeatherData country={country} weather={weather}/> : null}
  </>
}

export default App
