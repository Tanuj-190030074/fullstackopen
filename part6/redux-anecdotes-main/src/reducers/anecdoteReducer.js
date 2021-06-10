import anecdoteService from '../services/anecdotes'
export const createAncedote=(content)=>{
  return async dispatch=>{
    const newanecdote=await anecdoteService.createNew(content)
    dispatch({
      type:'CREATE',
      data: newanecdote
    })
  }
}

export const voteAncedote=(obj)=>{
  return async dispatch=>{
    const data=await anecdoteService.update(obj) 
    dispatch({
      type:'VOTE',
      data
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch=>{
    const anecdotes=await anecdoteService.getAll()
    dispatch({
      type:'INIT_ANECDOTES',
      data:anecdotes
    })
  }
}

const reducer = (state = [], action) => {
  switch(action.type) {
    case 'VOTE':{
      const updatedone=action.data
      return state.map(x=>x.id!==updatedone.id?x:updatedone).sort((a, b) => b.votes-a.votes)
    }
    case 'CREATE':{
      return [...state,action.data]
    }
    case 'INIT_ANECDOTES':
      return action.data.sort((a, b) => b.votes - a.votes)
    default:return state
  }
}

export default reducer