import React, { useState } from 'react'

const Anecdote = ({ anecdote, votes }) => (
  <>
  <p>{anecdote}</p>
  <p>has {votes} votes</p>
  </>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  const [maxvoted, setmaxvoted] = useState(0)
  
  const handleVoting=()=>{
    let votestemp=[...votes]
    votestemp[selected]=votestemp[selected]+1
    setVotes(votestemp)
    setmaxvoted(votes.indexOf(Math.max(...votes)))
  }
  const handleanecdeote=()=>{
    if(selected!==anecdotes.length-1)
    {
    setSelected(selected+1)
    }
    else{
      setSelected(0)
    }
    console.log("clicked")
    setmaxvoted(votes.indexOf(Math.max(...votes)))
  }
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]}/>
      <button onClick={handleVoting}>
          vote
      </button>
      <button onClick={handleanecdeote}>
           next anecdote
      </button>
      <h1>Anecdote with most votes</h1>
      <Anecdote anecdote={anecdotes[maxvoted]} votes={votes[maxvoted]}/>
    </div>
  )
}



export default App