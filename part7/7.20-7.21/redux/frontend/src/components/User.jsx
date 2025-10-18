import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { initializeUser } from "../reducers/userReducer"
import { useParams } from "react-router-dom"
import { Typography, List, ListItem, ListItemText, } from "@mui/material"

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
      <Typography variant="h2">{user.name}</Typography>
      <Typography variant="h4">added blogs</Typography>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper',  listStyleType: 'disc' }}>
        {user.blogs.map(blog => 
          <ListItem sx={{ display: 'list-item' }} key={blog.id}>
            <ListItemText primary={blog.title} />
          </ListItem>)}
      </List>
    </div>
  )
}

export default User