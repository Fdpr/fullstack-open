import { useState, useEffect } from 'react'
import axios from 'axios'
import api from './api'

const Info = ({ name, number, handleDelete}) => <p>{name} {number} <button onClick={handleDelete}>delete</button></p>

const Numbers = ({ persons, handleDelete }) => <>
  {persons.map(p => <Info key={p.name} name={p.name} number={p.number} handleDelete={() => handleDelete(p)}/>)}
</>

const Filter = ({ handleStateChange }) => <div>filter shown with <input onChange={handleStateChange}></input></div>

const NumberForm = ({ handleSubmit, handleNameChange, handleNumberChange }) => <>
  <form onSubmit={handleSubmit}>
    <div>name: <input onChange={handleNameChange} /></div>
    <div>number: <input onChange={handleNumberChange} /></div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
</>

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    api.getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const delPerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`))
      api.del(person.id)
        .then(() => {
          setPersons(persons.toSpliced(persons.indexOf(person), 1))
        })
  }

  const addName = (e) => {
    e.preventDefault()
    if (persons.findIndex(p => p.name === newName) === -1) api.create({ name: newName, number: newNumber }).then(response => setPersons(persons.concat(response.data)))
    else alert(`${newName} is already in the phone book!`)
  }

  const handleFieldChange = (e) => setNewName(e.target.value)
  const handleNumberChange = (e) => setNewNumber(e.target.value)
  const handleFilterChange = (e) => setNewFilter(e.target.value)

  const filteredPersons = persons.filter((p) => p.name.toLowerCase().startsWith(newFilter.toLocaleLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleStateChange={handleFilterChange} />
      <h2>Add a new number</h2>
      <NumberForm handleSubmit={addName} handleNameChange={handleFieldChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Numbers persons={filteredPersons} handleDelete={delPerson}/>
    </div>
  )
}

export default App