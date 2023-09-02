import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import PersonsToShow from './components/PersonsToShow'
import personsService from './services/Persons'
import Notification from './components/Notification'
import ErrorMessage from './components/ErrorMessage'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() =>{
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    const isDuplicate = persons.find(person => person.name === newName)
    if (isDuplicate === undefined) {
      personsService
      .create(personObject)
      .then(returnedPerson  => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setMessage(`Added ${newName}`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      }).catch(error => {
        setErrorMessage(error.response.data.error)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        console.log(error)
      })
    } else {
      if (window.confirm(`'${newName}' is already added to phonebook, replace the old number with a new one?`)) {
        const personToUpdate = persons.find(person => person.name === newName) 
        setNewNumber(newNumber)
        personsService
          .update(personToUpdate.id, personObject)
          .then(updatedPerson => {
            setPersons(persons.map(person => person.id !== updatedPerson.id ? person : updatedPerson))
            setNewName('')
            setNewNumber('')
            setMessage(`Changed number of ${newName}`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          }
          )
          .catch(error => {
            setErrorMessage(`'${newName}' number could not be changed.`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
            console.log(error)
          })
      }else {
        console.log("Number change cancelled.")
      }
    }
  }

  const deletePerson = id => {
    const personToDelete = persons.find(person => person.id === id)
    if (window.confirm(`Delete '${personToDelete.name}'?`)){
      personsService
        .remove(personToDelete.id)
        .then(setPersons(
          persons.filter(person => person.id !== id),
          setMessage(`Deleted ${newName}`),
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          ))
        .catch(error => {
          setErrorMessage(`the person '${personToDelete.name}' was already deleted from server`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          console.log(error)
        }) 
    } else {
      console.log("Deletion cancelled.")
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    if (event.target.value === '') {
      setFilter(event.target.value)
      setShowAll(true)
    } else {
      setFilter(event.target.value)
      setShowAll(false)
    }
  }

  const personsToShow = showAll
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <ErrorMessage errorMessage={errorMessage} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <PersonsToShow personsToShow={personsToShow} deletePerson={deletePerson}/>
    </div>
  )
}

export default App