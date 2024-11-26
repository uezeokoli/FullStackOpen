import { useState, useEffect} from 'react'
import numberServices from './services/numbers'

const App = () => {
  const [persons, setPersons] = useState([])
  
  useEffect(() => {
    numberServices.getAll().then(persons => setPersons(persons))
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
      numberServices.create({name: newName, number: newNumber})
      .then(newPersons => setPersons(persons.concat(newPersons)))
      setNewName('')
      setNewNumber('')
    }
    else{
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const switchPerson = persons.filter(person => person.name === newName)[0]

        numberServices.update(switchPerson.id, {name: newName, number: newNumber})
        .then(setPersons(persons.map(person => person.name === newName? {...person, number: newNumber} : person)))
        // console.log(switchPerson)
      }
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
  
  const deletePerson = (name, id) => {
    if (window.confirm(`Delete ${name}?`)) {
      numberServices.remove(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
      })
    }
  }
  return (
    <div>
      <h2>Phonebook</h2>
        <Filter onChange={addFilter}/>
      <h2>add a new</h2>
        <PersonForm onNameChange={addNewName} onNumberChange={addNewNumber} 
        onSubmit={addInfo} numberValue ={newNumber} nameValue={newName}/>
      <h2>Numbers</h2>
      <Persons filtered={filtered_persons} onClick={deletePerson}/>
    </div>
  )
}

const PersonForm = (props) => {
  return(
      <form onSubmit={props.onSubmit}>
        <div>
          name: <input value= {props.nameValue} onChange={props.onNameChange}/>
        </div>
        <div>
          number: <input value={props.numberValue} onChange={props.onNumberChange}/>
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
      {props.filtered.map(person =>
         <div key={person.name}>{person.name} {person.number} 
         <button onClick={() => props.onClick(person.name, person.id)}>delete</button></div>)}
    </div>
  )
}
export default App