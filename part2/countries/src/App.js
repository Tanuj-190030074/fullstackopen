import React, { useState, useEffect } from 'react'
import Countries from './components/Countries'
import Filter from './components/Filter'
import axios from 'axios'



const App = () => {
  const [ countries, setCountries ] = useState([]) 
  const [ filter, setFilter ] = useState('')

  useEffect(() => {
    axios.get("https://restcountries.com/v2/all").then((response) =>setCountries(response.data))
  },[])
  
  
  return (
    <div>
      <Filter filter={filter} setFilter={setFilter}/> 
      <Countries countries={countries} filter={filter} setFilter={setFilter}/>
    </div>
  )
}

export default App