import React from 'react'
import personService from '../services/persons.js'

const Person=({person,setPersons,persons,setErrorMessage})=>{
    const deleteevent=(id)=>{
       const obj=persons.find(x=>x.id===id)
       if(window.confirm(`Delete ${obj.name}`))
       {
         personService.deleteperson(obj.id).then(response=>{
           console.log("deleted")
           setPersons(persons.filter(x=>x.id!=id))
           setErrorMessage({text:`Deleted ${obj.name} successfully`,type:"error2"})
         }).catch(error=>{
           console.log(error)
           setErrorMessage({text:`Information of ${obj.name} has already been removed from server`,type:"error"})
         })
         setTimeout(() => {
          setErrorMessage(null)
      }, 5000)
       }
    }
    return(
    <p>{person.name} {person.number} <button onClick={()=>deleteevent(person.id)}>delete</button></p>
    )
  }
  
  const Persons=({persons,filter,setPersons,errorMessage,setErrorMessage})=>{
    return(
      <div>
         {persons.filter(x=>x.name.toLowerCase().includes(filter.toLowerCase())).map((person,id) =><Person person={person} key={id} persons={persons} setPersons={setPersons} errorMessage={errorMessage} setErrorMessage={setErrorMessage}/>)}
      </div>
    )
  }

  export default Persons