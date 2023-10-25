import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const addName = (e) => {
    e.preventDefault()
    if (persons.findIndex(p => p.name === newName) === -1) setPersons(persons.concat({name: newName}))
    else alert(`${newName} is already in the phone book!`)
  }

  const handleFieldChange = (e) => setNewName(e.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input onChange={handleFieldChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <p key={person.name}>{person.name}</p>)}
    </div>
  )
}

export default App