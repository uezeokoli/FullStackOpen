import { useState, useEffect} from 'react'
import axios from 'axios'
const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {

    axios.get("http://localhost:3001/persons").then(response => {
      setPersons(response.data)
    })
  }, [])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const filtered_persons = persons.filter(person => person.name.toLowerCase().includes(filter))

  const addInfo = (event) => {
    event.preventDefault()
    let name_exists = false
    for (let i = 0;i<persons.length;i++) {
      if (persons[i].name === newName) {
        name_exists = true
      }
    }
    if (!name_exists){
      setPersons(persons.concat({name: newName, number: newNumber}))
    }
    else{
      alert(`${newName} is already added to phonebook`)
    }
  }

  const addNewName = (event) => {
    setNewName(event.target.value)
  }

  const addNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const addFilter = (event) => {
    setFilter(event.target.value.toLowerCase())
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
        <Filter onChange={addFilter}/>
      <h2>add a new</h2>
        <PersonForm onNameChange={addNewName} onNumberChange={addNewNumber} onSubmit={addInfo}/>
      <h2>Numbers</h2>
      <Persons filtered={filtered_persons}/>
    </div>
  )
}

const PersonForm = (props) => {
  return(
      <form onSubmit={props.addInfo}>
        <div>
          name: <input onChange={props.onNameChange}/>
        </div>
        <div>
          number: <input onChange={props.onNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Filter = (props) => {
  return(
    <div>
      filter shown with <input onChange={props.onChange}/>
    </div>
  )
}

const Persons = (props) => {
  return (
    <div>
      {props.filtered.map(person => <div key={person.name}>{person.name} {person.number}</div>)}
    </div>
  )
}
export default App