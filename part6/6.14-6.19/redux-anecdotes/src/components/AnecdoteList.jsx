import { voteFor } from '../reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'

const AnecdoteList = () => {
  const anecdotes = useSelector(({ filter, anecdotes }) => anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter)))
  const dispatch = useDispatch()

  const vote = async (id) => {
    dispatch(voteFor(id))
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