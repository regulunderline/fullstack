import { useEffect, useState } from 'react'
import axios from 'axios'

const Filter = ({onChange}) => {
  return(
    <div>filter shown with <input onChange={onChange}/></div>
  )} 

const PersonForm = ({doesExist, handleNameChange, handleNumberChange, newName, newNumber}) => 
  <form onSubmit={doesExist}>
    <div>
      name: <input value={newName} onChange={handleNameChange}/>
    </div>
    <div>
      number: <input value={newNumber} onChange={handleNumberChange}/>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>

const Persons = ({persons, newFilter}) =>
  <div>
    {persons.filter((person) => person.name.toLowerCase().includes(newFilter.toLowerCase())).map(person => <div key={person.id}>{person.name} {person.number}</div>)}
  </div>

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] =useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => setPersons(response.data))
  },[])
  
  const addName = () => {
    const addPerson = {
      name : newName,
      number : newNumber,
      id : String(persons.length + 1)
    }

    setPersons(persons.concat(addPerson))
    setNewName('')
    setNewNumber('')
  }

  const doesExist = (event) => {
    event.preventDefault()
    persons.some(person => person.name===newName) ? alert(`${newName} is already added to phonebook`) : addName()
  }
 
  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  
  return (
    <div>
      <h1>Phonebook</h1>

      {<Filter onChange={(event) => setNewFilter(event.target.value)}/>}

      <h2>add a new</h2>

      {<PersonForm 
      doesExist={doesExist} 
      handleNameChange={handleNameChange} 
      handleNumberChange={handleNumberChange} 
      newName={newName} 
      newNumber={newNumber}
      />}

      <h2>Numbers</h2>

      {<Persons persons={persons} newFilter={newFilter}/>}
    </div>
  )
}

export default App