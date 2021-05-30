import React, { useState } from 'react'
import personService from '../services/persons.js'

const PersonForm=({persons,setPersons,setErrorMessage}) => {
    const [ newName, setNewName ] = useState('')
    const [ phone, setPhone ] = useState('')
    const change=(event)=>{
      event.preventDefault()
      console.log(event.target.value)
      setNewName(event.target.value)
    }
    const changePhone=(event)=>{
      event.preventDefault()
      console.log(event.target.value)
      setPhone(event.target.value)
    }
  
    const addperson=(event)=>{
      event.preventDefault()
      console.log("entered")
      if(persons.find(x=>x.name===newName))
      {
        if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`))
        {
          const x=persons.find(x=>x.name===newName)
          x.number=phone
          personService.updateperson(x.id,x).then(()=>{
            setPersons(persons.map(y=>y.id!==x.id?y:x))
            setErrorMessage({text:`Updated ${x.name} successfully`,type:'error2'})
          }).catch(error=>{
            console.log(error)
            setErrorMessage({text:`Information of ${x.name} has already been removed from server`,type:"error"})
          })
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        }
      }
      else{
      const obj ={id:persons.length+1,name:newName, number:phone}
      personService.insert(obj).then(Response=>{
        setPersons(persons.concat(Response))
        setErrorMessage({text:`Added '${Response.name}'`,type:'error2'})
      }).catch(error=>{
        setErrorMessage({text:`${error.response.data.error}`,type:'error'})
      })
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      }
    }
    return (
      <>
      <form onSubmit={addperson}>
          <div>
            name: <input  onChange={change} value={newName} required/>
          </div>
          <div>number: <input value={phone} onChange={changePhone} required/></div>
          <div >
            <button type="submit">add</button>
          </div>
        </form>
        </>
    )
  }

export default PersonForm