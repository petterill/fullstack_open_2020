import React, { useState, useEffect } from 'react';
import personService from './services/persons'
import PersonForm from './components/PersonForm'
import DisplayPersons from './components/DisplayPersons'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ notificationMessage, setNotificationMessage] = useState(null)
  const [ errorMessage, setErrorMessage] = useState(null)


  const hook = () => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }

  useEffect(hook, [])

  const dropPerson = (id) => {
    const person = persons.find(p => p.id === id)

    if (window.confirm(`Are you sure you want to delete '${person.name}'?`)) {
      personService
        .drop(id)
        .then(returnedPerson => {
          setNotificationMessage(
            `the person '${person.name}' was deleted successfully`
            )
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
          setPersons(persons.filter(p => p.id !== id))
        })
        .catch(error => {
          setErrorMessage(
            `the person '${person.name}' was already deleted from server`
            )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      }


    const updatablePerson = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())  
    if (updatablePerson) {
      if (window.confirm(`${newName} is already in phonebook. Do you want to update the number?`)) {
        personService
          .update(updatablePerson.id, personObject)
          .then(returnedPerson => {
            setNotificationMessage(
            `the number was updated successfully`
            )
            setTimeout(() => {
              setNotificationMessage(null)
            }, 5000)
            setPersons(persons.map(p => p.id !== updatablePerson.id ? p : returnedPerson))
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            setErrorMessage(
              `the person was already deleted from server`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
            setPersons(persons.filter(p => p.id !== updatablePerson.id))
        })
      }
    } else {
        personService
          .create(personObject)
          .then(returnedPerson => {
            setNotificationMessage(
              `the person was added successfully`
            )
            setTimeout(() => {
              setNotificationMessage(null)
            }, 5000)
            setPersons(persons.concat(returnedPerson))
            setNewName('')
            setNewNumber('')
      })
      }
 
  }


  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const Notification = ({ message, errorMessage }) => {
    if (message === null && errorMessage === null) {
      return null
    }

    if (errorMessage) {
      return (
        <div className='error'>
          {errorMessage}
        </div>
      )
    }
    
    if (message) {
      return (
        <div className='success'>
          {message}
        </div>
      )
    }
  }

  return (
    <div>
      <Notification message={notificationMessage} errorMessage={errorMessage} />
      <h2>Phonebook</h2>
        <PersonForm addPerson={addPerson} handleNameChange={handleNameChange} 
          newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
        <DisplayPersons persons={persons} drop={dropPerson}/>
    </div>
  )
}

export default App;
