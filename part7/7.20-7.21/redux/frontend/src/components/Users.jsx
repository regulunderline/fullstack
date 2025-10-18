import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { initializeUsers } from "../reducers/usersReducer"
import { Link } from "react-router-dom"
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  Paper,
  Tab,
} from '@mui/material'

const Users = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeUsers())
  }, [])
  const users = useSelector(({ users }) => users)

  return (
    <div>
      <Typography variant="h2">Users</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell><strong>blogs created</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {users.map(user => 
              <TableRow key={user.id}>
                <TableCell><Link to={`/users/${user.id}`}>{user.name}</Link></TableCell>
                <TableCell>{user.blogs.length}</TableCell>
              </TableRow>)}
        </TableBody>
      </Table>
    </div>
  )
}

export default Users