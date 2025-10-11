import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'
import { useNotificationDispatch } from '../NotificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote, 
    onSuccess: (response) => {
      console.log(response)
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      if (response.status === 400) {
        dispatch({ message: `too short anecdote, must have length 5 or more`})
        setTimeout( () => dispatch({ message: null}), 5000)
      } else {
        queryClient.setQueryData(['anecdotes'], anecdotes.concat(response.data))
        dispatch({ message: `anecdote '${response.data.content}' created`})
        setTimeout( () => dispatch({ message: null}), 5000)
      }
    },
    onError: error => {
      console.log(error)
    }
  })

  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    newAnecdoteMutation.mutate({ content, votes:0 })
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
