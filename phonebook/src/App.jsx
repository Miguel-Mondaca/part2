import { useState, useEffect } from 'react'
import personServ from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterData, setFilterData] = useState('')
  const [message, setMessage] = useState({ text: null, type: '' })

  useEffect(() => {
    personServ.getAll().then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  const showMessage = (text, type) => {
    console.log('Message type:', type)
    setMessage({ text, type })
    setTimeout(() => {
      setMessage({ text: null, type: '' })
    }, 5000)
  }

  const addPerson = (event) => {
    event.preventDefault()

    const matchedPerson = persons.find(person => person.name === newName)
    if (matchedPerson) {
      if (window.confirm(`${newName} is already registered. Would you like to replace the current number with the new one?`)) {
        const updatedPerson = { ...matchedPerson, number: newNumber }

        personServ
          .update(matchedPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== matchedPerson.id ? person : returnedPerson))
            setNewName('')
            setNewNumber('')
            showMessage(`${returnedPerson.name} was successfully updated.`, 'updated')
          })
          .catch(error => {
            showMessage(`Oops! ${newName} has already been removed from the phonebook.`, 'error')
            setPersons(persons.filter(person => person.id !== matchedPerson.id))
          })
      }
      return
    }

    const personObject = {
      name: newName,
      number: newNumber,
    }

    personServ
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        showMessage(`${returnedPerson.name} was added to the phonebook.`, 'added')
      })
      .catch(error => {
        showMessage(`Error: ${error.response?.data?.error || 'Failed to add the person.'}`, 'error')
        console.error(error)
      })
  }

  const deleteName = (id, name) => {
    if (window.confirm(`Would you like to remove ${name} from the list?`)) {
      personServ
        .destroy(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          showMessage(`${name} was successfully deleted.`, 'deleted')
        })
        .catch(error => {
          console.error(`Failed to delete ${id}`, error)
          showMessage(`Error: ${name} was already deleted from the server.`, 'error')
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  const datatoShow = persons.filter(person =>
    person.name.toLowerCase().includes(filterData.toLowerCase())
  )

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    setFilterData(event.target.value)
  }

  return (
    <div>
      <h1>Welcome to Phonebook</h1>
      <Notification message={message} />
      <Filter value={filterData} onChange={handleSearch} />
      <h3>Add a new person:</h3>
      <PersonForm
        onSubmit={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNewName={handleNewName}
        handleNewNumber={handleNewNumber}
      />
      <h3>Contacts:</h3>
      <Persons personsToShow={datatoShow} deleteName={deleteName} />
    </div>
  )
}

export default App