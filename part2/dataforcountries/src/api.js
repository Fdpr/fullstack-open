import axios from 'axios'

const baseURL = "https://studies.cs.helsinki.fi/restcountries/api"

const getAllCountries = () => axios.get(`${baseURL}/all`)
const getCountry = (name) => axios.get(`${baseURL}/${name}`)

export default {getAllCountries, getCountry}
