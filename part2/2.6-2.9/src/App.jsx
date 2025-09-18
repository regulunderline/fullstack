import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-123456', id: 1 },
    { name: 'Ada Lovelace', phone: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', phone: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', phone: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newFilter, setNewFilter] =useState('')
  
  const addName = () => {
    const addPerson = {
      name : newName,
      phone : newPhone,
      id : String(persons.length + 1)
    }

    setPersons(persons.concat(addPerson))
    setNewName('')
    setNewPhone('')
  }

  const doesExist = (event) => {
    event.preventDefault()
    persons.some(person => person.name===newName) ? alert(`${newName} is already added to phonebook`) : addName()
  }
 
  const handleNameChange = (event) => setNewName(event.target.value)
  const handlePhoneChange = (event) => setNewPhone(event.target.value)
  const handleFilterChange = (event) => setNewFilter(event.target.value)
  
  return (
    <div>
      <h1>Phonebook</h1>
      <div>
        filter shown with <input onChange={handleFilterChange}/>
      </div>
      <h2>add a new</h2>
      <form onSubmit={doesExist}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newPhone} onChange={handlePhoneChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.filter((person) => person.name.toLowerCase().includes(newFilter.toLowerCase())).map(person => <div key={person.id}>{person.name} {person.phone}</div>)}
      </div>
    </div>
  )
}

export default App