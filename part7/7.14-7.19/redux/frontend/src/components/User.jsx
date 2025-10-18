import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { initializeUser } from "../reducers/userReducer"
import { useParams } from "react-router-dom"

const User = () => {
  const id = useParams()

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeUser(id))
  }, [])
  const user = useSelector(({ user }) => user)
  if(!user) {
    return (<div>loading...</div>)
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
      </ul>
    </div>
  )
}

export default User