import { useState, useEffect, useRef } from 'react'
import { useQuery } from '@tanstack/react-query'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import { useNotificationDispatch } from './NotificationContext'
import { useUserValue, useUserDispatch } from './UserContext'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const blogFormRef = useRef()
  const user = useUserValue()

  const dispatch = useNotificationDispatch()
  const dispatchUser = useUserDispatch()
  
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatchUser({ user })
      blogService.setToken(user.token)
    }
  }, [])

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    refetchOnWindowFocus: false,
    retry: false
  })

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  if ( result.isError && result.error.message === 'Network Error' ) {
    return <div>blog service not available due to problems in server</div>
  }

  const blogs = result.data

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      dispatchUser({ user })
      setUsername('')
      setPassword('')
    } catch {
      dispatch({ notification: { message: 'wrong username or password', type: 'error' } })
      setTimeout(() => {
        dispatch({notification: null})
      }, 5000)
    }
  }

  const loginForm = () => {
    return (
      <div>
        <h1>log in to application</h1>
        <Notification />

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
        <Notification />

        <div>
          {user.name} logged in
          <button onClick={() => {
            dispatchUser({ user: null })
            window.localStorage.clear()
          }}>log out</button></div>
        <br/>
        <Togglable buttonLabel = "create new blog" ref={blogFormRef}>
          <BlogForm user={user}/>
        </Togglable>
        {blogs.toSorted((a,b) => b.likes - a.likes).map(blog => 
          <Blog key={blog.id} blog={blog} user={user} />)}
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