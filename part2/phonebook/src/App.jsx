import { useState } from 'react'

const Info = ({ name, number }) => <p>{name} {number}</p>

const Numbers = ({ persons }) => <>
  {persons.map(p => <Info key={p.name} name={p.name} number={p.number} />)}
</>

const Filter = ({ handleStateChange }) => <div>filter shown with <input onChange={handleStateChange}></input></div>

const NumberForm = ({handleSubmit, handleNameChange, handleNumberChange}) => <>
  <form onSubmit={handleSubmit}>
    <div>name: <input onChange={handleNameChange} /></div>
    <div>number: <input onChange={handleNumberChange} /></div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
</>

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const addName = (e) => {
    e.preventDefault()
    if (persons.findIndex(p => p.name === newName) === -1) setPersons(persons.concat({ name: newName, number: newNumber }))
    else alert(`${newName} is already in the phone book!`)
  }

  const handleFieldChange = (e) => setNewName(e.target.value)
  const handleNumberChange = (e) => setNewNumber(e.target.value)
  const handleFilterChange = (e) => setNewFilter(e.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleStateChange={handleFilterChange} />
      <h2>Add a new number</h2>
      <NumberForm handleSubmit={addName} handleNameChange={handleFieldChange} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Numbers persons={persons.filter((p) => p.name.toLowerCase().startsWith(newFilter.toLocaleLowerCase()))} />
    </div>
  )
}

export default App