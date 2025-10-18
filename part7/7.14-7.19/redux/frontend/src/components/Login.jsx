import { useState } from "react"
import { useDispatch } from 'react-redux'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { setNotification } from '../reducers/notificationReducer'
import { initializeLoggedInUser } from '../reducers/loggedInUserReducer'
import { useNavigate } from "react-router-dom"

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      dispatch(initializeLoggedInUser())
      setUsername('')
      setPassword('')
      navigate('/')
    } catch {
      dispatch(setNotification('wrong username or password', 'error', 5))
    }
  }
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

export default Login