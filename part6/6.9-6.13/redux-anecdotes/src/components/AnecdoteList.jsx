import { voteFor } from '../reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(({ filter, anecdotes }) => anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter)))
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(voteFor(id))
    setTimeout(() => dispatch(setNotification(null)), 5000)
    dispatch(setNotification(`you voted '${anecdotes.find(anecdote => anecdote.id === id).content}'`))
  }

  return (
    <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
            <div>
            {anecdote.content}
            </div>
            <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
        </div>
        )}  
    </div>
  )
}

export default AnecdoteList