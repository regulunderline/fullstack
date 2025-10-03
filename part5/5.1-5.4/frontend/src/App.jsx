import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const Notification = ({ message }) => {
  if (message[0] === null) {
    return null
  }

  if (message[1]){
    return(
      <div className='success'>
        {message[0]}
      </div>
    )
  }
  return (
    <div className='error'>
      {message[0]}
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState([null, false])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleCreate = async event => {
    event.preventDefault()

    try {
      const newBlog = await blogService.create({ title, author, url })
      const newBlogs =await blogService.getAll()

      setBlogs(newBlogs)
      setTitle('')
      setAuthor('')
      setUrl('')
      setMessage([`a new blog ${newBlog.title} by ${newBlog.author}`, true])
      setTimeout(() => {
        setMessage([null, false])
      }, 5000)
    } catch {
      setMessage(['could not create a blog', false])
      setTimeout(() => {
        setMessage([null, false])
      }, 5000)
    }
  }

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      setMessage(['wrong username or password', false])
      setTimeout(() => {
        setMessage([null, false])
      }, 5000)
    }
  }

  const loginForm = () => {
    return (
      <div>
        <h1>log in to application</h1>
        <Notification message={message} />

        <form onSubmit={handleLogin}>
          <div>
            <label>
              username
              <input
                type="text"
                value={username}
                onChange={({ target }) => setUsername(target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              password
              <input
                type="text"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </label>
          </div>
          <div>
            <button type="submit">
              login
            </button>
          </div>
        </form>
      </div>
    )
  }

  const blogForm = () => {
    return (
      <div>
        <h2>blogs</h2>
        <Notification message={message} />

        <div>
          {user.name} logged in 
          <button onClick={() => {
            setUser(null)
            window.localStorage.clear()
          }}>log out</button></div>
        <br/>
        
        <h2>create new</h2>
        <form onSubmit={handleCreate}>
          <div>
            <label>
              title:
              <input
                type="text"
                value={title}
                onChange={({ target }) => setTitle(target.value)} 
                />
            </label>
          </div>
          <div>
            <label>
              author:
              <input
                type="text"
                value={author}
                onChange={({ target }) => setAuthor(target.value)} 
                />
            </label>
          </div>
          <div>
            <label>
              url:
              <input
                type="text"
                value={url}
                onChange={({ target }) => setUrl(target.value)} 
                />
            </label>
          </div>
          <button type="submit">create</button>
        </form>

        {blogs.filter(blog => blog.user.name === user.name).map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }

  return (
    <div>
      {!user && loginForm()}
      {user && blogForm()}
    </div>
  )
}

export default App