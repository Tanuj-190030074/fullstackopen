import React from 'react'
import { connect } from 'react-redux'
import {voteAncedote} from '../reducers/anecdoteReducer'
import { setNotification} from '../reducers/notificationReducer'

const AnecdoteList=(props)=>{
  const anecdotes = props.anecdotes.filter(x=>x.content.toLowerCase().includes(props.filter.toLowerCase()))
  const vote = (id,content) => {
    const anecdo=anecdotes.find(x=>x.id===id)
    props.voteAncedote({...anecdo,votes:anecdo.votes+1})
    props.setNotification(`You voted '${content}'`,5)
         
  }
    return(
        <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id,anecdote.content)}>vote</button>
          </div>
        </div>
      )}
      </div>
    )
}
const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter,
  }
}
const ConnectedAnecdote=connect(mapStateToProps,{voteAncedote,setNotification})(AnecdoteList)
export default ConnectedAnecdote