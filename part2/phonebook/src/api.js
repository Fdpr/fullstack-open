import axios from 'axios'
const baseURL = "http://localhost:3001/persons"

const getAll = () => axios.get(baseURL)
const create = (person) => axios.post(baseURL, person)
const del = (id) => axios.delete(`${baseURL}/${id}`)
const update = (person, id) => axios.put(`${baseURL}/${id}`, person)

export default {getAll, create, del, update}