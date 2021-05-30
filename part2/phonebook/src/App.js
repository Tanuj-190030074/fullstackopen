import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/persons'
import Notification from './components/Notification'


const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ filter, setFilter ] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(()=>{
    personService.getAll().then((response)=>{
      console.log(response)
       setPersons(response)
    })
  },[])
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification errorMessage={errorMessage} />
      <Filter filter={filter} setFilter={setFilter}/> 
      <h2>add a new</h2>
      <PersonForm persons={persons} setPersons={setPersons} setErrorMessage={setErrorMessage}/>
      <h2>Numbers</h2>
      <Persons persons={persons} setPersons={setPersons} filter={filter} setErrorMessage={setErrorMessage}/>
    </div>
  )
}

export default App