import { useState } from 'react'
import { useMutation } from '@apollo/client'

import { CHANGE_BIRTHYEAR, ALL_AUTHORS } from '../queries'

const Birthyear = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [ changeBirthyear ] = useMutation(CHANGE_BIRTHYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    changeBirthyear({ variables: { name, setBornTo: Number(born) }})

    setBorn('')
  }

  const authors = props.authors

  return (
    <div>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <select onChange={({ target }) => setName(target.value)}>
          {authors.map(author => <option value={author.name} key={author.id}>{author.name}</option>)}
        </select>
        <div>
          <label>
            born
            <input
              type="number"
              value={born}
              onChange={({ target }) => setBorn(target.value)}
            />
          </label>
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Birthyear