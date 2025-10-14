import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, createBlog, likeBlog, deleteBlog } from './reducers/blogReducer'
import { initializeUser, deinitializeUser } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])
  const blogs = useSelector(({ blogs }) => blogs)

  useEffect(() => {
    dispatch(initializeUser())
  }, [])
  const user = useSelector(({ user }) => user)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleCreate = async blogObject => {
    dispatch(createBlog(blogObject))
    blogFormRef.current.toggleVisibility()
  }

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      dispatch(initializeUser())
      setUsername('')
      setPassword('')
    } catch {
      dispatch(setNotification('wrong username or password', 'error', 5))
    }
  }

  const addedLike = async likedBlog => {
    dispatch(likeBlog(likedBlog))
  }

  const removedBlog = async blogToDelete => {
    if(window.confirm(`Remove blog ${blogToDelete.title} by ${blogToDelete.author}`)){
      dispatch(deleteBlog(blogToDelete))
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

  const blogFormRef = useRef()

  const blogForm = () => {
    return (
      <div>
        <h2>blogs</h2>
        <Notification />

        <div>
          {user.name} logged in
          <button onClick={() => {
            dispatch(deinitializeUser())
            window.localStorage.clear()
          }}>log out</button></div>
        <br/>
        <Togglable buttonLabel = "create new blog" ref={blogFormRef}>
          <BlogForm handleCreate={handleCreate} />
        </Togglable>
        {blogs.toSorted((a,b) => b.likes - a.likes).map(blog => 
          <Blog key={blog.id} blog={blog} user={user} handleLike={() => addedLike(blog)} handleRemove={() => removedBlog(blog)} />)}
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