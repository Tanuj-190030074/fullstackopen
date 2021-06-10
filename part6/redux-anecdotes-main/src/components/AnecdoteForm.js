import React from 'react'
import { connect } from 'react-redux'
import {createAncedote} from '../reducers/anecdoteReducer'
import { setNotification} from '../reducers/notificationReducer'

const AnecdoteForm=(props)=>{
      const addAnecedote=async(event)=>{
         event.preventDefault()
         const content=event.target.anecedotecontent.value
         event.target.anecedotecontent.value = ''
         props.createAncedote(content)
         props.setNotification(`You created anecdote ${content}`,5)
      }
    return(
        <div>
        <h2>create new</h2>
      <form onSubmit={addAnecedote}>
        <div><input name="anecedotecontent" /></div>
        <button>create</button>
      </form>
      </div>
    )
}
const ConnectedAnecdoteForm=connect(null,{createAncedote,setNotification})(AnecdoteForm)
export default ConnectedAnecdoteForm