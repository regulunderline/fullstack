import { createSlice, current } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'
import { setNotification } from '../reducers/notificationReducer'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    updateAnecdote(state, action) {
      const changedAnecdote = action.payload
      return state
        .map(anecdote =>
          anecdote.id !== changedAnecdote.id ? anecdote : changedAnecdote 
        )
        .toSorted((a,b) => b.votes - a.votes)
    },
    setAnecdotes(state, action) {
      return action.payload.toSorted((a,b) => b.votes - a.votes)
    }
  }
})

export const { updateAnecdote, setAnecdotes, appendAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
    dispatch(setNotification(`created anecdote '${newAnecdote.content}'`, 10))
  }
}

export const voteFor = id => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.voteForOne(id)
    dispatch(updateAnecdote(newAnecdote))
    dispatch(setNotification(`you voted '${newAnecdote.content}'`, 10))
  }
}

export default anecdoteSlice.reducer