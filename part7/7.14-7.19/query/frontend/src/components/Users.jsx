import userService from '../services/users'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'

const Users = () => {
  const result = useQuery({
    queryKey: ['users'],
    queryFn: userService.getAll,
    refetchOnWindowFocus: false,
    retry: false
  })

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  if ( result.isError && result.error.message === 'Network Error' ) {
    return <div>blog service not available due to problems in server</div>
  }

  const users = result.data

  return (
    <div>
      <h1>Users</h1>
      <table>
        <thead><tr><td></td><td><strong>blogs created</strong></td></tr></thead>
        <tbody>{users.map(user=> <tr key={user.id}><td><Link to={`/users/${user.id}`}>{user.name}</Link></td><td>{user.blogs.length}</td></tr>)}</tbody>
      </table>
    </div>
  )
}

export default Users
