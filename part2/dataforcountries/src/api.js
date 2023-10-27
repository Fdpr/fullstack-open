import axios from 'axios'
import apiKey from './apiKey'

const baseURL = "https://studies.cs.helsinki.fi/restcountries/api"
const weatherURL = "http://api.openweathermap.org"

const getAllCountries = () => axios.get(`${baseURL}/all`)
const getCountry = (name) => axios.get(`${baseURL}/${name}`)
const getCityWeather = (city) => {
    return axios.get(`${weatherURL}/geo/1.0/direct?q=${city}&appid=${apiKey}`)
        .then(response => {
            const {lat, lon} = response.data[0]
            return axios.get(`${weatherURL}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
        })
}

export default {getAllCountries, getCountry, getCityWeather}
