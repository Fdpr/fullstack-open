import axios from 'axios'
const baseURL = "http://localhost:3001/persons"

const getAll = () => axios.get(baseURL)
const create = (person) => axios.post(baseURL, person)

export default {getAll, create}