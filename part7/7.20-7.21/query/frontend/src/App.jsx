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
  Routes, Route, Link, useNavigate
} from 'react-router-dom'
import { Container, Button, List, ListItem, Paper, TextField, AppBar, Toolbar, Typography } from '@mui/material'

const Redirect = ({ to }) => {
  const navigate = useNavigate()
  useEffect(() => {navigate(to)}, [])
}

const Menu = ({ user, handleLogout }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/">
          blogs
        </Button>
        <Button color="inherit" component={Link} to="/users">
          users
        </Button>
        {user && <><em>{user.name} logged in</em> <Button color="inherit" onClick={handleLogout}>log out</Button></>}
        {!user && 
          <Button color="inherit" component={Link} to="/login">
            login
          </Button>}
      </Toolbar>
      <Typography variant="h3">blog app</Typography>
      <Notification />
    </AppBar>
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
              <TextField
                type="text"
                label="username"
                value={username}
                onChange={({ target }) => setUsername(target.value)}
              />
          </div>
          <div>
            <TextField
              type="password"
              label="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <div>
            <Button variant="contained" color="primary" type="submit">
              login
            </Button>
          </div>
        </form>
      </div>
    )
  }

  const blogStyle = {
    paddingTop: 20,
    paddingLeft: 5,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 10
  }

  const blogForm = () => {
    return (
      <div>
        {user && <Togglable buttonLabel = "create new blog" ref={blogFormRef}>
          <BlogForm user={user}/>
        </Togglable>}
        <List>
          {blogs.toSorted((a,b) => b.likes - a.likes).map(blog => 
            <ListItem key={blog.id} style={blogStyle}>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </ListItem>
          )}
        </List>
      </div>
    )
  }

  return (
    <Container>
      <Menu user={user} handleLogout={handleLogout}/>
      <Routes>
        <Route path = "/login" element = {user ? <Redirect to="/"/> : loginForm()}/>
        <Route path = "/" element = {<div>{blogForm()}</div>}/>
        <Route path = "/users" element = {<Users />}/>
        <Route path = "/users/:id" element = {<User />}/>
        <Route path = "/blogs/:id" element = {<div><Blog /></div>}/>
      </Routes>
    </Container>
  )
}

export default App