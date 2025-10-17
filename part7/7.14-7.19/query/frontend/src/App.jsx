import { useState, useEffect, useRef } from 'react'
import { useQuery } from '@tanstack/react-query'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Users from './components/Users'
import User from './components/User'
import blogService from './services/blogs'
import loginService from './services/login'
import { useNotificationDispatch } from './NotificationContext'
import { useUserValue, useUserDispatch } from './UserContext'
import {
  Routes, Route, Navigate, Link, useMatch, useNavigate
} from 'react-router-dom'

const Redirect = ({ to }) => {
  const navigate = useNavigate()
  useEffect(() => {navigate(to)}, [])
}

const Menu = ({ user, handleLogout }) => {
  const padding = {
    paddingRight: 5
  }
  const bg = {
    backgroundColor: "lightgrey"
  }
  return (
    <div>
      <div style={bg}>
        <Link to="/" style={padding}>blogs</Link>
        <Link to="/users" style={padding}>users</Link>
        {user && <>{user.name} logged in <button onClick={handleLogout}>log out</button></>}
        {!user && <Link to="/login" style={padding}>Log in</Link>}
      </div>
      <h2>blog app</h2>
      <Notification />
    </div>
  )
}

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const blogFormRef = useRef()
  const user = useUserValue()
  const navigate = useNavigate()

  const dispatch = useNotificationDispatch()
  const dispatchUser = useUserDispatch()
  
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatchUser({ user })
      blogService.setToken(user.token)
    } else {
      return(
        navigate('/login')
      )
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

  const handleLogout = () => {
    dispatchUser({ user: null })
    window.localStorage.clear()
    navigate('/login')
  }

  const loginForm = () => {
    return (
      <div>
        <h1>log in to application</h1>

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

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const blogForm = () => {
    return (
      <div>
        <Togglable buttonLabel = "create new blog" ref={blogFormRef}>
          {user && <BlogForm user={user}/>}
        </Togglable>
        {blogs.toSorted((a,b) => b.likes - a.likes).map(blog => 
          <div key={blog.id} style={blogStyle}><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></div>)}
      </div>
    )
  }

  return (
    <div>
      <Menu user={user} handleLogout={handleLogout}/>
      <Routes>
        <Route path = "/login" element = {user ? <Redirect to="/"/> : loginForm()}/>
        <Route path = "/" element = {<div>{blogForm()}</div>}/>
        <Route path = "/users" element = {<div><Users /></div>}/>
        <Route path = "/users/:id" element = {<div><User /></div>}/>
        <Route path = "/blogs/:id" element = {<div><Blog /></div>}/>
        
        {/* <Route path = "/anecdotes/:id" element = {<Anecdote anecdote={anecdote} />}/>
        <Route path = "/about" element = {<About />}/>
        <Route path = "/create" element = {<CreateNew addNew={addNew} newNotification={newNotification} />}/> */}
      </Routes>
    </div>
  )
}

export default App