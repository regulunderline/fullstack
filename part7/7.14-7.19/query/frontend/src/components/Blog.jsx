import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import blogService from '../services/blogs'
import { useNotificationDispatch } from '../NotificationContext'

const Blog = () => {
  const { id } = useParams()
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const likeMutation = useMutation({
    mutationFn: blogService.like, 
    onSuccess: (response) => {
      queryClient.setQueryData(['blog'], { ...response, user: blog.user })
      dispatch({ notification: { message: `you liked a blog ${response.title} by ${response.author}`, type: 'success' } })
      setTimeout(() => {
        dispatch({notification: null})
      }, 5000)
    },
    onError: error => {
      console.log(error)
      dispatch({ notification: { message: `could not like`, type: 'error' } })
      setTimeout(() => {
        dispatch({notification: null})
      }, 5000)
    }
  })  

  const commentMutation = useMutation({
    mutationFn: blogService.comment, 
    onSuccess: (response) => {
      if (response.status === 401) {
        dispatch({ notification: { message: `log in to comment`, type: 'error' } })
        setTimeout(() => {
          dispatch({notification: null})
        }, 5000)
      } else {
        queryClient.setQueryData(['blog'], { ...response, user: blog.user })
        dispatch({ notification: { message: `you commented a blog ${response.title} by ${response.author}`, type: 'success' } })
        setTimeout(() => {
          dispatch({notification: null})
        }, 5000)
      }
    },
    onError: error => {
      console.log(error)
      dispatch({ notification: { message: `could not comment`, type: 'error' } })
      setTimeout(() => {
        dispatch({notification: null})
      }, 5000)
    }
  })
    
  const result = useQuery({
    queryKey: ['blog'],
    queryFn: () => blogService.getOne(id),
    refetchOnWindowFocus: false,
    retry: false
  })

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  if ( result.isError && result.error.message === 'Network Error' ) {
    return <div>blog service not available due to problems in server</div>
  }

  const blog = result.data

  if (!blog) {
    return <h2>unknown blog</h2>
  }

  const handleLike = async (likedBlog) => {
    likeMutation.mutate(likedBlog)
  }

  const handleComment = async event => {
    event.preventDefault()
    const comment=event.target.comment.value
    event.target.comment.value=''

    commentMutation.mutate({ id, comment })
  }

  return (
    <div >
      <h1><strong>{blog.title} {blog.author}</strong></h1>
        <p><a href={blog.url}>{blog.url}</a></p>
        <p>{blog.likes} likes<button onClick={() => handleLike(blog)}>like</button></p>
        <p>added by {blog.user.name}</p>
        <h3>comments</h3>
        <form onSubmit={handleComment}>
          <input name="comment"/><button type="submit">add comment</button>
        </form>
        <ul>
          {blog.comments.map((comment, index) => <li key={index}>{comment}</li>)}
        </ul>
    </div>
  )
}

export default Blog