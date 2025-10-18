import { useState } from 'react'
import { TextField, Button, Typography, Paper } from '@mui/material'

const BlogForm = ( { handleCreate } ) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()

    handleCreate({ title, author, url })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <Typography variant="h3">create new</Typography>
      <form onSubmit={addBlog}>
        <div>
            <TextField
              type="text"
              label="title"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
        </div>
        <div>
            <TextField
              type="text"
              label="author"
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
        </div>
        <div>
            <TextField
              type="text"
              label="url"
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
        </div>
        <Button variant="contained" color="primary" type="submit">create</Button>
      </form>
    </div>
  )
}

export default BlogForm