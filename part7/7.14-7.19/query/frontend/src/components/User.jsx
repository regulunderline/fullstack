import userService from '../services/users'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

const User = () => {
  const { id } = useParams()
  
  const result = useQuery({
    queryKey: ['user'],
    queryFn: () => userService.getOne(id),
    refetchOnWindowFocus: false,
    retry: false
  })

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  if ( result.isError && result.error.message === 'Network Error' ) {
    return <div>blog service not available due to problems in server</div>
  }

  const user = result.data

  if (!user) {
    return <h2>unknown user</h2>
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <h2>added blogs</h2>
      <ul>
        {user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
      </ul>
    </div>
  )
}

export default User
