import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import Users from './components/Users'
import User from './components/User'
import Login from './components/Login'
import Notification from './components/Notification'
import { initializeBlogs, createBlog, deleteBlog } from './reducers/blogReducer'
import { initializeLoggedInUser, deinitializeLoggedInUser } from './reducers/loggedInUserReducer'
import {
  Routes, Route, Link, useNavigate,
} from 'react-router-dom'
import { Button, List, ListItem, Paper, AppBar, Toolbar, Typography } from '@mui/material'

const Menu = ({ user, handleLogout }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Button variant="outlined" color="inherit" component={Link} to="/">
          blogs
        </Button>
        <Button variant="outlined" color="inherit" component={Link} to="/users">
          users
        </Button>
        {user && <><em>{user.name} logged in</em> <Button variant="outlined" color="inherit" onClick={handleLogout}>log out</Button></>}
        {!user && 
          <Button variant="outlined" color="inherit" component={Link} to="/login">
            login
          </Button>}
      </Toolbar>
      <Typography variant="h4"><strong>blog app</strong></Typography>
    </AppBar>
  )
}

const Redirect = ({ to }) => {
  const navigate = useNavigate()
  useEffect(() => {navigate(to)}, [])
}

const App = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])
  const blogs = useSelector(({ blogs }) => blogs)

  useEffect(() => {
    dispatch(initializeLoggedInUser())
  }, [])
  const user = useSelector(({ loggedInUser }) => loggedInUser)

  const handleCreate = async blogObject => {
    dispatch(createBlog(blogObject))
    blogFormRef.current.toggleVisibility()
  }

  const removedBlog = async blogToDelete => {
    if(window.confirm(`Remove blog ${blogToDelete.title} by ${blogToDelete.author}`)){
      dispatch(deleteBlog(blogToDelete))
    }
  }

  const handleLogout = () => {
    dispatch(deinitializeLoggedInUser())
    window.localStorage.clear()
    navigate('/login')
  }

  const blogFormRef = useRef()

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
        <br />
        {user && 
          <Togglable buttonLabel = "create new blog" ref={blogFormRef}>
            <BlogForm handleCreate={handleCreate}/>
          </Togglable>
        }
        <List>
          {blogs.toSorted((a,b) => b.likes - a.likes).map(blog => 
            <ListItem key={blog.id} style={blogStyle}>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </ListItem>)}
        </List>
        <br />
      </div>
    )
  }

  return (
    <div>
      <Paper><Menu user={user} handleLogout={handleLogout}/></Paper>
      <Paper elevation={5}><Notification /></Paper>
      <Routes>
        <Route path="/login" element={user ? <Redirect to="/"/> : <Login />} />
        <Route path="/" element={blogForm()} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/blogs/:id" element={<Blog />} />
      </Routes>
    </div>
  )
}

export default App